import express from 'express';
import { createPlace, getPlaceById, getUserPlacesById, updatePlace } from '../controllers/places-controllers';
import { validatePlace, validateUpdatePlace } from '../middlewares/validate-place';

export const placesRoute = express.Router();

placesRoute.get('/:placeId', getPlaceById);

placesRoute.get('/user/:userId', getUserPlacesById);

placesRoute.post('/', validatePlace, createPlace)

placesRoute.patch('/:placeId', validateUpdatePlace, updatePlace)