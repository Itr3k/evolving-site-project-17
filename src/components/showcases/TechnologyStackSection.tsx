import { technologyStack } from '@/data/caseStudiesData';
import { Badge } from '@/components/ui/badge';

export const TechnologyStackSection = () => {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
            Technologies Powering Our Solutions
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            We leverage best-in-class platforms and custom integrations to deliver enterprise-grade AI solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologyStack.map((tech, index) => (
            <div
              key={tech.id}
              className="group animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 overflow-hidden hover:bg-white/10 hover:ring-white/20 transition-all duration-300">
                  {/* Logo/Image */}
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-white mb-1 group-hover:text-primary transition-colors">
                      {tech.name}
                    </h3>
                    
                    <p className="text-sm text-primary/80 font-medium mb-3">
                      {tech.category}
                    </p>
                    
                    <p className="text-sm text-white/60 mb-4 leading-relaxed">
                      {tech.description}
                    </p>

                    {tech.useCases.length > 0 && (
                      <div>
                        <p className="text-xs text-white/40 mb-2">Key Use Cases:</p>
                        <div className="flex flex-wrap gap-2">
                          {tech.useCases.map((useCase, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="bg-white/5 text-white/70 border-white/10 text-xs"
                            >
                              {useCase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
