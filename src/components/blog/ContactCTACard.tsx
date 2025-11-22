import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, ArrowRight } from 'lucide-react';

export const ContactCTACard = () => {
  return (
    <GlassCard className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 ring-primary/20">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground">
          Let's Build Your AI Strategy Together
        </h2>
        <p className="text-lg text-muted-foreground">
          Ready to explore how AI can transform your business? Our Los Angeles-based team specializes in helping Southern California companies implement intelligent automation, decision intelligence, and custom AI solutions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="default">
            <a href="mailto:korra@elevatedai.co" className="gap-2">
              <Mail className="w-5 h-5" />
              korra@elevatedai.co
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="tel:+14244843844" className="gap-2">
              <Phone className="w-5 h-5" />
              1-424-484-3844
            </a>
          </Button>
        </div>
        <div>
          <Button asChild variant="ghost" size="lg" className="gap-2">
            <Link to="/contact">
              Visit Our Contact Page
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
