import type {NextPage} from 'next'
import {useRouter} from 'next/router';
import CardForm from '../../src/components/Form/Form';

import styles from '../../styles/Content.module.css'

// import _cards from '../src/temp-data/videos.json'

const Home: NextPage = () => {
    const router = useRouter();

    async function onSubmit(values: any) {

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
        <div className={styles.container}>
            <h1>Add New Video</h1>
            <CardForm onSubmit={onSubmit}/>
        </div>
    )
}

export default Home;
