import { useState } from "react";
import { Link } from "react-router-dom";
import { GradientBlur } from "./GradientBlur";
import { ContactFormModal } from "./ContactFormModal";
import { ProjectIntakeModal } from "./ProjectIntakeModal";
import logoWhite from "@/assets/logo-white.png";

export const Header = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);

  return (
    <>
    <header className="z-10 border-white/5 border-b relative">
      <div className="flex md:px-8 max-w-7xl mr-auto ml-auto pt-5 pr-6 pb-5 pl-6 items-center justify-between">
        {/* Left: brand + primary nav */}
        <div className="flex md:gap-6 ring-1 [animation:fadeSlideIn_1s_ease-out_0.1s_both] rounded-full pt-1 pr-1 pb-1 pl-1 gap-x-4 gap-y-4 items-center ring-white/5">
          <Link to="/" className="flex items-center transition hover:opacity-80">
            <img src={logoWhite} alt="Elevated AI" className="h-14" />
          </Link>
          <nav className="hidden md:flex gap-2 gap-x-2 gap-y-2 items-center">
            <Link to="/solutions" className="inline-flex items-center gap-2 transition text-sm font-medium font-geist ring-1 rounded-full pt-2 pr-3.5 pb-2 pl-3.5 backdrop-blur-sm hover:bg-white/10 hover:ring-white/20 text-white/90 bg-white/5 ring-white/10">Solutions</Link>
            <Link to="/blog" className="inline-flex items-center gap-2 transition text-sm font-medium font-geist ring-1 rounded-full pt-2 pr-3.5 pb-2 pl-3.5 backdrop-blur-sm hover:bg-white/10 hover:ring-white/20 text-white/90 bg-white/5 ring-white/10">Blog</Link>
            <Link to="/showcase" className="inline-flex items-center gap-2 transition text-sm font-medium font-geist ring-1 rounded-full pt-2 pr-3.5 pb-2 pl-3.5 backdrop-blur-sm hover:bg-white/10 hover:ring-white/20 text-white/90 bg-white/5 ring-white/10">Case Studies</Link>
            <Link to="/resources" className="inline-flex items-center gap-2 transition text-sm font-medium font-geist ring-1 rounded-full pt-2 pr-3.5 pb-2 pl-3.5 backdrop-blur-sm hover:bg-white/10 hover:ring-white/20 text-white/90 bg-white/5 ring-white/10">Resources</Link>
          </nav>
        </div>

        {/* Right: auth */}
        <div className="flex ring-1 rounded-full pt-1 pr-1 pb-1 pl-1 gap-x-2 gap-y-2 items-center ring-white/5">
          <button 
            onClick={() => setIntakeModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 transition [animation:fadeSlideIn_1s_ease-out_0.2s_both] text-sm font-medium font-geist ring-1 rounded-full pt-2 pr-3.5 pb-2 pl-3.5 backdrop-blur-sm hover:bg-white/10 hover:ring-white/20 text-white/90 bg-white/5 ring-white/10"
          >
            Get Started
          </button>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 transition ring-1 [animation:fadeSlideIn_1s_ease-out_0.3s_both] text-sm font-medium font-geist rounded-full pt-2 pr-3.5 pb-2 pl-3.5 backdrop-blur-sm hover:bg-white/15 hover:ring-white/25 ring-white/15 text-white/90 bg-white/10"
          >
            Contact
          </Link>
        </div>
      </div>
      <GradientBlur />
      <ContactFormModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
      <ProjectIntakeModal isOpen={intakeModalOpen} onClose={() => setIntakeModalOpen(false)} />
    </header>
    </>
  );
};
