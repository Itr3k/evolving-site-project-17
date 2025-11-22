import { ArrowRight, Clock } from 'lucide-react';
import { CaseStudyDetail } from '@/data/caseStudiesData';
import { Badge } from '@/components/ui/badge';

interface CaseStudyCardProps {
  caseStudy: CaseStudyDetail;
}

export const CaseStudyCard = ({ caseStudy }: CaseStudyCardProps) => {
  return (
    <div className="group">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 overflow-hidden hover:bg-white/10 hover:ring-white/20 transition-all duration-300">
          {/* Image */}
          <div className="aspect-video overflow-hidden">
            <img
              src={caseStudy.thumbnail}
              alt={caseStudy.company}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <Badge variant="secondary">{caseStudy.industry}</Badge>
              
              {caseStudy.isPlaceholder && (
                <Badge variant="outline" className="bg-white/5 text-white/60 border-white/10">
                  Coming Soon
                </Badge>
              )}
            </div>

            <h3 className="text-xl font-medium text-white mb-3 group-hover:text-primary transition-colors">
              {caseStudy.title}
            </h3>

            <p className="text-sm text-white/60 mb-4 line-clamp-2">
              {caseStudy.challenge}
            </p>

            {!caseStudy.isPlaceholder && caseStudy.outcomes.length > 0 && (
              <div className="space-y-2 mb-4 pb-4 border-b border-white/5">
                {caseStudy.outcomes.slice(0, 2).map((outcome, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-primary font-semibold">{outcome.value}</span>
                    <span className="text-white/60">{outcome.metric}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white/40">
                <Clock className="w-4 h-4" />
                <span>{caseStudy.timeline}</span>
              </div>

              {!caseStudy.isPlaceholder && (
                <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
