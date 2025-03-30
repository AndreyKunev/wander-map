import { Request, Response, NextFunction, RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';

import { HttpError } from '../models/http-error';

const createPlaceValidationChecks = [
	check('title').trim().notEmpty().withMessage('Please provide a title.'),
	check('description').trim()
		.isLength({ min: 2})
		.withMessage('Please provide a description.'),
	check('address').trim().notEmpty().withMessage('Please provide an address.'),
	check('creator').trim().notEmpty().withMessage('Creator is required.'),
];

const updatePlaceValidationChecks = [
	check('title').notEmpty().trim().withMessage('Please provide a title.'),
	check('description')
		.isLength({ min: 2 })
		.withMessage('Description must be at least 5 characters.'),
];

const createUserValidationChecks = [
	check('name').notEmpty().withMessage('Name is required.'),
	check('birthDate').notEmpty().withMessage('Birth date is required.'),
	check('birthDate').isDate({ format: "dd/mm/yyyy" }).withMessage('Not a valid date.'),
	check('email').normalizeEmail().isEmail().withMessage('Invalid email.'),
	check('password').isLength({ min: 8}).withMessage('Minimum password length is 8 characters.'),
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
			`Invalid input: ❌ - ${errorMessages.join('\n ❌ - ')}`,
			422
		);
		return next(error);
	}
	next();
};

export const validateCreatePlace: RequestHandler[] = [
	...createPlaceValidationChecks,
	validateResults,
];

export const validateUpdatePlace: RequestHandler[] = [
	...updatePlaceValidationChecks,
	validateResults,
];

export const validateCreateUser: RequestHandler[] = [
	...createUserValidationChecks,
	validateResults,
];
