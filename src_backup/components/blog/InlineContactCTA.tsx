import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';

export const InlineContactCTA = () => {
  return (
    <GlassCard className="my-8 p-6 bg-primary/5 ring-primary/20">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Ready to Transform Your Business with AI?
        </h3>
        <p className="text-muted-foreground">
          Get expert guidance from Los Angeles-based AI consultants. 
          We help Southern California businesses implement intelligent automation and AI strategies.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="default">
            <a href="mailto:korra@elevatedai.co" className="gap-2">
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="tel:+14244843844" className="gap-2">
              <Phone className="w-4 h-4" />
              Call 1-424-484-3844
            </a>
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
