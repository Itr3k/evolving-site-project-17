export const LogoTicker = () => {
  const logos = [
    { name: "Wix Studio", weight: "font-normal" },
    { name: "Eleven Labs", weight: "font-semibold" },
    { name: "Windsurf", weight: "font-medium" },
    { name: "OpenAI", weight: "font-normal" },
    { name: "Claude", weight: "font-medium" },
    { name: "Gemini", weight: "font-normal" },
    { name: "Lovable", weight: "font-semibold" },
  ];

  const logos2 = [
    { name: "Apple", weight: "font-normal" },
    { name: "N8N", weight: "font-semibold" },
    { name: "DataSync", weight: "font-medium" },
    { name: "VisionCorp", weight: "font-normal" },
    { name: "CloudBase", weight: "font-medium" },
    { name: "InnovateTech", weight: "font-normal" },
    { name: "FlowState", weight: "font-semibold" },
  ];

  return (
    <section className="z-10 fade-in fade-in-delay-4 sm:pb-12 sm:pt-12 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.5s_both] pt-8 pb-8 relative">
      <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pr-4 pl-4">
        <div className="text-center mb-12">
          <p className="uppercase text-xs font-medium text-indigo-500 tracking-wide">Tools used</p>
        </div>

        {/* Ticker Container */}
        <div className="overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
          {/* Animated Ticker */}
          <div className="ticker-track flex gap-16 pt-2 pb-2 gap-x-16 gap-y-16 items-center">
            {/* First set of logos */}
            <div className="flex gap-16 shrink-0 gap-x-16 gap-y-16 items-center">
              {logos.map((logo, idx) => (
                <div key={idx} className="flex items-center gap-3 transition-colors duration-300 text-indigo-400 hover:text-white">
                  <span className={`text-lg tracking-tighter ${logo.weight}`}>{logo.name}</span>
                </div>
              ))}
            </div>

            {/* Duplicate set */}
            <div className="flex gap-16 shrink-0 gap-x-16 gap-y-16 items-center">
              {logos2.map((logo, idx) => (
                <div key={idx} className="flex items-center gap-3 transition-colors duration-300 text-indigo-400 hover:text-white">
                  <span className={`text-lg tracking-tighter ${logo.weight}`}>{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
