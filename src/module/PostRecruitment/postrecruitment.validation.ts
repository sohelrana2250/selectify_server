import { z } from 'zod';
import { CURRENCY, WORKINGTIME } from './postrecruitment.constant';

const TResponsibilitiesSchema = z.object({
  responsibilities: z.string().min(1, 'Responsibilities are required'),
});

const TUpdateResponsibilitiesSchema = z.object({
    responsibilities: z.string().min(1, 'Responsibilities are required').optional(),
  }).optional();
const TSkillsSchema = z.object({
  skills: z.string().min(1, 'Skills are required'),
}).optional();
const TUpdateSkillsSchema = z.object({
    skills: z.string().min(1, 'Skills are required').optional(),
  }).optional();
  

const TRequirementsSchema = z.object({
  requirements: z.string().min(1, 'Requirements are required'),
});
const TUpdateRequirementsSchema = z.object({
    requirements: z.string().min(1, 'Requirements are required').optional(),
  }).optional();

const TPostRecruitmentValidationSchema = z.object({
  body: z.object({
    companyapplyId: z.string(),
    position: z.string().min(1, 'Position is required'),
    companyname: z.string().min(1, 'Company name is required'),
    experience: z.string().min(1, 'Experience is required'),
    workingtime: z.enum([
      WORKINGTIME.FULLTIME,
      WORKINGTIME.PARTTIME,
      WORKINGTIME.CONTRACTUAL,
    ]),
    location: z.string().min(1, 'Location is required'),
    overview: z.string().min(1, 'Overview is required'),
    responsibilities: z
      .array(TResponsibilitiesSchema)
      .min(1, 'At least one responsibility is required'),
    skills: z.array(TSkillsSchema).min(1, 'At least one skill is required'),
    requirements: z
      .array(TRequirementsSchema)
      .min(1, 'At least one requirement is required'),
    salary: z.union([
      z.number().min(0, 'Salary must be a positive number'),
      z.literal('negotiation'),
    ]),
    currency: z.enum([CURRENCY.BDT, CURRENCY.USD]),
    startingdate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'Invalid starting date'),
    endtingdate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'Invalid ending date'),
    image: z.string().url('Image must be a valid URL'),
    isDeleted: z.boolean().optional().default(false),
  }),
});
const TUpdatePostRecruitmentValidationSchema = z.object({
    body: z.object({
      companyapplyId: z.string().optional(),
      position: z.string().min(1, 'Position is required').optional(),
      companyname: z.string().min(1, 'Company name is required').optional(),
      experience: z.string().min(1, 'Experience is required').optional(),
      workingtime: z.enum([
        WORKINGTIME.FULLTIME,
        WORKINGTIME.PARTTIME,
        WORKINGTIME.CONTRACTUAL,
      ]).optional(),
      location: z.string().min(1, 'Location is required').optional(),
      overview: z.string().min(1, 'Overview is required').optional(),
      responsibilities: z
        .array(TUpdateResponsibilitiesSchema)
        .min(1, 'At least one responsibility is required').optional(),
      skills: z.array(TUpdateSkillsSchema).min(1, 'At least one skill is required').optional(),
      requirements: z
        .array(TUpdateRequirementsSchema)
        .min(1, 'At least one requirement is required').optional(),
      salary: z.union([
        z.number().min(0, 'Salary must be a positive number'),
        z.literal('negotiation').optional(),
      ]),
      currency: z.enum([CURRENCY.BDT, CURRENCY.USD]).optional(),
      startingdate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), 'Invalid starting date').optional(),
      endtingdate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), 'Invalid ending date').optional(),
      image: z.string().url('Image must be a valid URL').optional(),
      isDeleted: z.boolean().optional().default(false).optional(),
    }),
  });

export const PostRecruitmentValidationSchema = {
  TPostRecruitmentValidationSchema,
  TUpdatePostRecruitmentValidationSchema
};
