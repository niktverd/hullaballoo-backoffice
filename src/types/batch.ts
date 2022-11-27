export type Batch = {
    _id: string;
    isFull: boolean;
    popularity: number;
    videoIds: string[];
    category: string;
    subcategory: string;
};
