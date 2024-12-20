import { object, z } from 'zod';

const TCV_ProfileValidationSchema = z.object({
  body: z.object({
    personalInfo: z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      website: z.string().optional(),
    }),
    education: z.array(z.string()).optional(),
    experience: z
      .array(
        z.object({
          company: z.string().optional(),
          role: z.string().optional(),
          period: z.string().optional(),
          description: z.string().optional(),
        }),
      )
      .optional(),
    skills: z.object({
      technical: z.array(z.string()).optional(),
      soft: z.array(z.string()).optional(),
      languages: z.array(z.string()).optional(),
      tools: z.array(z.string()).optional(),
    }),
    projects: z.array(z.string()).optional(),
    certifications: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
  }).optional(),
});


export const CV_ProfileValidation={
    TCV_ProfileValidationSchema
}
