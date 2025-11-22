import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/seo/PageMeta';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeaturedResourcesSection } from '@/components/resources/FeaturedResourcesSection';
import { ResourceCategoriesSection } from '@/components/resources/ResourceCategoriesSection';
import { DownloadablesSection } from '@/components/resources/DownloadablesSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { initInViewAnimations } from '@/utils/scrollAnimations';
import { resourceFAQs } from '@/data/resourcesData';
import { ArrowRight, BookOpen } from 'lucide-react';

const Resources = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      initInViewAnimations();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-midnight-black text-white">
      <PageMeta
        title="AI Resources & Implementation Guides"
        description="Access expert AI automation guides, Voice AI resources, audit frameworks, and implementation templates. Free tools and insights for enterprise AI adoption."
        keywords="AI resources, automation guides, Voice AI tutorials, AI audit template, enterprise AI implementation, workflow automation, AI frameworks"
        canonical="https://elevatedai.co/resources"
      />
      
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://elevatedai.co/' },
          { name: 'Resources', url: 'https://elevatedai.co/resources' },
        ]}
      />
      
      <FAQSchema faqs={resourceFAQs} />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8 animate-on-scroll">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/60">Resources</span>
            </nav>

            <div className="max-w-3xl animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-white/5 ring-1 ring-white/10 mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm text-white/80">Free Resources & Guides</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-normal tracking-tighter text-white mb-6">
                AI Resources, Guides & Tools
              </h1>
              
              <p className="text-xl text-white/60 leading-relaxed mb-8">
                Expert insights, frameworks, and tools to help your business implement AI, automate workflows, and scale efficiently.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="#featured">
                    Explore Resources
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Request Custom Guidance</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <div id="featured">
          <FeaturedResourcesSection />
        </div>

        {/* Resource Categories */}
        <ResourceCategoriesSection />

        {/* Downloadables */}
        <DownloadablesSection />

        {/* FAQ Section */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="mb-12 text-center animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-white/60">
                Common questions about our resources and how to use them
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4 animate-on-scroll">
              {resourceFAQs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="backdrop-blur-sm bg-white/5 rounded-xl ring-1 ring-white/10 px-6"
                >
                  <AccordionTrigger className="text-left text-white hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-3xl blur-3xl"></div>
              
              <div className="relative backdrop-blur-sm bg-gradient-to-br from-primary/10 to-transparent rounded-3xl ring-1 ring-primary/20 p-12 animate-on-scroll">
                <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
                  Need Personalized Guidance?
                </h2>
                <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                  Our team can help you apply these frameworks and tools to your specific business needs. Schedule a consultation to discuss your AI transformation goals.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/contact">Schedule Consultation</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/solutions">Explore Solutions</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
