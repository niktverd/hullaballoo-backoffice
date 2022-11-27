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
    threads?: string[];
} & Base;

export type Offer = {
    _id?: string;
    name: string;
    buttonLink: string;
    banners: string[];
} & Base;

export type Thread = {
    _id: string;
} & Base;

export const Populiarity = [
    0,
    50,
    500,
    5000,
    50000,
    99999999999,
];
