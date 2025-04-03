import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

import { HttpError } from '../models/http-error';
import { UserPlace } from '../types/types';
import { getCoordinates } from '../utils/location';
import { Place } from '../models/place';

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

export const getPlaceById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const placeId = req.params.placeId;
	let targetPlace;

	try {
		targetPlace = await Place.findById(placeId).exec();
	} catch (err) {
		return next(
			new HttpError('Could not find place for provided id.', 500)
		);
	}

	if (!targetPlace) {
		return next(new HttpError('No place found for provided id.', 404));
	}

	res.json({ place: targetPlace.toObject({ getters: true }) });
};

export const getUserPlacesById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.params.userId;
	let targetPlaces;

	try {
		targetPlaces = await Place.find({ creator: userId }).exec();
	} catch (err) {
		return next(
			new HttpError('Could not find places for provided user id.', 500)
		);
	}

	if (targetPlaces.length === 0) {
		return next(
			new HttpError('No places found for provided user id.', 404)
		);
	}

	res.json({
		places: targetPlaces.map((place) => place.toObject({ getters: true })),
	});
};

export const createPlace = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { title, description, address, creator } = req.body;
	let coordinates;

	try {
		coordinates = await getCoordinates(address);
	} catch (err) {
		return next(
			new HttpError('Failed to get coordinates for address', 500)
		);
	}

	// N.B. using random image for now
	const createdPlace = new Place({
		title,
		description,
		address,
		location: coordinates,
		image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
		creator,
	});

	try {
		await createdPlace.save();
		res.status(201).json({ place: createdPlace });
	} catch (err) {
		return next(new HttpError('Creating place failed.', 500));
	}
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
	//DUMMY_PLACES[targetIndex] = updatedPlace;

	res.status(200).json({ place: updatedPlace });
};

export const deletePlace = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const placeId = req.params.placeId;
	const targetIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);

	if (targetIndex === -1) {
		return next(new HttpError('No place found for provided id.', 404));
	}

	DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id != placeId);

	res.status(200).json({ message: 'Place deleted' });
};
