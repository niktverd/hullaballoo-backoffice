import {collection, getDocs} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next'
import db from '../../firebase';
import {Offer} from '../../src/types/common';

type Data = {
  offers: Offer[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const offersCol = collection(db, 'offers');
    const offerSnapshot = await getDocs(offersCol);

    const offers = offerSnapshot.docs.map(doc => ({
        ...doc.data() as Offer,
        _id: doc.id,
    }));

    return res.status(200).json({offers});
}
