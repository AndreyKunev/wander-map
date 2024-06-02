import express, { Express, Request, Response } from 'express';

import dotenv from 'dotenv';

import { routes } from './routes';

const app: Express = express();

dotenv.config();

app.use(express.json());

app.use('/', routes);

app.listen(process.env.PORT, () => {
	console.log(
		`server running : http://${process.env.HOST}:${process.env.PORT}`
	);
});
