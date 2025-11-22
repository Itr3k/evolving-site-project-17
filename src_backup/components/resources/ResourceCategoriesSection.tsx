import { useState } from 'react';
import { Zap, ClipboardCheck, Mic, Layers, TrendingUp, GraduationCap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResourceCard } from './ResourceCard';
import { resources, resourceCategories } from '@/data/resourcesData';

const categoryIcons: Record<string, any> = {
  Zap,
  ClipboardCheck,
  Mic,
  Layers,
  TrendingUp,
  GraduationCap,
};

export const ResourceCategoriesSection = () => {
  const [activeCategory, setActiveCategory] = useState('automation');

  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
            Resource Library
          </h2>
          <p className="text-lg text-white/60 max-w-3xl">
            Browse our comprehensive collection of guides, templates, and frameworks organized by topic
          </p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="animate-on-scroll">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-transparent h-auto p-0 mb-12">
            {resourceCategories.map((category) => {
              const Icon = categoryIcons[category.icon];
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl backdrop-blur-sm bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 data-[state=active]:bg-primary/10 data-[state=active]:ring-primary/20 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs text-center leading-tight">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {resourceCategories.map((category) => {
            const categoryResources = resources.filter(r => r.category === category.id);
            
            return (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="mb-8">
                  <p className="text-white/60">{category.description}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>

                {categoryResources.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-white/40">No resources available in this category yet.</p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};
