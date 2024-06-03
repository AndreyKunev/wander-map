import { NextFunction, Request, Response } from 'express';

import { IHttpError } from '../types/types';

export const serverErrorHandler = (err: IHttpError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err); 
    }

    console.error(err.stack);
    res.status(err.code || 500).json({ message: err.message || 'Unknown error occurred' });
};
