import { z } from 'zod';

export const ConsentEvent = z.object({
  userId: z
    .number()
    .int()
    .positive({ message: 'User ID must be a positive integer' }),
  consentId: z.enum(['email_notifications', 'sms_notifications'], {
    message: 'Invalid consent ID',
  }),
  enabled: z.boolean(),
});

export type ConsentEventInput = z.infer<typeof ConsentEvent>;
