import { Schema, model } from 'mongoose';

import { IUser } from '../types/types';

const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 6 },
		bio: { type: String, required: false },
		birthDate: { type: Date, required: true },
		profilePicture: { type: String, required: true },
		places: [
			{ type: Schema.Types.ObjectId, required: true, ref: 'Place' },
		],
	},
	{ timestamps: true }
);

export const User = model<IUser>('User', userSchema);
