import express, { NextFunction } from 'express';
import { placesRoute } from './places-routes';
import { errorRoute } from './error-routes';

export const routes = express.Router();

routes.use('/api/places', placesRoute);

routes.use(errorRoute);
