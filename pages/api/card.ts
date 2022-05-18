// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {doc, getDoc, updateDoc, addDoc, collection} from 'firebase/firestore/lite';
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
}

async function setDocument(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const {body} = req;

    console.log(body);

    try {
        const updatedAt = new Date().toISOString();
        const docRef = collection(db, 'cards');
        const docSnap = await addDoc(docRef, {
            ...body,
            likes: 0,
            updatedAt: updatedAt,
            createdAt: body.createdAt || updatedAt,
        });
        res.status(200).json({ok: true, newId: docSnap.id})
    } catch(error) {
        console.log('Error during an update doc');
        res.status(404).json({ok: false})
    }
}

async function updateDocument(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const {body} = req;

    console.log(body);

    const {id, ...rest} = body;

    try {
        const updatedAt = new Date().toISOString();
        const docRef = doc(db, 'cards', id as string);
        const docSnap = await updateDoc(docRef, {
            ...rest,
            likes: rest.likes || 0,
            updatedAt: updatedAt,
            createdAt: rest.createdAt || updatedAt,
        });
        res.status(200).json({ok: true})
    } catch(error) {
        console.log('Error during an update doc');
        res.status(404).json({ok: false})
    }
}


async function getDocument(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const {query} = req;

    console.log(query);

    const docRef = doc(db, 'cards', query.id as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(200).json({ok: true, card: docSnap.data() as Card})
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        console.log(docSnap.id);
        res.status(404).json({ok: false, card: null})
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return req.method === 'GET'
        ? getDocument(req, res)
        : req.method === 'PATCH'
        ? updateDocument(req, res)
        : req.method === 'POST'
        ? setDocument(req, res)
        : res.status(400).json({ok: false, card: null})
}