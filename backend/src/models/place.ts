import { Schema, model } from 'mongoose';

import { IPlace } from '../types/types';

const placeSchema = new Schema<IPlace>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
		address: { type: String, required: true },
		location: {
			lat: { type: Number, required: true },
			lng: { type: Number, required: true },
		},
		creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	},
	{ timestamps: true }
);

export const Place = model<IPlace>('Place', placeSchema);
