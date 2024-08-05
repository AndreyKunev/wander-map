import express from 'express';

import { placesRoute } from './places-routes';
import { userRoutes } from './users-routes';

export const routes = express.Router();

routes.use('/api/places', placesRoute);

routes.use('/api/users', userRoutes);