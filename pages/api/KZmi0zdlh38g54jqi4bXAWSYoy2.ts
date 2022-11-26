import { collection, getDocs } from "firebase/firestore/lite";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../firebase";

type Data = {
    ok: boolean;
    subcategories?: string[];
    error?: string;
};

type Subcategory = {
    name: string;
    isActive: boolean;
};

async function getSubcategories(
    _req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const colRef = collection(db, "subcategories");
        const docSnaps = await getDocs(colRef);
        const subcategoriesData = docSnaps.docs.map(
            (d) => d.data() as Subcategory
        );
        const subcategories = subcategoriesData
            .filter((sc) => sc.isActive)
            .map((sc) => sc.name);

        return res.status(200).json({
            ok: true,
            subcategories,
        });
    } catch (error: any) {
        console.log(error);
        console.log("Error during adding doc");

        if (typeof error === "string") {
            return res
                .status(204)
                .json({ ok: false, error, subcategories: [] });
        }

        return res.status(204).json({ ok: false, subcategories: [] });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return req.method === "GET"
        ? getSubcategories(req, res)
        : res.status(404).json({ ok: false, subcategories: [] });
}
