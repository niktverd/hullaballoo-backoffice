import {doc, getDoc, updateDoc, setDoc} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next'
import db from '../../firebase';

type Thread = {
    _id: string;
    cards: string[];
    createdAt: string;
    updatedAt: string;
};

type Data = {
    ok: boolean;
    thread?: Thread | null;
    newId?: string;
};

async function setDocument(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {_id, ...rest} = req.body;

    console.log(_id, rest);

    try {
        const updatedAt = new Date().toISOString();
        const colRef = doc(db, 'threads', _id);
        await setDoc(colRef, {
            ...rest,
            updatedAt: updatedAt,
            createdAt: updatedAt,
        });

        return res.status(200).json({ok: true, newId: _id});
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
        const docRef = doc(db, 'threads', id as string);
        await updateDoc(docRef, {
            ...rest,
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

    const docRef = doc(db, 'threads', query.id as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return res.status(200).json({ok: true, thread: {
            ...docSnap.data() as Thread,
            _id: docSnap.id,
        }});
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        console.log(docSnap.id);
        return res.status(404).json({ok: false, thread: null});
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
        : res.status(400).json({ok: false, thread: null});
}