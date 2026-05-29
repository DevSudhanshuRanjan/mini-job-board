// frontend/src/components/layout/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../ui/Button.jsx';
import { PlusCircle, LogOut, Briefcase } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut();
      toast.success('Signed out successfully.');
      navigate('/');
    } catch (err) {
      toast.error('Failed to sign out.');
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* DESIGN.MD: Top nav — canvas bg, 64px height, hairline bottom border */}
      <div className="absolute inset-0 bg-canvas border-b border-hairline" />

      <nav className="relative max-w-[1280px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label="JobBoard Home"
        >
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center transition-all">
            <Briefcase size={16} className="text-on-primary" />
          </div>
          <span className="font-semibold text-ink text-lg tracking-tight">
            Job<span className="text-primary">Board</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Avatar + name */}
              <div className="hidden sm:flex items-center gap-2">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name || 'User'}
                    className="w-7 h-7 rounded-full border border-hairline object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-surface border border-hairline
                                  flex items-center justify-center text-xs text-steel font-mono">
                    {user?.email?.[0]?.toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-slate truncate max-w-[140px]">
                  {user?.user_metadata?.full_name || user?.email}
                </span>
              </div>

              <Button
                as={Link}
                to="/post-job"
                size="sm"
                variant="primary"
                leftIcon={<PlusCircle size={14} />}
              >
                Post Job
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleSignOut}
                loading={signingOut}
                leftIcon={<LogOut size={14} />}
                aria-label="Sign out"
              >
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/post-job"
                size="sm"
                variant="secondary"
                leftIcon={<PlusCircle size={14} />}
              >
                Post Job
              </Button>
              <Button
                as={Link}
                to="/login"
                size="sm"
                variant="primary"
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
