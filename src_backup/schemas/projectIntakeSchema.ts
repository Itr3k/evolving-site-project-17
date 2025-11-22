import { z } from 'zod';

export const projectIntakeSchema = z.object({
  // Section 1: Company Basics
  companyName: z
    .string()
    .trim()
    .min(1, { message: "Company name is required" })
    .max(100, { message: "Company name must be less than 100 characters" }),
  contactName: z
    .string()
    .trim()
    .min(1, { message: "Contact name is required" })
    .max(100, { message: "Contact name must be less than 100 characters" }),
  contactRole: z
    .string()
    .trim()
    .min(1, { message: "Contact role is required" })
    .max(100, { message: "Contact role must be less than 100 characters" }),
  contactEmail: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  industry: z
    .string()
    .trim()
    .min(1, { message: "Industry and business model is required" })
    .max(200, { message: "Industry must be less than 200 characters" }),
  companySize: z
    .string()
    .min(1, { message: "Please select company size" }),
  revenueBand: z
    .string()
    .optional(),
  locationsServed: z
    .string()
    .trim()
    .min(1, { message: "Locations/regions served is required" })
    .max(500, { message: "Locations must be less than 500 characters" }),
  
  // Section 2: Goals & Success Criteria
  explorationPrompt: z
    .string()
    .trim()
    .min(10, { message: "Please provide at least 10 characters" })
    .max(1000, { message: "Maximum 1000 characters" }),
  topThreeOutcomes: z
    .string()
    .trim()
    .min(10, { message: "Please provide at least 3 outcomes" })
    .max(1000, { message: "Maximum 1000 characters" }),
  futureSuccess: z
    .string()
    .trim()
    .min(10, { message: "Please describe your vision (at least 10 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  constraints: z
    .string()
    .trim()
    .max(1000, { message: "Maximum 1000 characters" })
    .optional(),
  
  // Section 3: Current State & Pain Points
  operationalFriction: z
    .string()
    .trim()
    .min(10, { message: "Please provide details (at least 10 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  repetitiveTasks: z
    .string()
    .trim()
    .min(10, { message: "Please provide details (at least 10 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  errorProne: z
    .string()
    .trim()
    .min(5, { message: "Please provide details (at least 5 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  busyProcesses: z
    .string()
    .trim()
    .min(5, { message: "Please provide details (at least 5 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  costImpact: z
    .string()
    .trim()
    .min(5, { message: "Please provide details (at least 5 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  
  // Section 4: Departments & Workflows
  departmentsInScope: z
    .array(z.string())
    .min(1, { message: "Please select at least one department" }),
  departmentDetails: z
    .string()
    .trim()
    .min(10, { message: "Please describe each department (at least 10 characters)" })
    .max(2000, { message: "Maximum 2000 characters" }),
  criticalWorkflows: z
    .string()
    .trim()
    .max(2000, { message: "Maximum 2000 characters" })
    .optional(),
  
  // Section 5: Systems & Data
  coreSystems: z
    .string()
    .trim()
    .min(5, { message: "Please list your systems (at least 5 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  dataLocations: z
    .string()
    .trim()
    .min(5, { message: "Please describe data locations (at least 5 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  dataQuality: z
    .string()
    .min(1, { message: "Please select data quality level" }),
  systemIntegrations: z
    .string()
    .trim()
    .min(10, { message: "Please describe integrations (at least 10 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  systemsToAvoid: z
    .string()
    .trim()
    .max(500, { message: "Maximum 500 characters" })
    .optional(),
  
  // Section 6: AI & Automation Maturity
  currentAITools: z
    .string()
    .trim()
    .max(1000, { message: "Maximum 1000 characters" })
    .optional(),
  whatWorkedWell: z
    .string()
    .trim()
    .max(1000, { message: "Maximum 1000 characters" })
    .optional(),
  whatDidntWork: z
    .string()
    .trim()
    .max(1000, { message: "Maximum 1000 characters" })
    .optional(),
  teamComfort: z
    .string()
    .min(1, { message: "Please select team comfort level" }),
  
  // Section 7: Stakeholders & Decision-Making
  discoveryParticipants: z
    .string()
    .trim()
    .min(10, { message: "Please list participants (at least 10 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  budgetApprovers: z
    .string()
    .trim()
    .min(5, { message: "Please list approvers (at least 5 characters)" })
    .max(500, { message: "Maximum 500 characters" }),
  skepticalStakeholders: z
    .string()
    .trim()
    .max(1000, { message: "Maximum 1000 characters" })
    .optional(),
  decisionProcess: z
    .string()
    .trim()
    .min(10, { message: "Please describe decision process (at least 10 characters)" })
    .max(1000, { message: "Maximum 1000 characters" }),
  
  // Section 8: Constraints, Risks, and Boundaries
  complianceFrameworks: z
    .array(z.string())
    .optional(),
  sensitiveData: z
    .string()
    .trim()
    .max(1000, { message: "Maximum 1000 characters" })
    .optional(),
  negativeExperiences: z
    .string()
    .trim()
    .max(1000, { message: "Maximum 1000 characters" })
    .optional(),
  offLimitsAreas: z
    .string()
    .trim()
    .max(1000, { message: "Maximum 1000 characters" })
    .optional(),
  
  // Section 9: Practical Details
  preferredTimeline: z
    .string()
    .min(1, { message: "Please select preferred timeline" }),
  communicationCadence: z
    .string()
    .min(1, { message: "Please select communication preference" }),
  additionalInfo: z
    .string()
    .trim()
    .max(2000, { message: "Maximum 2000 characters" })
    .optional(),
});

export type ProjectIntakeFormData = z.infer<typeof projectIntakeSchema>;
