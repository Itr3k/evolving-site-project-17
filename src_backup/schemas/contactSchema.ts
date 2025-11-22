import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  company: z
    .string()
    .trim()
    .max(100, { message: "Company name must be less than 100 characters" })
    .optional(),
  subject: z
    .string()
    .min(1, { message: "Please select a subject" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
  interestedIn: z
    .array(z.string())
    .min(1, { message: "Please select at least one area of interest" })
    .optional(),
  timeline: z
    .string()
    .optional(),
  budget: z
    .string()
    .optional(),
  referralSource: z
    .string()
    .optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
