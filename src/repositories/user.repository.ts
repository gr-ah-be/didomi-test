import { Sequelize } from 'sequelize';
import { ConsentChangeEvent, User } from '../models';

class UserRepository {
  /**
   * Create a new user.
   * @param email The email of the user
   * @returns The created user
   */
  async createUser(
    email: string,
  ): Promise<Pick<User, 'id' | 'email'> & { consents: ConsentChangeEvent[] }> {
    const createdUser = await User.create({ email });
    return {
      id: createdUser.id,
      email: createdUser.email,
      consents: [],
    };
  }

  /**
   * Find a user by ID.
   * @param id The ID of the user to find
   * @param attributes The attributes to retrieve from the consent-change-event model
   * @returns The user with the given ID if found, otherwise null
   */
  async findUserById(id: number, attributes?: string[]): Promise<User | null> {
    const options: {
      where: { id: number };
      include?: Record<string, unknown>[];
    } = {
      where: { id },
    };
    if (attributes && attributes.length > 0) {
      options.include = [
        {
          model: ConsentChangeEvent,
          as: 'events',
          attributes,
          separate: true,
          where: Sequelize.literal(`
            "ConsentChangeEvent"."id" IN (
              SELECT MAX("id") 
              FROM "consent_change_events" 
              WHERE "userId" = ${id} 
              GROUP BY "consentId"
            )
          `),
        },
      ];
    }
    return User.findOne(options);
  }

  /**
   * Find a user by email.
   * @param email The email of the user to find
   * @returns The user with the given email if found, otherwise null
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  /**
   * Delete a user by ID.
   * @param id The ID of the user to delete
   * @returns The number of rows deleted (0 if no user was found with the given ID)
   */
  async deleteUserById(id: number): Promise<number> {
    return User.destroy({ where: { id } });
  }
}

export default new UserRepository();
