import axios from 'axios';
import { HttpError } from '../models/http-error';

export const getCoordinates = async (address: string) => {
	const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
	const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
		address
	)}&key=${API_KEY}`;

	const res = await axios.get(URL);

	const data = res.data;

	if (!data || data.status === 'ZERO_RESULTS') {
		const error = new HttpError(
			'Could not find location for address.',
			422
		);
        
        throw error;
	}

    const coordinates = data.results[0].geometry.location;    

    return coordinates;
};
