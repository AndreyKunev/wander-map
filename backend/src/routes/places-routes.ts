import express from 'express';
import { createPlace, getPlaceById, getUserPlacesById } from '../controllers/places-controllers';

export const placesRoute = express.Router();

placesRoute.get('/:placeId', getPlaceById);

placesRoute.get('/user/:userId', getUserPlacesById);

placesRoute.post('/', createPlace)