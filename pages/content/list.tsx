import {useEffect, useState} from 'react';
import type {NextPage} from 'next'

import Page from '../../src/containers/Page/Page';
import { Card } from '../../src/types/common';
import TablePagination from '../../src/components/TablePagination/TablePagination';

import styles from '../../styles/Content.module.css'

type CardExtended = Required<Card> & {
    _id: string;
    name: string;
}

const CardsList: NextPage = () => {
    const [cards, setCards] = useState<CardExtended[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    async function getCards() {
        try {
            const cardsResp = await fetch(`/api/cards?rowsPerPage=${rowsPerPage}&page=${page}`);
            const cardsJson = await cardsResp.json();
            setCards(cardsJson.cards);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCards();
    }, []);

    console.log(cards);

    return (
        <Page title='Cards List'>
            <TablePagination
                cards={cards}
                setCards={setCards}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </Page>
    )
}

export default CardsList;
