import {
    addDoc,
    collection,
    CollectionReference,
    DocumentData,
    getDocs,
    query,
    where,
} from "firebase/firestore/lite";
import db from "../../../firebase";
import { Category } from "../../types/category";

const getCategoryByName = async (
    colRef: CollectionReference<DocumentData>,
    name: string
) => {
    const q = query(colRef, where("name", "==", name));
    const categoriesSnap = await getDocs(q);
    const [foundCategory] = categoriesSnap.docs.map(
        (d) => d.data() as Category
    );

    return foundCategory;
};

export const createCategory = async (name: string) => {
    const colRef = collection(db, "categories");
    const foundCategory = await getCategoryByName(colRef, name);

    if (Boolean(foundCategory)) {
        return foundCategory;
    }

    await addDoc(colRef, {
        name,
    });

    return await getCategoryByName(colRef, name);
};
