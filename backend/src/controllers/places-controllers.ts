import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../models/http-error';
import { UserPlace } from '../types/types';
import { randomUUID } from 'crypto';

let DUMMY_PLACES = [
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

	const targetPlace = DUMMY_PLACES.find((place) => {
		return place.id === placeId;
	});

	if (!targetPlace) {
		throw new HttpError('No place found for provided id.', 404);
	}

	res.json({ place: targetPlace });
};

export const getUserPlacesById = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.params.userId;

	const places = DUMMY_PLACES.filter((place) => {
		return place.creator === userId;
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
		creator,
	};

	DUMMY_PLACES.push(createdPlace);

	res.status(201).json({ place: createdPlace });
};

export const updatePlace = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const placeId = req.params.placeId;
	const { title, description } = req.body;

	const updatedPlace = {
		...DUMMY_PLACES.find((place) => place.id == placeId),
	};

	if (!updatedPlace) {
		return next(new HttpError('No place found for provided id.', 404));
	}

	if (title) {
		updatedPlace.title = title;
	}

	if (description) {
		updatedPlace.description = description;
	}

	const targetIndex = DUMMY_PLACES.findIndex((place) => place.id == placeId);
	DUMMY_PLACES[targetIndex] = updatedPlace;

	res.status(200).json({ place: updatedPlace });
};

export const deletePlace = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const placeId = req.params.placeId;
	const targetPlace = DUMMY_PLACES.findIndex((place) => place.id === placeId);

	if (targetPlace === -1) {
		return next(new HttpError('No place found for provided id.', 404));
	}

	DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id != placeId);

	res.status(200).json({ message: 'Place deleted' });
};
