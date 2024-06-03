import express, { Express, Request, Response } from 'express';

import dotenv from 'dotenv';

import { routes } from './routes';
import { notFoundHandler } from './middlewares/not-found-handler';
import { serverErrorHandler } from './middlewares/server-error-handler';


const app: Express = express();

dotenv.config();

app.use(express.json());

app.use('/', routes);

app.use(notFoundHandler);

app.use(serverErrorHandler);

app.listen(process.env.PORT, () => {
	console.log(
		`server running : http://${process.env.HOST}:${process.env.PORT}`
	);
});
