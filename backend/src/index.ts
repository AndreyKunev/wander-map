import express, { Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send("Dungle!");
});

app.listen(process.env.PORT, () => {
  console.log(`server running : http://${process.env.HOST}:${process.env.PORT}`);
});