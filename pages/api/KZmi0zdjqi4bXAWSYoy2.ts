import { doc, collection, setDoc } from "firebase/firestore/lite";
import getYouTubeID from "get-youtube-id";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { gt, lt } from "pomeranian-durations";
import db from "../../firebase";
import {
    getBatchesBySubcategoryNamesAndPopularity,
    updateBatchesWithVideo,
} from "../../src/api/firebase-helpers/batches";
import { checkIfVideoInDataBase } from "../../src/api/firebase-helpers/cards";
import { getSubcategoriesByNames } from "../../src/api/firebase-helpers/subcategories";
import { Populiarity } from "../../src/types/common";
import { getRidOfDups } from "../../src/utils/common";

type Card = {
    videoUrl: string;
    account: string;
    description: string;
    likes: number;
};

type Data = {
    ok: boolean;
    card?: Card | null;
    newId?: string;
    error?: string;
    videoId?: string;
    isVertical?: boolean;
    matchCategory?: boolean;
    matchDuration?: boolean;
    durationValue?: string;
    alreadyAdded?: boolean;
};

type MetaData = {
    _id: string;
    likes: number;
    publishedAt: string;
    dataBaseCategories: string[];
    dataBaseSubcategories: string[];
    dataBaseBatches: string[];
    keywords?: string[];
    category?: string;
    view_count?: number;
    is_family_safe?: boolean;
    channel_name?: string;
    googleSpreadSheet?: string;
    topicCategories: string[];
    isInDurationLimits?: boolean;
    duration?: string;
    youtubeId?: string;
};

// const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbx_Ra1l3MCRi40m_wPIq5dmdcHBjzmSnjbS0IlgjYQ/dev';
const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbxxcl5Cn9qwc54txdsDQkxAIay4o_fy8cR9sTh1H4NEYsw2oIUv-PDJB8mzxZIFXJiL/exec';
const mySheet = 'https://docs.google.com/spreadsheets/d/1PnrIFWxfZSW_EHFed1PlzC0ql2ftW4-fSTyHAwDHohQ/edit#gid=0'

