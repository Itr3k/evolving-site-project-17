import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { contactSchema, type ContactFormData } from '@/schemas/contactSchema';
import { useContactForm } from '@/hooks/useContactForm';

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactFormModal = ({ open, onOpenChange }: ContactFormModalProps) => {
  const { submitForm, isSubmitting } = useContactForm();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const result = await submitForm(data);
    if (result.success) {
      reset();
      onOpenChange(false);
      navigate(`/contact/thank-you?name=${encodeURIComponent(data.firstName)}`);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isSubmitting) {
      reset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-neutral-900/95 backdrop-blur-md border border-white/10 text-white">
        {/* Decorative blurs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] -z-10" />
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-geist font-semibold text-white">
            Get in Touch
          </DialogTitle>
          <p className="text-neutral-400 text-sm mt-2">
            Tell us about your project and we'll get back to you as soon as possible.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white/90 font-geist">
                First Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder="John"
                className="bg-neutral-950/50 border-white/10 focus:ring-2 focus:ring-cyan-500/50 text-white placeholder:text-neutral-500 font-geist"
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm animate-in fade-in">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white/90 font-geist">
                Last Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder="Doe"
                className="bg-neutral-950/50 border-white/10 focus:ring-2 focus:ring-cyan-500/50 text-white placeholder:text-neutral-500 font-geist"
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm animate-in fade-in">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90 font-geist">
              Email <span className="text-red-400">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your@email.com"
              className="bg-neutral-950/50 border-white/10 focus:ring-2 focus:ring-cyan-500/50 text-white placeholder:text-neutral-500 font-geist"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-400 text-sm animate-in fade-in">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-white/90 font-geist">
              Company <span className="text-neutral-500 text-xs">(Optional)</span>
            </Label>
            <Input
              id="company"
              {...register('company')}
              placeholder="Your company name"
              className="bg-neutral-950/50 border-white/10 focus:ring-2 focus:ring-cyan-500/50 text-white placeholder:text-neutral-500 font-geist"
              disabled={isSubmitting}
            />
            {errors.company && (
              <p className="text-red-400 text-sm animate-in fade-in">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white/90 font-geist">
              Subject <span className="text-red-400">*</span>
            </Label>
            <select
              id="subject"
              {...register('subject')}
              className="w-full rounded-md bg-neutral-950/50 border border-white/10 focus:ring-2 focus:ring-cyan-500/50 text-white font-geist px-3 py-2"
              disabled={isSubmitting}
            >
              <option value="">Select a topic</option>
              <option value="sales">Sales Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </select>
            {errors.subject && (
              <p className="text-red-400 text-sm animate-in fade-in">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white/90 font-geist">
              Message <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Tell us about your project..."
              className="bg-neutral-950/50 border-white/10 focus:ring-2 focus:ring-cyan-500/50 text-white placeholder:text-neutral-500 font-geist min-h-[120px] resize-none"
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-red-400 text-sm animate-in fade-in">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-white text-neutral-900 hover:bg-cyan-100 font-geist font-medium disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
            <Button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/15 border-white/10 font-geist font-medium"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
