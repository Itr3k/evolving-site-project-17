interface Metric {
  value: string;
  label: string;
}

const metrics: Metric[] = [
  { value: '20+', label: 'Years Enterprise Experience' },
  { value: '70%', label: 'Avg. Cost Reduction' },
  { value: 'Fortune 500', label: 'Client Caliber' },
  { value: '24/7', label: 'AI Operations' },
];

export const TrustBar = () => {
  return (
    <section className="relative z-10 py-12 border-y border-white/5 backdrop-blur-sm bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((metric, index) => (
            <div key={index} className="animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.1s_both]">
              <div className="text-3xl md:text-4xl font-semibold text-foreground mb-2 font-geist">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground font-geist">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
