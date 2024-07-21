import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../models/http-error';

export const notFoundHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const error = new HttpError('Route not found', 404);
	next(error);
};
