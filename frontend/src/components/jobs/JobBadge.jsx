// frontend/src/components/jobs/JobBadge.jsx
import { clsx } from 'clsx';

const TYPE_CONFIG = {
  'Remote':  { label: 'Remote',  dotClass: 'bg-brand-green',   textClass: 'text-brand-green',   bgClass: 'bg-tint-mint'     },
  'On-site': { label: 'On-site', dotClass: 'bg-brand-orange',  textClass: 'text-brand-orange',  bgClass: 'bg-tint-peach'    },
  'Hybrid':  { label: 'Hybrid',  dotClass: 'bg-brand-purple',  textClass: 'text-brand-purple',  bgClass: 'bg-tint-lavender' },
};

const JobBadge = ({ type, className = '' }) => {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG['Remote'];

  return (
    <span className={clsx(
      // DESIGN.MD: caption-bold, rounded-full for status badges
      'inline-flex items-center gap-1.5 text-[13px] font-semibold',
      'px-2.5 py-1 rounded-full',
      config.bgClass,
      config.textClass,
      className
    )}>
      <span className={clsx('w-1.5 h-1.5 rounded-full', config.dotClass, type === 'Remote' && 'animate-pulse')} />
      {config.label}
    </span>
  );
};

export default JobBadge;
