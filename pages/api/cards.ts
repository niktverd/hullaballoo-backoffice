// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs } from 'firebase/firestore/lite';
import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../firebase';

type Card = {
    videoUrl: string;
    account: string;
    description: string;
    likes: number;
};

type Data = {
  cards: Card[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const cardsCol = collection(db, 'cards');
    const cardSnapshot = await getDocs(cardsCol);
    const cards = cardSnapshot.docs.map(doc => doc.data() as Card);
    res.status(200).json({cards})
}
