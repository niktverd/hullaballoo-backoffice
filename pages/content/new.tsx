import type {NextPage} from 'next'
import {useRouter} from 'next/router';
import CardForm from '../../src/components/Form/Form';
import Page from '../../src/containers/Page/Page';

import styles from '../../styles/Content.module.css'

// import _cards from '../src/temp-data/videos.json'

const NewThread: NextPage = () => {
    const router = useRouter();

    async function onSubmit(values: any) {

        values.threads = values.thread.map((thread: any) => thread.threadId);

        try {
            const cardResp = await fetch('/api/card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                })
            });
            const cardJson = await cardResp.json();

            if (cardJson.ok) {
                router.push('/content/' + cardJson.newId);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Page title="Create a new card">
            <CardForm onSubmit={onSubmit}/>
        </Page>
    );
}

export default NewThread;
