import { ConsentChangeEvent } from '../models';

class EventRepository {
  async createEvent(
    userId: number,
    consentId: string,
    enabled: boolean,
  ): Promise<ConsentChangeEvent> {
    return ConsentChangeEvent.create({ userId, consentId, enabled });
  }

  async getEventsByUserId(userId: number): Promise<ConsentChangeEvent[]> {
    return ConsentChangeEvent.findAll({
      where: { userId },
      order: [['createdAt', 'ASC']],
      attributes: { include: ['id', 'enabled'] },
    });
  }

  async getLastEventByUserIdAndConsentId(
    userId: number,
    consentId: string,
  ): Promise<ConsentChangeEvent | null> {
    return ConsentChangeEvent.findOne({
      where: { userId, consentId },
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new EventRepository();
