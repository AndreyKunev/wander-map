import express, { Express, NextFunction, Request, Response } from 'express';

import { CustomError } from '../types/types';

export const placesRoute = express.Router();

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

placesRoute.get(
	'/:placeId',
	(req: Request, res: Response, next: NextFunction) => {
		const placeId = req.params.placeId;

		const place = DUMMY_PLACES.find((p) => {
			return p.id === placeId;
		});

		if (!place) {
			const error: CustomError = new Error(
				'No place found for provided id.'
			);
			error.code = 404;
			throw error;
		}

		res.json({ place });
	}
);

placesRoute.get(
	'/user/:userId',
	(req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.userId;

		const places = DUMMY_PLACES.filter((p) => {
			return p.creator === userId;
		});

		if (places.length === 0) {
			const error: CustomError = new Error(
				'No place found for provided user id.'
			);
			error.code = 404;
			return next(error);
		}

		res.json({ places });
	}
);
