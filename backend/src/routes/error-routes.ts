import express, { NextFunction, Request, Response } from 'express';

import { IHttpError } from '../types/types';

export const errorRoute = express.Router();

errorRoute.use((err: IHttpError, req: Request, res: Response, next: NextFunction) => {
	if (res.headersSent) {
		return next(err); 
	}

	console.error(err.stack);
	res.status(err.code || 500)
	res.json({ message: err.message || 'Unknown error ocurred' });
});
