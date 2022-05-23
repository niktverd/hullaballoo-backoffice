import {collection, getDocs, limit, orderBy, query} from 'firebase/firestore/lite';
import type {NextApiRequest, NextApiResponse} from 'next';

import db from '../../firebase';
import {Card} from '../../src/types/common';



type Data = {
  cards: Card[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {rowsPerPage, page} = req.query;
    const _rowsPerPage = Number(rowsPerPage || 0);
    const _page = Number(page || 0);

    const cardsCol = collection(db, 'cards');
    const q = _rowsPerPage 
        // ? query(cardsCol, orderBy('createdAt'), startAt(_page * _rowsPerPage), limit(_rowsPerPage * 2))
        ? query(cardsCol, orderBy('createdAt'), limit(_rowsPerPage * (_page + 2)))
        : query(cardsCol, orderBy('createdAt'));
    const cardSnapshot = await getDocs(q);

    const cards = cardSnapshot.docs.map(doc => ({
        ...doc.data() as Card,
        _id: doc.id,
    }));

    return res.status(200).json({cards});
}
