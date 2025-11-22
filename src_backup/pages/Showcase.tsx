import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/seo/PageMeta';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ArticleSchema } from '@/components/seo/ArticleSchema';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeaturedCaseStudy } from '@/components/showcases/FeaturedCaseStudy';
import { CaseStudyCard } from '@/components/showcases/CaseStudyCard';
import { ResultsMetricsSection } from '@/components/showcases/ResultsMetricsSection';
import { TechnologyStackSection } from '@/components/showcases/TechnologyStackSection';
import { Button } from '@/components/ui/button';
import { initInViewAnimations } from '@/utils/scrollAnimations';
import { caseStudiesData } from '@/data/caseStudiesData';
import { ArrowRight, Award } from 'lucide-react';

const Showcase = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      initInViewAnimations();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const featuredCaseStudy = caseStudiesData.find(cs => cs.isFeatured) || caseStudiesData[0];
  const otherCaseStudies = caseStudiesData.filter(cs => cs.id !== featuredCaseStudy.id);

  return (
    <div className="min-h-screen flex flex-col bg-midnight-black text-white">
      <PageMeta
        title="Client Success Stories - Real AI Transformation Results"
        description="See how we've helped companies like CDW achieve 45% support reduction and 3.5× ROI with Voice AI and intelligent automation. Real results, real clients."
        keywords="AI case studies, Voice AI success stories, automation results, CDW case study, manufacturing AI, ROI proof, intelligent automation"
        canonical="https://elevatedai.co/showcase"
        ogType="article"
      />
      
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://elevatedai.co/' },
          { name: 'Case Studies', url: 'https://elevatedai.co/showcase' },
        ]}
      />

      {/* Article Schema for featured case study */}
      <ArticleSchema
        title={featuredCaseStudy.title}
        description={featuredCaseStudy.summary}
        author="Johnathan Scott"
        publishDate={new Date().toISOString()}
        imageUrl={featuredCaseStudy.thumbnail}
        url={`https://elevatedai.co/showcase#${featuredCaseStudy.slug}`}
      />

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
              <span className="text-white/60">Case Studies</span>
            </nav>

            <div className="max-w-3xl animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-white/5 ring-1 ring-white/10 mb-6">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm text-white/80">Real Client Success Stories</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-normal tracking-tighter text-white mb-6">
                Client Success Stories
              </h1>
              
              <p className="text-xl text-white/60 leading-relaxed">
                Real transformations delivered through intelligent automation, Voice AI systems, and strategic AI implementation. See how we help businesses achieve measurable results.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Case Study */}
        <FeaturedCaseStudy caseStudy={featuredCaseStudy} />

        {/* Other Case Studies Grid */}
        {otherCaseStudies.length > 0 && (
          <section className="py-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="mb-12 animate-on-scroll">
                <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
                  More Success Stories
                </h2>
                <p className="text-lg text-white/60">
                  Additional transformations across industries
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherCaseStudies.map((caseStudy, index) => (
                  <div
                    key={caseStudy.id}
                    className="animate-on-scroll"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CaseStudyCard caseStudy={caseStudy} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Results Dashboard */}
        <ResultsMetricsSection />

        {/* Technology Stack */}
        <TechnologyStackSection />

        {/* CTA Section */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-3xl blur-3xl"></div>
              
              <div className="relative backdrop-blur-sm bg-gradient-to-br from-primary/10 to-transparent rounded-3xl ring-1 ring-primary/20 p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="animate-on-scroll">
                    <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
                      Ready to See Results Like These?
                    </h2>
                    <p className="text-lg text-white/60 mb-6">
                      We'll assess your processes, design a custom solution, and deliver measurable outcomes—just like we did for CDW and NASO Industries.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>No long-term contracts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>Transparent pricing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>Proven methodology</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                    <Button size="lg" className="w-full" asChild>
                      <Link to="/contact?intent=consultation">
                        Request Free Consultation
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                    
                    <Button size="lg" variant="outline" className="w-full" asChild>
                      <Link to="/solutions">View Our Solutions</Link>
                    </Button>
                  </div>
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

export default Showcase;
