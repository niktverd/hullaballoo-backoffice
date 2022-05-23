import type {NextPage} from 'next'
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';

import Card from '../../src/components/Card/Card';
import CardForm from '../../src/components/Form/Form';
import Page from '../../src/containers/Page/Page';

import styles from '../../styles/Content.module.css';

// import _cards from '../src/temp-data/videos.json'

const CardEdit: NextPage = () => {
    const [card, setCard] = useState(null);
    const router = useRouter();

    const docId = router.query.id as string;

    async function onSubmit(values: any) {
        if (!docId) {
            return;
        }

        try {
            const cardResp = await fetch('/api/card', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    id: docId,
                })
            });
            const cardJson = await cardResp.json();

            if (cardJson.ok) {
                router.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function getCard() {
            try {
                const cardResp = await fetch('/api/card?id='+router.query.id);
                const cardJson = await cardResp.json();
                setCard(cardJson.card);
            } catch (error) {
                console.log(error);
            }
        }
        if (router.query.id) {
            getCard();
        }
    }, [router]);

    return (
        <Page title="Edit Card">
            <div className={styles.container}>
                {card && <Card content={card} />}
                {card && <CardForm onSubmit={onSubmit} content={card} docId={router.query.id as string} />}
            </div>
        </Page>
    );
}

export default CardEdit;
