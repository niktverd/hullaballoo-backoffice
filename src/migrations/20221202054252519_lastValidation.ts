import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore/lite"
import db from "../../firebase"

export const lastValidationReset = async () => {
    const cardsRef = collection(db, 'cards');
    const cardSnaps = await getDocs(cardsRef);
    let indx = 0;
    for (const d of cardSnaps.docs) {
        const docRef = doc(cardsRef, d.id);
        await updateDoc(docRef, {lastValidation: 0, isBroken: false})
        console.log(indx++, cardSnaps.docs.length);
    }
}

lastValidationReset();