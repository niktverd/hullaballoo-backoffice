import {doc, getDoc, updateDoc, collection, setDoc} from 'firebase/firestore/lite';
import getYouTubeID from 'get-youtube-id';
import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../firebase';

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
            throw 'Video is not youtube video!';
        }
        const updatedAt = new Date().toISOString();
        const docRef = doc(collection(db, 'cards'));
        const newId = docRef.id;
        await setDoc(docRef, {
            ...body,
            _id: newId,
            likes: 0,
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