import express, { Express, Request, Response } from 'express';
import { userRouter } from './routers/user.router';
import * as dotenv from 'dotenv';
import cors from 'cors';
import pinoHttp from 'pino-http';
import pino from 'pino';
import { errorHandler } from './routers/middlewares/error.middleware';
import { eventRouter } from './routers/event.router';

dotenv.config();

export const buildApplication = (
  logger: pino.Logger | typeof console,
): express.Express => {
  const app: Express = express();

  app.use(pinoHttp({ logger: logger as pino.Logger }));
  app.use(cors()).use(express.json()).options('*', cors());

  app.use('/users', userRouter);
  app.use('/events', eventRouter);

  app.use(errorHandler);

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send({ status: 'UP' });
  });

  return app;
};
