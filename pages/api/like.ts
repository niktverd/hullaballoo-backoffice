// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore/lite';
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
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {id, likes} = req.body;

    console.log('id:', id, 'likes:', likes);

    if (!id || likes === undefined) {
        return res.status(400).json({ok: false});
    }

    const cardRef = doc(db, 'cards', id);

    try {
        await updateDoc(cardRef, {
            likes: likes+1
        });
    } catch (error) {
        console.log(error);
    }


    return res.status(200).json({ok: true});
}
