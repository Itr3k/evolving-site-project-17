export const TeamSection = () => {
  const team = [
    {
      name: "Michael Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Sarah Martinez",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "David Park",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "Emily Johnson",
      role: "VP of Engineering",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  ];

  return (
    <section className="relative z-10 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tighter mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            World-class engineers and researchers pushing the boundaries of AI innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group text-center [animation:fadeSlideIn_1s_ease-out_both]"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="relative inline-block mb-4">
                <div className="w-40 h-40 rounded-full overflow-hidden ring-2 ring-white/10 transition-all duration-500 group-hover:ring-4 group-hover:ring-purple-400/50 group-hover:shadow-lg group-hover:shadow-purple-400/30">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/0 to-pink-500/0 transition-all duration-500 group-hover:from-purple-500/10 group-hover:to-pink-500/10"></div>
              </div>
              <h3 className="text-xl font-medium text-white/90 mb-1">{member.name}</h3>
              <p className="text-sm text-white/60">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
