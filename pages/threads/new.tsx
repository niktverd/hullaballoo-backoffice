import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import ThreadForm from '../../src/components/ThreadForm/ThreadForm';
import Page from '../../src/containers/Page/Page';

import styles from '../../styles/Content.module.css'

const CreateThread: NextPage = () => {
    const router = useRouter();

    async function onSubmit(values: any) {
        values.cards = values.cards?.map((card: any) => card.cardId) || [];

        try {
            const threadResp = await fetch('/api/thread', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                })
            });
            const threadJson = await threadResp.json();

            if (threadJson.ok) {
                router.push('/threads/' + threadJson.newId);
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Page title="Create a new thread">
            <ThreadForm onSubmit={onSubmit}/>
        </Page>
    );
}

export default CreateThread;
