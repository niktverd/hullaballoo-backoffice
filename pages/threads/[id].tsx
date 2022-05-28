import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import ThreadForm from '../../src/components/ThreadForm/ThreadForm';
import Page from '../../src/containers/Page/Page';
import {Thread} from '../../src/types/common';

import styles from '../../styles/Content.module.css'

const ThreadEdit: NextPage = () => {
    const [thread, setThread] = useState<Thread | null>(null);
    const router = useRouter();

    const docId = router.query.id as string;

    async function onSubmit(values: any) {
        if (!docId) {
            return;
        }

        try {
            const threadResp = await fetch('/api/thread', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    id: docId,
                })
            });
            const threadJson = await threadResp.json();
            if (threadJson.ok) {
                router.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function getThread() {
            try {
                const threadResp = await fetch('/api/thread?id='+router.query.id);
                const threadJson = await threadResp.json();

                if (threadJson.thread) {
                    const {_id, cards} = threadJson.thread;
                    setThread({_id});

                }
            } catch (error) {
                console.log(error);
            }
        }
        if (router.query.id) {
            getThread();
        }
    }, [router]);

    return (
        <Page title="Update a Thread">
            <div className={styles.container}>
                {thread && <ThreadForm onSubmit={onSubmit} content={thread} docId={router.query.id as string} />}
            </div>
        </Page>
    );
}

export default ThreadEdit;
