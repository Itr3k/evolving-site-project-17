import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import type { ProjectIntakeFormData } from '@/schemas/projectIntakeSchema';

export const useProjectIntakeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (data: ProjectIntakeFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-project-intake-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit questionnaire');
      }

      toast({
        title: "Questionnaire submitted successfully!",
        description: "We'll review your responses and reach out within 24 hours.",
      });

      return { success: true };
    } catch (error) {
      console.error('Project intake form error:', error);
      toast({
        title: "Failed to submit questionnaire",
        description: "Please try again or email us directly at korra@elevatedai.co",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting,
  };
};
