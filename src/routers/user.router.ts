import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateSchema } from './middlewares/validate-schema';
import { UserSchema } from './middlewares/schemas/user.schema';
import { asyncHandler } from './middlewares/async-handler';

const userRouter = Router();

// Create a new user
userRouter.post(
  '/',
  validateSchema(UserSchema),
  asyncHandler(UserController.createUser),
);

// Get a user by ID along with their consent events
userRouter.get('/:id', asyncHandler(UserController.getUserById));

// Delete a user by ID
userRouter.delete('/:id', asyncHandler(UserController.deleteUser));

export { userRouter };
