import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number should only contain digits'),
  dob: z.string().min(1, 'Date of birth is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
    .regex(/[0-9]/, 'Password must include at least one number'),
});

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordRequestSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  otp: z.string().min(4, 'Please enter the code sent to your email'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
    .regex(/[0-9]/, 'Password must include at least one number'),
});