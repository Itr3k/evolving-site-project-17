import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export const ShowcaseSection = () => {
  return <section className="overflow-hidden lg:py-24 bg-[url(https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/6912ca31-cc71-4c00-96ca-bfcdc4d6f7e7_3840w.jpg)] bg-cover pt-16 pb-16 relative" id="showcase">
      {/* Decorative grid lines */}
      <div className="pointer-events-none z-0 absolute inset-0">
        <div className="absolute inset-y-0 left-[12.5%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
        <div className="absolute inset-y-0 left-[37.5%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent to-transparent via-white/8"></div>
        <div className="absolute inset-y-0 left-[62.5%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent to-transparent via-white/5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 gap-x-8 gap-y-8 items-center">
          {/* Large visual */}
          <div className="lg:col-span-7">
            
          </div>

          {/* Copy */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ring-1 font-geist animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.05s_both] w-fit bg-white/5 text-white/80 ring-white/10">
              Point of view
            </div>

            <h2 className="animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.15s_both] sm:text-5xl md:text-6xl md:font-normal md:tracking-tighter text-4xl font-medium tracking-tight font-geist mt-4">
              Outcomes, Engineered with Intention
            </h2>

            <p className="md:mt-5 md:text-lg leading-relaxed animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.25s_both] text-base font-geist mt-5 text-white/90 backdrop-blur-sm bg-neutral-900/30 p-4 rounded-lg">
              We design production AI that does more than impress in a demo. From high‑velocity prototypes to mission‑critical deployments, our systems blend research rigor with product craft to deliver measurable impact—safely, reliably, and at scale.
            </p>

            <Link to="/showcase" className="group inline-flex items-center gap-2 mt-6 text-sm font-medium font-geist underline underline-offset-4 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.35s_both] text-white decoration-white/30 hover:decoration-white/60">
              Discover our work
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>;
};