import express from 'express';
import { placesRoute } from './places-routes';

export const routes = express.Router();

routes.use('/api/places', placesRoute);

