export interface IHttpError extends Error {
    code: number;
}

export type UserPlace = {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
    creator: string;
};
