import { FileText, Video, Code, BookOpen } from "lucide-react";

export const ResourcesSection = () => {
  const resources = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Comprehensive guides and API references",
      link: "#docs",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step implementation guides",
      link: "#videos",
    },
    {
      icon: Code,
      title: "Code Examples",
      description: "Ready-to-use integration templates",
      link: "#code",
    },
    {
      icon: BookOpen,
      title: "Case Studies",
      description: "Real-world success stories",
      link: "#cases",
    },
  ];

  return (
    <section id="resources" className="relative z-10 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tighter mb-6">
            Resources & Learning
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Everything you need to get started and scale your AI implementation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href={resource.link}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 backdrop-blur-sm bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 hover:ring-white/20"
                style={{ animation: `fadeSlideIn 1s ease-out ${0.1 + index * 0.1}s both` }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 ring-1 ring-white/20 mb-4">
                  <Icon className="w-5 h-5 text-white/90" />
                </div>
                
                <h3 className="text-lg font-medium text-white/90 mb-2">
                  {resource.title}
                </h3>
                
                <p className="text-sm text-white/60">
                  {resource.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
