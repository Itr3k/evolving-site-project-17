import { Link } from "react-router-dom";
import { Twitter, Linkedin, Github } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center w-fit mb-4 transition hover:opacity-80">
              <img src={logoWhite} alt="Elevated AI" className="h-14" />
            </Link>
            <p className="text-sm text-white/60 mb-4">
              Transforming Business Through Intelligent Automation. N3RD Labs LLC, d/b/a Elevated AI.
            </p>
            <p className="text-sm text-white/60 mb-4">
              Contact: <a href="mailto:johnathan@elevatedai.co" className="text-accent-blue hover:text-accent-blue/80 transition">johnathan@elevatedai.co</a>
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full ring-1 flex items-center justify-center transition bg-white/5 ring-white/10 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/johnathan-scott/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full ring-1 flex items-center justify-center transition bg-white/5 ring-white/10 text-white/60 hover:bg-white/10 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full ring-1 flex items-center justify-center transition bg-white/5 ring-white/10 text-white/60 hover:bg-white/10 hover:text-white" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/solutions" className="text-sm text-white/60 hover:text-white transition">Solutions</Link></li>
              <li><Link to="/blog" className="text-sm text-white/60 hover:text-white transition">Blog</Link></li>
              <li><Link to="/showcase" className="text-sm text-white/60 hover:text-white transition">Case Studies</Link></li>
              <li><Link to="/resources" className="text-sm text-white/60 hover:text-white transition">Resources</Link></li>
              <li><Link to="/about" className="text-sm text-white/60 hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="text-sm text-white/60 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © 2025 N3RD Labs LLC d/b/a Elevated AI. All rights reserved.
          </p>
          <a 
            href="#top" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-sm text-white/60 hover:text-white transition"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
