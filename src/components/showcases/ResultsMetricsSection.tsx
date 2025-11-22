import { Users, Clock, TrendingUp, Award, Building2, Smile } from 'lucide-react';
import { aggregateMetrics } from '@/data/caseStudiesData';

const metricIcons: Record<string, any> = {
  clientsServed: Users,
  hoursSavedMonthly: Clock,
  averageROI: TrendingUp,
  successfulImplementations: Award,
  industries: Building2,
  clientSatisfaction: Smile,
};

export const ResultsMetricsSection = () => {
  const metrics = [
    {
      key: 'clientsServed',
      label: 'Clients Served',
      value: aggregateMetrics.clientsServed.toString(),
      suffix: '+',
      description: 'Businesses transformed',
    },
    {
      key: 'hoursSavedMonthly',
      label: 'Hours Saved Monthly',
      value: aggregateMetrics.hoursSavedMonthly.toLocaleString(),
      suffix: '+',
      description: 'Across all implementations',
    },
    {
      key: 'averageROI',
      label: 'Average ROI',
      value: aggregateMetrics.averageROI,
      suffix: '',
      description: 'Return on investment',
    },
    {
      key: 'successfulImplementations',
      label: 'Successful Projects',
      value: aggregateMetrics.successfulImplementations.toString(),
      suffix: '+',
      description: 'Completed implementations',
    },
    {
      key: 'industries',
      label: 'Industries',
      value: aggregateMetrics.industries.length.toString(),
      suffix: '+',
      description: 'Sectors served',
    },
    {
      key: 'clientSatisfaction',
      label: 'Client Satisfaction',
      value: aggregateMetrics.clientSatisfaction.toString(),
      suffix: '%',
      description: 'Average satisfaction score',
    },
  ];

  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
            Real Results, Measurable Impact
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Aggregate metrics across all implementations demonstrating our commitment to delivering tangible business outcomes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metricIcons[metric.key];
            return (
              <div
                key={metric.key}
                className="group animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-8 hover:bg-white/10 hover:ring-white/20 transition-all duration-300">
                    <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-primary/20 w-fit mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <div className="text-4xl font-bold text-white mb-2">
                      {metric.value}{metric.suffix}
                    </div>
                    
                    <div className="text-sm font-medium text-white/80 mb-1">
                      {metric.label}
                    </div>
                    
                    <div className="text-xs text-white/60">
                      {metric.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
