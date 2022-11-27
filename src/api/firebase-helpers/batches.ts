import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore/lite";
import db from "../../../firebase";
import { Batch } from "../../types/batch";

export const getBatchesBySubcategoryNames = async (
    subcategoryNames: string | string[]
) => {
    const colRef = collection(db, "batches");
    const names = Array.isArray(subcategoryNames) ? subcategoryNames : [subcategoryNames];
    let batches: Batch[] = [];
    const chunkSize = 10;

    for (let i = 0; i < names.length; i += chunkSize) {
        const chunk = names.slice(i, i + chunkSize);
        const q = query(colRef, where("subcategory", "in", chunk));
        const batchesSnap = await getDocs(q);
        const foundBatches = batchesSnap.docs.map(
            (d) => d.data() as Batch
        );
        batches = batches.concat(foundBatches);
    }

    return batches;
};

export const getBatchesBySubcategoryNamesAndPopularity = async (
    subcategoryNames: string | string[],
    popularity: number,
) => {
    const colRef = collection(db, "batches");
    const names = Array.isArray(subcategoryNames) ? subcategoryNames : [subcategoryNames];
    let batches: Batch[] = [];

    for (const name of names) {
        const q = query(colRef, where("subcategory", "==", name), where('popularity', '==', popularity));
        const batchesSnap = await getDocs(q);
        const foundBatches = batchesSnap.docs.map(
            (d) => ({...(d.data() as Batch), _id: d.id})
        );

        if (foundBatches.length) {
            batches = batches.concat(foundBatches);
            continue;
        }

        await addDoc(colRef, {
            isFull: false,
            subcategory: name,
            popularity,
            videos: [],
        });

        const q2 = query(colRef, where("subcategory", "==", name), where('popularity', '==', popularity));
        const batchesSnap2 = await getDocs(q2);
        const foundBatches2 = batchesSnap2.docs.map(
            (d) => ({...(d.data() as Batch), _id: d.id})
        );

        batches = batches.concat(foundBatches2);
    }

    return batches;
}

type UpdateBatchesArgs = {
    batchesArray: string[]; 
    videoId: string;
};

export const updateBatchesWithVideo = async ({batchesArray, videoId}: UpdateBatchesArgs) => {
    const colRef = collection(db, "batches");

    for (const batchId of batchesArray) {
        const docRef = doc(colRef, batchId);
        const batchSnap = await getDoc(docRef);

        const batch = await batchSnap.data();

        if (!batch) {
            continue;
        }

        await updateDoc(docRef, {videos:  [...batch.videos, videoId]});
    }
};
