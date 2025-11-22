import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Loader2, Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projectIntakeSchema, type ProjectIntakeFormData } from '@/schemas/projectIntakeSchema';
import { useProjectIntakeForm } from '@/hooks/useProjectIntakeForm';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useDraftRestore } from '@/hooks/useDraftRestore';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface ProjectIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { id: 1, title: 'Company Basics', fields: ['companyName', 'contactName', 'contactRole', 'contactEmail', 'industry', 'companySize', 'revenueBand', 'locationsServed'] },
  { id: 2, title: 'Goals & Success', fields: ['explorationPrompt', 'topThreeOutcomes', 'futureSuccess', 'constraints'] },
  { id: 3, title: 'Pain Points', fields: ['operationalFriction', 'repetitiveTasks', 'errorProne', 'busyProcesses', 'costImpact'] },
  { id: 4, title: 'Departments', fields: ['departmentsInScope', 'departmentDetails', 'criticalWorkflows'] },
  { id: 5, title: 'Systems & Data', fields: ['coreSystems', 'dataLocations', 'dataQuality', 'systemIntegrations', 'systemsToAvoid'] },
  { id: 6, title: 'AI Maturity', fields: ['currentAITools', 'whatWorkedWell', 'whatDidntWork', 'teamComfort'] },
  { id: 7, title: 'Stakeholders', fields: ['discoveryParticipants', 'budgetApprovers', 'skepticalStakeholders', 'decisionProcess'] },
  { id: 8, title: 'Constraints', fields: ['complianceFrameworks', 'sensitiveData', 'negativeExperiences', 'offLimitsAreas'] },
  { id: 9, title: 'Timeline', fields: ['preferredTimeline', 'communicationCadence', 'additionalInfo'] },
  { id: 10, title: 'Review', fields: [] },
];

const DEPARTMENTS = [
  'Leadership',
  'Operations',
  'Sales',
  'Marketing',
  'Customer Support / Success',
  'Finance',
  'HR',
  'IT / Systems',
  'Other'
];

const COMPLIANCE_OPTIONS = [
  'HIPAA',
  'SOC 2',
  'GDPR',
  'PCI-DSS',
  'ISO 27001',
  'None',
  'Other'
];

