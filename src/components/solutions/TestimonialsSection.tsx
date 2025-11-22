import { Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export const TestimonialsSection = () => {
  return (
    <section className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight font-geist mb-4">
            Trusted by Teams Worldwide
          </h2>
          <p className="text-lg text-muted-foreground font-geist max-w-2xl mx-auto">
            See how organizations are transforming with AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const delay = 0.3 + index * 0.1;
            return (
              <div
                key={testimonial.id}
                className="animate-on-scroll backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-6 hover:bg-white/[0.07] hover:ring-white/20 transition-all duration-500"
                style={{
                  animation: `fadeSlideIn 1s ease-out ${delay}s both`,
                  animationPlayState: 'paused'
                }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 text-sm mb-6 italic font-geist leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="w-10 h-10 rounded-full ring-2 ring-white/10"
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground font-geist">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-geist">
                      {testimonial.role} at {testimonial.company}
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
