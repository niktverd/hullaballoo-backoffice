import type {NextPage} from 'next'
import {useEffect, useState} from 'react';
import Card from '../src/components/Card/Card';

import styles from '../styles/Home.module.css'

// import _cards from '../src/temp-data/videos.json'

const Home: NextPage = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function getCards() {
            try {
                const cardsResp = await fetch('/api/cards');
                const cardsJson = await cardsResp.json();
                setCards(cardsJson.cards);
            } catch (error) {
                console.log(error);
            }
        }

        getCards();
    }, []);

    return (
        <div className={styles.container}>
            {cards.map((card, index) => <Card key={index} content={card} />)}
        </div>
    )
}

export default Home;
