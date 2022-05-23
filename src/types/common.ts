export type Base = {
    createdAt?: string;
    updatedAt?: string;
};

export type Card = {
    _id: string;
    name: string;
    videoUrl?: string;
    account?: string;
    description?: string;
    likes?: number;
} & Base;

export type Offer = {
    _id?: string;
    name: string;
    buttonLink: string;
    banners: string[];
} & Base;

export type Thread = {
    _id: string;
    cards: string[];
} & Base;