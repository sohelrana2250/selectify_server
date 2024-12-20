import { z } from 'zod';

// Define the Zod schema for validation
const TUserApplyValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    country: z.string().min(1, { message: 'Country is required' }),
    github: z.string({ message: 'Invalid GitHub URL' }),
    linkdin: z.string().url({ message: 'Invalid LinkedIn URL' }),
    portfolio: z.string().url({ message: 'Invalid portfolio URL' }),
  }),
});

export const UserApplyValidationSchema = {
  TUserApplyValidationSchema,
};
