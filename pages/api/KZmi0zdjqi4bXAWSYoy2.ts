import {doc, collection, setDoc} from 'firebase/firestore/lite';
import getYouTubeID from 'get-youtube-id';
import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../firebase';

import Innertube from 'youtubei.js';

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
};

type MetaData = {
    keywords?: string[];
    category?: string;
    view_count?: number;
    is_family_safe?: boolean;
    channel_name?: string;
    likes?: {
        count?: number;
    };
};

async function setDocument(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {body} = req;
    
    console.log(body);
    
    try {
        const {videoUrl} = body;
        const youtubeId = getYouTubeID(videoUrl);
        
        if (!youtubeId) {
            return res.status(501).json({ok: false, error: 'there is no youtube id'});
        }

        const youtube = await new Innertube({ gl: 'US' });

        const video = await youtube.getDetails(youtubeId);

        const stableLikes = Math.floor(Math.random() * 10000);
        const stableViews = Math.floor(Math.random() * 100000 + stableLikes * 2);
        const updatedAt = new Date().toISOString();
        const docRef = doc(collection(db, 'cards'));
        const newId = docRef.id;
        const metaData = video?.metadata as MetaData;
        await setDoc(docRef, {
            account: metaData?.channel_name ?? '',
            description: video.title + video.description ?? '',
            isFamilySafe: metaData?.is_family_safe ?? true,
            views: metaData?.view_count ?? stableViews,
            category: metaData?.category ?? '',
            keywords: metaData?.keywords ?? [],
            _id: newId,
            likes: metaData?.likes?.count ?? stableLikes,
            updatedAt: updatedAt,
            createdAt: body.createdAt || updatedAt,
        });

        return res.status(200).json({ok: true});
    } catch(error: any) {
        console.log('Error during adding doc');

        if (typeof error === 'string') {
            return res.status(404).json({ok: false, error});
        }

        return res.status(404).json({ok: false});
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return req.method === 'POST'
        ? setDocument(req, res)
        : res.status(404).json({ok: false, card: null})
}