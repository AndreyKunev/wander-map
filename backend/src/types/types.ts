import { Types, Document } from "mongoose";

export interface IHttpError extends Error {
    code: number;
}

export interface IUser extends Document {
	name: string;
	email: string;
	bio: string;
	password: string;
	birthDate: Date;
    profilePicture: string;
	places: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

//export interface UserDoc extends IUser, Document {};

export interface IPlace extends Document {
    title: string;
    description: string;
    image: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
    creator: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

//export interface PlaceDoc extends IPlace, Document {};