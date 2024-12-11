import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { ValidationError } from '../errors';
import { logger } from '../config/logger';
import { DatabaseError } from '../errors';

class UserController {
  /**
   * Create a new user.
   * @param req - The Express request object.
   * @param res - The Express response object.
   */
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await UserService.createUser(email);
      return res.status(201).json(user);
    } catch (error) {
      logger.error(error, 'Error creating user');
      if (error instanceof DatabaseError) {
        return res
          .status(422)
          .json({ message: error.message, errors: error.errors });
      }
      next(error);
    }
  }

  /**
   * Delete a user by ID.
   * @param req - The Express request object.
   * @param res - The Express response object.
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await UserService.deleteUser(Number(id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await UserService.findUserById(Number(id));

      if (!user) {
        throw new ValidationError('User not found.');
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      if (error instanceof ValidationError) {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }
}

export default new UserController();
