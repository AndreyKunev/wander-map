import { Request, Response, NextFunction, RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';

import { HttpError } from '../models/http-error';

const createPlaceValidationChecks = [
	check('title').trim().notEmpty().withMessage('Please provide a title.'),
	check('description').trim()
		.notEmpty()
		.withMessage('Please provide a description.'),
	check('address').trim().notEmpty().withMessage('Please provide an address.'),
	check('creator').trim().notEmpty().withMessage('Creator is required.'),
	check('coordinates')
		.isObject()
		.withMessage('Coordinates should be an object.'),
];

const updatePlaceValidationChecks = [
	check('title').notEmpty().trim().withMessage('Please provide a title.'),
	check('description')
		.isLength({ min: 5 })
		.withMessage('Description must be at least 5 characters.'),
];

const loginUserValidationChecks = [
	check('email').trim().isEmail().withMessage('Please provide an email.'),
	check('password').trim().notEmpty().withMessage('Password is required.'),
];

const createUserValidationChecks = [
	check('name').notEmpty().withMessage('Name is required.'),
	check('birthDate').notEmpty().withMessage('Birth date is required.'),
	check('birthDate').isDate()
]

const validateResults: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((e) => e.msg);
		const error = new HttpError(
			`Invalid input: ${errorMessages.join(' & ')}`,
			422
		);
		return next(error);
	}
	next();
};

export const validatePlace: RequestHandler[] = [
	...createPlaceValidationChecks,
	validateResults,
];

export const validateUpdatePlace: RequestHandler[] = [
	...updatePlaceValidationChecks,
	validateResults,
];
