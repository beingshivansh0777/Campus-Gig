import { z } from 'zod';

export const jobSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title is too long (max 200 characters)'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(5000, 'Description is too long (max 5000 characters)'),
  jobCategory: z.string().min(1, 'Please select a category'),
  experienceLevel: z.string().min(1, 'Please select an experience level'),
  budget: z.coerce.number().positive('Budget must be greater than 0'),
  deadline: z.string().min(1, 'Please choose a deadline'),
});