async function setDocument(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { body } = req;

    console.log(body);

    try {
        const {
            videoUrl,
            loader,
            googleSpreadSheet,
            categoryDefinedByStaff = [],
        } = body;
        const youtubeId = getYouTubeID(videoUrl);
        console.log(youtubeId);

        if (!youtubeId) {
            return res
                .status(207)
                .json({ ok: false, error: "there is no youtube id" });
        }

        const existsInDatabase = await checkIfVideoInDataBase(youtubeId);

        if (existsInDatabase) {
            fetch(`${googleScriptUrl}?videoId=${'none'}&youtubeId=${youtubeId}&status=${'video already in database'}&sheetUrl=${googleSpreadSheet}`);
            fetch(`${googleScriptUrl}?videoId=${'none'}&youtubeId=${youtubeId}&status=${'video already in database'}&sheetUrl=${mySheet}`);

            // return since and loader
            return res.status(207).json({
                ok: true,
                videoId: youtubeId,
                alreadyAdded: true,
                isVertical: false,
                matchCategory: false,
                matchDuration: false,
                durationValue: 'metaData.duration',
            });
        }

        console.log({ step: 1 });
        const YOUTUBE_KEY = "AIzaSyBo2yM91E4uUWmjqGht6XVyrSDfIrZ9QJk";
        const response = await fetch(
            "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,localizations,player,recordingDetails,status,topicDetails&id=" +
                youtubeId +
                "&key=" +
                YOUTUBE_KEY
        );
        const json = await response.json();
        // console.log(json);
        const {
            snippet,
            contentDetails,
            statistics,
            topicDetails,
        } = json.items[0];

        const stableLikes = Math.floor(Math.random() * 10000);
        const stableViews = Math.floor(
            Math.random() * 100000 + stableLikes * 2
        );
        const updatedAt = new Date().toISOString();
        const docRef = doc(collection(db, "cards"));
        const newId = docRef.id;
        const metaData = {
            _id: newId,
            videoUrl,
            youtubeId,
            account: snippet.channelTitle ?? "",
            description: snippet.title + snippet.description ?? "",
            isFamilySafe: true,
            views: statistics?.viewCount ?? stableViews,
            commentCount: statistics?.commentCount ?? 0,
            category: snippet?.categoryId ?? "",
            topicCategories: topicDetails?.topicCategories || [],
            keywords: [],
            loader: loader ?? "unknown",
            likes: statistics?.likeCount ?? stableLikes,
            updatedAt: updatedAt,
            createdAt: body.createdAt || updatedAt,
            publishedAt: snippet.publishedAt,
            duration: contentDetails?.duration,
            isInDurationLimits:
                contentDetails?.duration &&
                gt(contentDetails?.duration)("PT10S") &&
                lt(contentDetails?.duration, "PT2M"),
            googleSpreadSheet,
            categoryDefinedByStaff,
            dataBaseCategories: [],
            dataBaseSubcategories: [],
            dataBaseBatches: [],
            needToProveCategory: true,
        } as MetaData;

        const getLikesPerDay = (
            publishedAt: string,
            likesCount: number = 1000
        ) => {
            var start = moment(publishedAt);
            var end = moment();
            let days = end.diff(start, "days");

            if (!isNaN(days) && days) {
                days = days < 1 ? 1 : days;
                return likesCount / days;
            }

            return likesCount / 5;
        };

        const likesPerDate = getLikesPerDay(
            metaData.publishedAt,
            metaData.likes
        );
        const isVertical = videoUrl.includes("/shorts");

        console.log({ likesPerDate });

        // await setDoc(docRef, metaData);

        // get category by sub category
        const subcategories = await getSubcategoriesByNames([
            ...categoryDefinedByStaff,
            ...metaData.topicCategories,
        ]);
        const popularityList = Populiarity.sort((a, b) => a - b);

        const popularity = popularityList.find((p) => p >= likesPerDate) || 50;

        // console.log({ popularityList, popularity, likesPerDate });

        const categories = getRidOfDups(subcategories.map((sc) => sc.category));
        const batches = await getBatchesBySubcategoryNamesAndPopularity(
            subcategories.map((sc) => sc.name),
            popularity
        );
        // add info to video

        if (categories?.length) {
            metaData.dataBaseCategories = categories;
        }

        const subcategoriesArray = getRidOfDups(
            subcategories.map((sc) => sc.name)
        );

        if (subcategoriesArray?.length) {
            metaData.dataBaseSubcategories = subcategoriesArray;
        }

        const batchesArray = getRidOfDups(batches.map((sc) => sc._id));

        if (batches) {
            metaData.dataBaseBatches = batchesArray;
        }

        // console.log(metaData, { categories });

        // save video
        await setDoc(docRef, metaData);
        // update batch
        await updateBatchesWithVideo({ batchesArray, videoId: metaData._id });
        // update google tables
        fetch(`${googleScriptUrl}?videoId=${newId}&youtubeId=${youtubeId}&status=${'check category match'}&sheetUrl=${metaData.googleSpreadSheet}`);
        fetch(`${googleScriptUrl}?videoId=${newId}&youtubeId=${youtubeId}&status=${'check category match'}&sheetUrl=${mySheet}`);
        // update tracker

        return res.status(200).json({
            ok: true,
            videoId: youtubeId,
            alreadyAdded: false,
            isVertical,
            matchCategory: false,
            matchDuration: metaData.isInDurationLimits,
            durationValue: metaData.duration,
        });
    } catch (error: any) {
        console.log(error);
        console.log("Error during adding doc");

        if (typeof error === "string") {
            return res.status(204).json({ ok: false, error });
        }

        return res.status(204).json({ ok: false });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return req.method === "POST"
        ? setDocument(req, res)
        : res.status(404).json({ ok: false, card: null });
}
