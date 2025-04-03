import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 6 },
		bio: { type: String, required: false },
		birthDate: { type: String, required: true },
		profilePicture: { type: String, required: true },
		places: { type: String, required: true },
	},
	{ timestamps: true }
);

export const User = model('User', userSchema);
