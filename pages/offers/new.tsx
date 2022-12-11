import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import OfferForm from '../../src/components/OfferForm/OfferForm';
import Page from '../../src/containers/Page/Page';

import styles from '../../styles/Content.module.css'

const CreateOffer: NextPage = () => {
    const router = useRouter();

    async function onSubmit(values: any) {
        values.banners = values.banners?.map((banner: any) => banner.imgSrc);
        values.threads = values.threads?.map((thread: any) => thread.thread);
        values.geos = values.geos?.map((geoCode: any) => geoCode.geo);

        try {
            const offerResp = await fetch('/api/offer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                })
            });
            const offerJson = await offerResp.json();

            if (offerJson.ok) {
                router.push('/offers/' + offerJson.newId);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Page title="Create a new offer">
            <OfferForm onSubmit={onSubmit}/>
        </Page>
    );
}

export default CreateOffer;