export const ProjectIntakeModal = ({ isOpen, onClose }: ProjectIntakeModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { submitForm, isSubmitting } = useProjectIntakeForm();

  const form = useForm<ProjectIntakeFormData>({
    resolver: zodResolver(projectIntakeSchema),
    mode: 'onChange',
  });

  const formData = form.watch();
  
  // Auto-save functionality
  useAutoSave(formData, isOpen);
  
  // Draft restoration
  useDraftRestore((data) => {
    Object.keys(data).forEach((key) => {
      form.setValue(key as any, data[key]);
    });
  });

  const handleNext = async () => {
    const currentStepFields = STEPS[currentStep - 1].fields as (keyof ProjectIntakeFormData)[];
    const isValid = await form.trigger(currentStepFields);
    
    if (isValid) {
      // Save to localStorage on step change
      localStorage.setItem('projectIntakeDraft', JSON.stringify({
        data: form.getValues(),
        timestamp: Date.now(),
      }));
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (data: ProjectIntakeFormData) => {
    const result = await submitForm(data);
    if (result.success) {
      localStorage.removeItem('projectIntakeDraft');
      onClose();
      navigate('/thank-you');
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI Audit Questionnaire
          </DialogTitle>
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 py-4">
            {/* Section 1: Company Basics */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corporation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Role *</FormLabel>
                        <FormControl>
                          <Input placeholder="CTO" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@acme.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry and Business Model *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., B2B SaaS providing marketing automation tools"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Size *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="500+">500+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="revenueBand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Revenue Band (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="<$1M">Less than $1M</SelectItem>
                            <SelectItem value="$1M-$5M">$1M - $5M</SelectItem>
                            <SelectItem value="$5M-$20M">$5M - $20M</SelectItem>
                            <SelectItem value="$20M-$100M">$20M - $100M</SelectItem>
                            <SelectItem value="$100M+">$100M+</SelectItem>
                            <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="locationsServed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Locations / Regions Served *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., North America, EMEA"
                          className="min-h-[60px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Section 2: Goals & Success Criteria */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="explorationPrompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What prompted you to explore AI or automation right now? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., Increasing operational costs, scaling challenges, competitive pressure..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topThreeOutcomes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Top 3 Outcomes You Want From This Audit *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="1. Cost reduction&#10;2. Faster response times&#10;3. Better reporting"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="futureSuccess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>If wildly successful, what will be true 6-12 months from now? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your vision of success..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="constraints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Non-Negotiable Constraints (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., Budget range, timeline expectations, compliance requirements..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Section 3: Current State & Pain Points */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="operationalFriction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Where do you feel the most operational friction today? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe areas where work feels slow, stuck, or inefficient..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repetitiveTasks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What tasks or processes feel the most repetitive or manual? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List repetitive tasks that consume significant time..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="errorProne"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Where do errors or mistakes happen most frequently? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Identify error-prone areas..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="busyProcesses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What processes fall behind when things get busy? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe bottlenecks during peak times..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="costImpact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What has the biggest impact on cost or lost revenue? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Identify major cost drivers or revenue leaks..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Section 4: Departments & Workflows */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="departmentsInScope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Which departments should be in scope for this audit? *</FormLabel>
                      <div className="grid md:grid-cols-2 gap-3 mt-2">
                        {DEPARTMENTS.map((dept) => (
                          <div key={dept} className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value?.includes(dept)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, dept]);
                                } else {
                                  field.onChange(current.filter((d) => d !== dept));
                                }
                              }}
                            />
                            <Label className="font-normal cursor-pointer">{dept}</Label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="departmentDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>For each in-scope department, describe what they do and how success is measured *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., Sales: Responsible for new customer acquisition. Success measured by deal velocity and conversion rate."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="criticalWorkflows"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Critical Workflows to Prioritize (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., lead-to-opportunity, customer onboarding, support ticket handling, order fulfillment"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Section 5: Systems & Data */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="coreSystems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What core systems do you use today? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., Salesforce (CRM), Zendesk (helpdesk), HubSpot (marketing), SAP (ERP)..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dataLocations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Where does most of your important data live? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., HubSpot, Salesforce, Google Sheets, PostgreSQL, custom databases..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dataQuality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How would you describe your data quality today? *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select data quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="clean">Clean</SelectItem>
                          <SelectItem value="somewhat-messy">Somewhat messy</SelectItem>
                          <SelectItem value="very-messy">Very messy</SelectItem>
                          <SelectItem value="not-sure">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="systemIntegrations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do your key systems integrate with each other? If yes, how? If no, what are the gaps? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe current integrations and integration gaps..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="systemsToAvoid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Systems We Should Avoid Touching (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., legacy systems, contractual limitations, security restrictions..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Section 6: AI & Automation Maturity */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentAITools"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What AI or automation tools are you currently using? (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., Chatbots, RPA, email sequences, AI assistants, custom scripts..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatWorkedWell"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What has worked well so far? (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe successful implementations..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatDidntWork"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What has not worked or felt like a failed experiment? (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe challenges or failures..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teamComfort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How comfortable is your team with AI tools in general? *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select comfort level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="very-comfortable">Very comfortable</SelectItem>
                          <SelectItem value="somewhat-comfortable">Somewhat comfortable</SelectItem>
                          <SelectItem value="skeptical">Skeptical</SelectItem>
                          <SelectItem value="not-sure">Not sure</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Section 7: Stakeholders & Decision-Making */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="discoveryParticipants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who needs to be involved in the discovery process? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List names, roles, and departments..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budgetApprovers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who will ultimately approve any implementation budget? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List decision makers..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skepticalStakeholders"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Are there stakeholders likely to be skeptical or resistant? (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Identify potential concerns or resistance..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="decisionProcess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How do major decisions usually get made? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., leadership team consensus, single decision-maker, committee review..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Section 8: Constraints, Risks, and Boundaries */}
            {currentStep === 8 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="complianceFrameworks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regulatory or Compliance Frameworks (Optional)</FormLabel>
                      <div className="grid md:grid-cols-2 gap-3 mt-2">
                        {COMPLIANCE_OPTIONS.map((framework) => (
                          <div key={framework} className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value?.includes(framework)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, framework]);
                                } else {
                                  field.onChange(current.filter((f) => f !== framework));
                                }
                              }}
                            />
                            <Label className="font-normal cursor-pointer">{framework}</Label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sensitiveData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Types We Must Not Send to External Tools (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., PII, PHI, payment data..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="negativeExperiences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Negative Experiences with AI or Automation Vendors (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share past challenges to help us avoid them..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="offLimitsAreas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Areas We Should Not Touch During This Audit (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List any processes, systems, or departments that are off-limits..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Section 9: Practical Details */}
            {currentStep === 9 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="preferredTimeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Timeline for Audit and Initial Recommendations *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                          <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                          <SelectItem value="1-2-months">1-2 months</SelectItem>
                          <SelectItem value="2-3-months">2-3 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="communicationCadence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Communication Cadence During the Audit *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cadence" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="daily">Daily updates</SelectItem>
                          <SelectItem value="2-3x-week">2-3x per week</SelectItem>
                          <SelectItem value="weekly">Weekly check-ins</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="async">Async only</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anything Else We Should Know Before We Get Started? (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share any additional context, concerns, or questions..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Section 10: Review */}
            {currentStep === 10 && (
              <div className="space-y-6">
                <div className="bg-secondary/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Review Your Responses
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please review your answers before submitting. You can go back to edit any section.
                  </p>
                  
                  <div className="space-y-4">
                    {STEPS.slice(0, -1).map((step, idx) => (
                      <div key={step.id} className="border-l-2 border-primary/20 pl-4 py-2">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(step.id)}
                          className="text-sm font-medium text-primary hover:underline flex items-center gap-2"
                        >
                          {step.title}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-muted-foreground mt-1">
                          {step.fields.length} fields completed
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm">
                    By submitting this questionnaire, you agree that the information provided is accurate and that we may use it to prepare your AI audit and initial recommendations.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handlePrevious}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem('projectIntakeDraft', JSON.stringify({
                      data: form.getValues(),
                      timestamp: Date.now(),
                    }));
                    onClose();
                  }}
                  disabled={isSubmitting}
                >
                  Save Draft & Close
                </Button>

                {currentStep < STEPS.length ? (
                  <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Questionnaire'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
