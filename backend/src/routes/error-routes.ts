import express, { NextFunction, Request, Response } from 'express';

import { CustomError } from '../types/types';

export const errorRoute = express.Router();

errorRoute.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
	if (res.headersSent) {
		return next(err); 
	}

	console.error(err.stack);
	res.status(err.code || 500)
	res.json({ message: err.message || 'Unknown error ocurred' });
});
