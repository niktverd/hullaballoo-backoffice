import { collection, getDocs, query, where } from "firebase/firestore/lite";
import db from "../../../firebase";
import { Card } from "../../types/common";

export const checkIfVideoInDataBase = async (
    youtubeId: string
) => {
    const colRef = collection(db, "cards");
    const q = query(colRef, where('youtubeId', '==', youtubeId));
    const cardsSnap = await getDocs(q);
    const cards = cardsSnap.docs.map(d => d.data() as Card);

    return Boolean(cards.length);
}