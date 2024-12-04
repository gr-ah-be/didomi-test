import { Request, Response } from 'express';
import EventService from '../services/consent-event.service';

class EventController {
  async createEvent(req: Request, res: Response) {
    const { userId, consentId, enabled } = req.body;

    const lastEvent = await EventService.getLastEventByUserIdAndConsentId(
      userId,
      consentId,
    );

    if (lastEvent && lastEvent.enabled === enabled) {
      return res.status(200).json({
        message: 'Event already matches the latest state and was discarded.',
      });
    }

    const newEvent = await EventService.createEvent(userId, consentId, enabled);
    return res.status(201).json(newEvent);
  }
}

export default new EventController();
