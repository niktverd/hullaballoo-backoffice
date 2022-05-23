import {collection, getDocs} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next'

import db from '../../firebase';
import {Thread} from '../../src/types/common';

type Data = {
  threads: Thread[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const threadsCol = collection(db, 'threads');
    const threadSnapshot = await getDocs(threadsCol);

    const threads = threadSnapshot.docs.map(doc => ({
        ...doc.data() as Thread,
        _id: doc.id,
    }));

    return res.status(200).json({threads})
}
