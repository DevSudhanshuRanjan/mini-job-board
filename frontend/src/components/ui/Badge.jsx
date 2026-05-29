// frontend/src/components/ui/Badge.jsx
import { clsx } from 'clsx';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default:  'bg-surface border border-hairline text-slate',
    purple:   'bg-primary text-on-primary',
    pink:     'bg-brand-pink text-on-primary',
    orange:   'bg-brand-orange text-on-primary',
    'tag-purple': 'bg-tint-lavender text-brand-purple-800',
    'tag-orange': 'bg-tint-peach text-brand-orange-deep',
    'tag-green':  'bg-tint-mint text-brand-green',
    success:  'bg-tint-mint border border-brand-green/20 text-brand-green',
    error:    'bg-red-50 border border-error/20 text-error',
  };

  return (
    <span className={clsx(
      // DESIGN.MD: caption-bold, rounded-sm for tags, rounded-full for status
      'inline-flex items-center gap-1 text-[13px] font-semibold px-2 py-0.5 rounded-sm',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
