import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../models/http-error';
import { getCoordinates } from '../utils/location';
import { Place } from '../models/place';

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
			new HttpError('Could not find place with provided id.', 500)
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
			new HttpError('Could not find places with provided user id.', 500)
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

export const updatePlace = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!Object.keys(req.body).length) {
		return next(new HttpError('No valid fields provided for update.', 400));
	}
	const placeId = req.params.placeId;
	const { title, description } = req.body;
	let updatedPlace;

	try {
		updatedPlace = await Place.findByIdAndUpdate(
			placeId,
			{
				title,
				description,
			},
			{ new: true, runValidators: true }
		).exec();
	} catch (err) {
		return next(
			new HttpError('Could not find place with provided id.', 500)
		);
	}

	if (!updatedPlace) {
		return next(new HttpError('No place found for provided id.', 404));
	}

	res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

export const deletePlace = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const placeId = req.params.placeId;
	let deletedPlace;

	try {
		deletedPlace = await Place.findByIdAndDelete(placeId);
		if (!deletedPlace) {
			return next(new HttpError('No place found with provided id.', 404));
		}
	} catch (err) {
		return next(
			new HttpError('Could not delete place with provided id.', 500)
		);
	}

	res.status(200).json({ message: 'Place deleted.' });
};
