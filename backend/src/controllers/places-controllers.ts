import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../models/http-error';
import { UserPlace } from '../types/types';
import { randomUUID } from 'crypto';

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description: 'Wow!',
		location: {
			lat: 40.7484474,
			lng: -73.9871516,
		},
		address: '20 W 34th St, New York, NY 10001',
		creator: 'u1',
	},
	{
		id: 'p2',
		title: 'Empire State Building',
		description: 'Wow!',
		location: {
			lat: 40.7484474,
			lng: -73.9871516,
		},
		address: '20 W 34th St, New York, NY 10001',
		creator: 'u2',
	},
	{
		id: 'p3',
		title: 'Empire State Building',
		description: 'Wow!',
		location: {
			lat: 40.7484474,
			lng: -73.9871516,
		},
		address: '20 W 34th St, New York, NY 10001',
		creator: 'u1',
	},
];

export const getPlaceById = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const placeId = req.params.placeId;

	const place = DUMMY_PLACES.find((p) => {
		return p.id === placeId;
	});

	if (!place) {
		throw new HttpError('No place found for provided id.', 404);
	}

	res.json({ place });
};

export const getUserPlacesById = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.params.userId;

	const places = DUMMY_PLACES.filter((p) => {
		return p.creator === userId;
	});

	if (places.length === 0) {
		return next(new HttpError('No place found for provided user id.', 404));
	}

	res.json({ places });
};

export const createPlace = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { title, description, coordinates, address, creator } = req.body;
	const createdPlace: UserPlace = {
		id: randomUUID(),
		title,
		description,
		location: coordinates,
		address,
		creator
	};

	DUMMY_PLACES.push(createdPlace);

	res.status(201).json({ place: createdPlace });
};
