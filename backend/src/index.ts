import express, { Express } from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

import { routes } from './routes';
import { notFoundHandler } from './middlewares/not-found-handler';
import { serverErrorHandler } from './middlewares/server-error-handler';
import { logger } from './middlewares/logger';
import { customCors } from './middlewares/custom-cors';

dotenv.config();

export const app: Express = express();

if (typeof process.env.MONGO_URI === 'undefined') {
	throw new Error('Environment variable MONGO_URI is undefined.');
}

export const mongoURI: string = process.env.MONGO_URI;


app.use(express.json());

app.use(logger);

app.use(customCors);

app.use('/', routes);

app.use(notFoundHandler);

app.use(serverErrorHandler);

export const connectDB = async () =>{
	try {
		await mongoose.connect(mongoURI);
		console.log('Connected to DB.');
	} catch (error) {
		console.error('DB connection error:', error);
		process.exit(1);
	}

}

