import {doc, getDoc, updateDoc, collection, setDoc} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';

import db from '../../firebase';
import {Offer} from '../../src/types/common';

type Data = {
    ok: boolean;
    offer?: Offer | null;
    newId?: string;
};

async function setDocument(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {body} = req;

    console.log(body);

    try {
        const updatedAt = new Date().toISOString();
        const docRef = doc(collection(db, 'offers'));
        const newId = docRef.id;
        await setDoc(docRef, {
            ...body,
            _id: newId,
            updatedAt: updatedAt,
            createdAt: body.createdAt || updatedAt,
        });
        return res.status(200).json({ok: true, newId});
    } catch(error) {
        console.log('Error during an update doc');
        return res.status(404).json({ok: false});
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
        const docRef = doc(db, 'offers', id as string);
        await updateDoc(docRef, {
            ...rest,
            likes: rest.likes || 0,
            updatedAt: updatedAt,
            createdAt: rest.createdAt || updatedAt,
        });

        return res.status(200).json({ok: true});
    } catch(error) {
        console.log('Error during an update doc');
        return res.status(404).json({ok: false});
    }
}


async function getDocument(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {query} = req;

    console.log(query);

    const docRef = doc(db, 'offers', query.id as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return res.status(200).json({ok: true, offer: docSnap.data() as Offer});
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        console.log(docSnap.id);

        return res.status(404).json({ok: false, offer: null});
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
        : res.status(400).json({ok: false, offer: null});
}