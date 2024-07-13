import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
	console.log(`METHOD: ${req.method}|----|URL: ${req.url}`);
	next();
};
