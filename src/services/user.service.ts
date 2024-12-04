import { DatabaseError } from '../errors';
import { UniqueConstraintError } from 'sequelize';
import UserRepository from '../repositories/user.repository';
import { ValidationError } from '../errors';
import { logger } from '../config/logger';

class UserService {
  /**
   * Create a new user.
   * @param email The email of the user to create
   * @throws ValidationError if the email is already in use
   * @returns The created user
   */
  async createUser(email: string) {
    try {
      const existingUser = await UserRepository.findUserByEmail(email);
      if (existingUser) {
        throw new ValidationError('Email already in use.');
      }

      return await UserRepository.createUser(email);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new DatabaseError('Duplicate email', 422, [
          {
            field: 'email',
            value: email,
            message: 'Email already exists',
          },
        ]);
      }
      throw error;
    }
  }

  /**
   * Delete a user by ID.
   * @param id The ID of the user to delete
   * @throws ValidationError if the user is not found
   */
  async deleteUser(id: number) {
    try {
      const rowsDeleted = await UserRepository.deleteUserById(id);

      if (rowsDeleted === 0) {
        throw new ValidationError('User not found.');
      }

      return rowsDeleted;
    } catch (error) {
      logger.error(
        'An unexpected error occurred while deleting the user:',
        error,
      );
      throw error;
    }
  }

  /**
   * Find a user by ID.
   * @param id The ID of the user to find
   * @returns The user with the given ID if found, otherwise null
   */
  async findUserById(id: number) {
    return UserRepository.findUserById(id, ['consentId', 'enabled']);
  }
}

export default new UserService();
