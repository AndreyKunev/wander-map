import { Request, Response, NextFunction, RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';

import { HttpError } from '../models/http-error';

const createValidationChecks = [
	check('title').not().isEmpty().withMessage('Please provide a title.'),
	check('description')
		.not()
		.isEmpty()
		.withMessage('Please provide a description.'),
	check('address').not().isEmpty().withMessage('Please provide an address.'),
	check('creator').not().isEmpty().withMessage('Creator is required.'),
	check('coordinates')
		.isObject()
		.withMessage('Coordinates should be an object.'),
];

const updateValidationChecks = [
	check('title')
		.optional()
		.not()
		.isEmpty()
		.withMessage('Please provide a title.'),
	check('description')
		.optional()
		.not()
		.isEmpty()
		.withMessage('Please provide a description.'),
	check('address')
		.optional()
		.not()
		.isEmpty()
		.withMessage('Please provide an address.'),
	check('creator')
		.optional()
		.not()
		.isEmpty()
		.withMessage('Creator is required.'),
	check('coordinates')
		.optional()
		.isObject()
		.withMessage('Coordinates should be an object.'),
];

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
	...createValidationChecks,
	validateResults,
];

export const validateUpdatePlace: RequestHandler[] = [
	...updateValidationChecks,
	validateResults,
];
