import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Phone, Mail } from 'lucide-react';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { GridOverlay } from '@/components/GridOverlay';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageMeta } from '@/components/seo/PageMeta';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const firstName = searchParams.get('name') || 'there';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <PageMeta 
        title="Thank You for Contacting Us"
        description="We've received your message and will respond within 24 hours."
        canonical="https://elevatedai.co/contact/thank-you"
      />
      
      <ParticlesBackground />
      <div className="pointer-events-none absolute inset-0 z-0">
        <GridOverlay />
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-emerald-500/10 p-6 ring-1 ring-emerald-500/20">
                <CheckCircle2 className="w-16 h-16 text-emerald-400" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-normal tracking-tight font-geist mb-4">
              Thank You, {firstName}!
            </h1>
            
            <p className="text-xl text-muted-foreground font-geist mb-8">
              We've received your message and it's on its way to our team.
            </p>

            <div className="backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-8 mb-12">
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-cyan-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium font-geist mb-1">Message Sent To</p>
                    <p className="text-sm text-muted-foreground font-geist">korra@elevatedai.co</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium font-geist mb-1">Expected Response Time</p>
                    <p className="text-sm text-muted-foreground font-geist">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-normal tracking-tight font-geist mb-6">
                While You Wait
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  to="/solutions"
                  className="group backdrop-blur-sm bg-white/5 rounded-xl ring-1 ring-white/10 p-6 hover:bg-white/8 hover:ring-white/15 transition-all"
                >
                  <h3 className="font-medium font-geist mb-2 group-hover:text-cyan-300 transition-colors">
                    Explore Solutions
                  </h3>
                  <p className="text-sm text-muted-foreground font-geist mb-3">
                    See how AI can transform your business
                  </p>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>

                <Link
                  to="/blog"
                  className="group backdrop-blur-sm bg-white/5 rounded-xl ring-1 ring-white/10 p-6 hover:bg-white/8 hover:ring-white/15 transition-all"
                >
                  <h3 className="font-medium font-geist mb-2 group-hover:text-cyan-300 transition-colors">
                    Read Insights
                  </h3>
                  <p className="text-sm text-muted-foreground font-geist mb-3">
                    Learn about AI automation strategies
                  </p>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>

                <Link
                  to="/about"
                  className="group backdrop-blur-sm bg-white/5 rounded-xl ring-1 ring-white/10 p-6 hover:bg-white/8 hover:ring-white/15 transition-all"
                >
                  <h3 className="font-medium font-geist mb-2 group-hover:text-cyan-300 transition-colors">
                    About Us
                  </h3>
                  <p className="text-sm text-muted-foreground font-geist mb-3">
                    Meet the team behind Elevated AI
                  </p>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/5 rounded-xl ring-1 ring-white/10 p-6">
              <p className="text-sm font-geist mb-3 text-muted-foreground">
                Need immediate assistance?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href="tel:+13235551234"
                  className="inline-flex items-center gap-2 text-sm font-geist hover:text-cyan-300 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (323) 555-1234
                </a>
                <span className="hidden sm:inline text-white/20">•</span>
                <a
                  href="mailto:korra@elevatedai.co"
                  className="inline-flex items-center gap-2 text-sm font-geist hover:text-cyan-300 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  korra@elevatedai.co
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ThankYou;
