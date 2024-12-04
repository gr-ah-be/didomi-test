import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
});

export type UserInput = z.infer<typeof UserSchema>;
