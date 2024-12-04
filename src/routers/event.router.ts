import { Router } from 'express';
import EventController from '../controllers/consent-event.controller';
import { validateSchema } from './middlewares/validate-schema';
import { ConsentEvent } from './middlewares/schemas/consent-event.schema';
import { asyncHandler } from './middlewares/async-handler';

const eventRouter = Router();

eventRouter.post(
  '/',
  validateSchema(ConsentEvent),
  asyncHandler(EventController.createEvent),
);

export { eventRouter };
