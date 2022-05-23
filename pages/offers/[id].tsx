import type {NextPage} from 'next'
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react';

import OfferForm from '../../src/components/OfferForm/OfferForm';

import styles from '../../styles/Content.module.css';

// import _offers from '../src/temp-data/videos.json'

const EditOffer: NextPage = () => {
    const [offer, setOffer] = useState(null);
    const router = useRouter();

    const docId = router.query.id as string;

    async function onSubmit(values: any) {
        if (!docId) {
            return;
        }

        values.banners = values.banners?.map((banner: any) => banner.imgSrc);
        values.threads = values.threads?.map((thread: any) => thread.thread);

        try {
            const offerResp = await fetch('/api/offer', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    id: docId,
                })
            });
            const offerJson = await offerResp.json();

            if (offerJson.ok) {
                router.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function getOffer() {
            try {
                const offerResp = await fetch('/api/offer?id='+router.query.id);
                const offerJson = await offerResp.json();
                if (offerJson.offer) {
                    setOffer({
                        ...offerJson.offer,
                        banners: offerJson.offer?.banners?.map((bannerId: string) => ({imgSrc: bannerId})),
                        threads: offerJson.offer?.threads?.map((threadId: string) => ({thread: threadId})),
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (router.query.id) {
            getOffer();
        }
    }, [router]);

    return (
        <div className={styles.container}>
            {offer && <OfferForm onSubmit={onSubmit} content={offer} docId={router.query.id as string} />}
        </div>
    );
}

export default EditOffer;
