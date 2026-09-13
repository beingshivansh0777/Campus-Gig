import { z } from 'zod';

export const proposalSchema = z.object({
  coverLetter: z
    .string()
    .min(30, 'Your cover letter should be at least 30 characters — explain why you\'re a good fit')
    .max(2000, 'Cover letter is too long (max 2000 characters)'),
  bidAmount: z.coerce.number().positive('Bid must be greater than 0'),
  deliveryDate: z.string().min(1, 'Please choose an expected delivery date'),
});