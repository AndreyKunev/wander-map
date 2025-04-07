import { Types, Model, HydratedDocument } from 'mongoose';

export interface IHttpError extends Error {
	code: number;
}

export interface IUser {
	name: string;
	email: string;
	bio: string;
	password: string;
	birthDate: Date;
	profilePicture: string;
	places: Types.Array<Types.ObjectId>;
	createdAt?: Date;
	updatedAt?: Date;
}

export type UserDoc = HydratedDocument<IUser>;

export type UserModel = Model<IUser>;

export interface IPlace {
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

export type PlaceDoc = HydratedDocument<IPlace>;

export type PlaceModel = Model<IPlace>;