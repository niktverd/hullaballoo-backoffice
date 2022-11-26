import { doc, collection, setDoc } from "firebase/firestore/lite";
import getYouTubeID from "get-youtube-id";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { gt, lt } from "pomeranian-durations";
import db from "../../firebase";

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
};

type MetaData = {
    likes: number;
    publishedAt: string;
    keywords?: string[];
    category?: string;
    view_count?: number;
    is_family_safe?: boolean;
    channel_name?: string;
    googleSpreadSheet?: string;
    isInDurationLimits?: boolean;
    duration?: string;
};

async function setDocument(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { body } = req;

    console.log(body);

    try {
        const { videoUrl, loader, googleSpreadSheet, categoryDefinedByStaff } = body;
        const youtubeId = getYouTubeID(videoUrl);
        console.log(youtubeId);

        if (!youtubeId) {
            return res
                .status(207)
                .json({ ok: false, error: "there is no youtube id" });
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
        console.log(json);
        const {
            snippet,
            contentDetails,
            statistics,
            topicDetails,
        } = json.items[0];
        // console.log({
        //     snippet,
        //     thumbs: snippet.thumbnails,
        //     contentDetails,
        //     statistics,

        //     localizations,
        //     player,

        //     recordingDetails,
        //     status,

        //     topicDetails,
        // });

        const stableLikes = Math.floor(Math.random() * 10000);
        const stableViews = Math.floor(
            Math.random() * 100000 + stableLikes * 2
        );
        const updatedAt = new Date().toISOString();
        const docRef = doc(collection(db, "cards"));
        const newId = docRef.id;
        const metaData = {
            videoUrl,
            account: snippet.channelTitle ?? "",
            description: snippet.title + snippet.description ?? "",
            isFamilySafe: true,
            views: statistics?.viewCount ?? stableViews,
            commentCount: statistics?.commentCount ?? 0,
            category: snippet?.categoryId ?? "",
            topicCategories: topicDetails?.topicCategories || [],
            keywords: [],
            loader: loader ?? "unknown",
            _id: newId,
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

        return res
            .status(200)
            .json({
                ok: true,
                videoId: youtubeId,
                isVertical,
                matchCategory: false,
                matchDuration: metaData.isInDurationLimits,
                durationValue: metaData.duration,
            });
    } catch (error: any) {
        console.log(error);
        console.log('Error during adding doc');

        if (typeof error === 'string') {
            return res.status(204).json({ok: false, error});
        }

        return res.status(204).json({ok: false});
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
