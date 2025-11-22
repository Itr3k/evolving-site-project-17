import { Clock, TrendingDown, Zap, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';
import { CaseStudyDetail } from '@/data/caseStudiesData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const outcomeIcons: Record<string, any> = {
  TrendingDown,
  Zap,
  Clock,
  DollarSign,
  CheckCircle,
};

interface FeaturedCaseStudyProps {
  caseStudy: CaseStudyDetail;
}

export const FeaturedCaseStudy = ({ caseStudy }: FeaturedCaseStudyProps) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-8 animate-on-scroll">
          <Badge variant="secondary" className="mb-4">Featured Success Story</Badge>
          <h2 className="text-4xl md:text-5xl font-normal tracking-tighter text-white mb-4">
            {caseStudy.title}
          </h2>
          <p className="text-lg text-white/60">
            {caseStudy.industry} • {caseStudy.timeline} implementation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image & Overview */}
          <div className="space-y-8 animate-on-scroll">
            <div className="aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10">
              <img
                src={caseStudy.thumbnail}
                alt={caseStudy.company}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-8">
              <h3 className="text-2xl font-medium text-white mb-4">The Challenge</h3>
              <p className="text-white/70 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-8">
              <h3 className="text-2xl font-medium text-white mb-4">The Solution</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                {caseStudy.solution}
              </p>

              <div>
                <h4 className="text-sm font-medium text-white/60 mb-3">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.stack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results & Investment */}
          <div className="space-y-8">
            <div className="backdrop-blur-sm bg-gradient-to-br from-primary/10 to-transparent rounded-2xl ring-1 ring-primary/20 p-8 animate-on-scroll">
              <h3 className="text-2xl font-medium text-white mb-6">Results Delivered</h3>
              
              <div className="grid gap-6">
                {caseStudy.outcomes.map((outcome, index) => {
                  const Icon = outcomeIcons[outcome.icon] || CheckCircle;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-primary/20 h-fit">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white mb-1">{outcome.value}</div>
                        <div className="text-sm font-medium text-white/80 mb-1">{outcome.metric}</div>
                        {outcome.description && (
                          <div className="text-xs text-white/60">{outcome.description}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-8 animate-on-scroll">
              <h3 className="text-2xl font-medium text-white mb-6">Investment</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Setup Cost</div>
                  <div className="text-2xl font-bold text-primary">{caseStudy.investment.setup}</div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="text-sm text-white/60 mb-1">Monthly Recurring</div>
                  <div className="text-2xl font-bold text-primary">{caseStudy.investment.recurring}</div>
                </div>
              </div>
            </div>

            {caseStudy.testimonial && (
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-8 animate-on-scroll">
                <div className="text-4xl text-primary/20 mb-4">"</div>
                <p className="text-white/80 italic leading-relaxed mb-4">
                  {caseStudy.testimonial.quote}
                </p>
                <div className="text-sm">
                  <div className="font-medium text-white">{caseStudy.testimonial.author}</div>
                  <div className="text-white/60">{caseStudy.testimonial.title}, {caseStudy.company}</div>
                </div>
              </div>
            )}

            <div className="animate-on-scroll">
              <Button size="lg" className="w-full" asChild>
                <Link to="/contact?intent=demo">
                  Start Your Transformation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
