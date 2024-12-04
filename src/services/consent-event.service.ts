import EventRepository from '../repositories/consent-event.repository';
import UserRepository from '../repositories/user.repository'; // To ensure user existence
import { ValidationError } from '../errors';

class ConsentEventService {
  /**
   * Create a consent event for a user.
   * @param userId - The ID of the user.
   * @param consentId - The ID of the consent type.
   * @param enabled - Whether the consent is enabled.
   * @throws ValidationError - If the user is not found.
   * @returns The created consent change event.
   */
  async createEvent(userId: number, consentId: string, enabled: boolean) {
    const user = await UserRepository.findUserById(userId);
    if (!user) {
      throw new ValidationError('User not found.');
    }

    return EventRepository.createEvent(userId, consentId, enabled);
  }

  /**
   * Retrieve the last consent event for a user and a consent type.
   * @param userId - The ID of the user.
   * @param consentId - The ID of the consent type.
   * @returns The last consent change event for the user and the consent type, or null if none exists.
   */
  async getLastEventByUserIdAndConsentId(userId: number, consentId: string) {
    return EventRepository.getLastEventByUserIdAndConsentId(userId, consentId);
  }
}

export default new ConsentEventService();
