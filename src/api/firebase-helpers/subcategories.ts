import { addDoc, collection, CollectionReference, DocumentData, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import db from "../../../firebase";
import { Subcategory } from "../../types/subcategory";
import { createCategory } from "./categories";


const getSubategoryByName = async (
    colRef: CollectionReference<DocumentData>,
    name: string
) => {
    const q = query(colRef, where("name", "==", name));
    const categoriesSnap = await getDocs(q);
    const [foundSubcategory] = categoriesSnap.docs.map(
        (d) => d.data() as Subcategory
    );

    return foundSubcategory;
};


export const createSubcategory = async (name: string, category: string) => {
    const colRef = collection(db, "subcategories");
    const foundSubcategory = await getSubategoryByName(colRef, name);

    if (Boolean(foundSubcategory)) {
        return foundSubcategory;
    }

    await addDoc(colRef, {
        name,
        category,
        isActive: false,
    });

    return await getSubategoryByName(colRef, name);
};


export const getSubcategoriesByNames = async (names: string[] | string) => {
    const namesToSearch = Array.isArray(names) ? names : [names];

    const colRef = collection(db, 'subcategories');

    const subcategories = []; 
    for(const name of namesToSearch) {
        const q = query(colRef, where('name', '==', name));
        const subcategoriesSnap = await getDocs(q);
        const [foundSubcategory] = subcategoriesSnap.docs.map(d => d.data() as Subcategory);

        if (Boolean(foundSubcategory)) {
            subcategories.push(foundSubcategory);
            continue;
        }

        const category = await createCategory(name);
        const createdSubcategory = await createSubcategory(name, category.name);
        subcategories.push(createdSubcategory);
    }
    return subcategories;
};
