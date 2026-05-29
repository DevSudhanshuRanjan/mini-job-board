// frontend/src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-hairline mt-auto">
    {/* DESIGN.MD: footer-region — canvas bg, hairline top border */}
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-steel text-sm">
        <Briefcase size={14} className="text-primary" />
        <span className="font-semibold text-charcoal">JobBoard</span>
        <span className="text-muted">·</span>
        <span>FolioCustoms Assessment 2026</span>
      </div>
      <div className="flex items-center gap-4 text-sm text-steel">
        <Link to="/" className="hover:text-ink transition-colors">Home</Link>
        <Link to="/post-job" className="hover:text-ink transition-colors">Post a Job</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
