// frontend/src/components/jobs/JobCard.jsx
import { Link } from 'react-router-dom';
import { MapPin, Building2, Clock, DollarSign, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import JobBadge from './JobBadge.jsx';
import Badge from '../ui/Badge.jsx';
import { formatRelativeTime, truncate } from '../../utils/formatters.js';

const JobCard = ({ job, index = 0 }) => {
  const { id, title, company, location, type, description, salary_range, tags, created_at } = job;

  return (
    <Link
      to={`/jobs/${id}`}
      className={clsx(
        // DESIGN.MD: card-base — canvas bg, 12px rounded, hairline border
        'group block bg-canvas border border-hairline rounded-lg p-6',
        'hover:shadow-card hover:border-hairline-strong',
        'transition-all duration-150 ease-out',
        'animate-fade-up opacity-0',
      )}
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-ink text-base leading-snug
                       group-hover:text-primary transition-colors duration-150 line-clamp-2">
          {title}
        </h3>
        <JobBadge type={type} className="flex-shrink-0 mt-0.5" />
      </div>

      {/* Company & Location */}
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center gap-1.5 text-charcoal text-sm">
          <Building2 size={13} className="text-stone flex-shrink-0" />
          <span className="font-medium truncate">{company}</span>
        </div>
        <div className="flex items-center gap-1.5 text-steel text-sm">
          <MapPin size={13} className="flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
      </div>

      {/* Description Preview */}
      <p className="text-steel text-sm leading-relaxed line-clamp-2 mb-4">
        {truncate(description, 130)}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="default" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 4 && (
            <Badge variant="default">+{tags.length - 4}</Badge>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-hairline">
        <div className="flex items-center gap-3">
          {salary_range && (
            <div className="flex items-center gap-1 text-xs text-brand-green font-mono">
              <DollarSign size={11} />
              <span>{salary_range}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-stone">
            <Clock size={11} />
            <span>{formatRelativeTime(created_at)}</span>
          </div>
        </div>
        <span className="text-xs text-primary opacity-0 group-hover:opacity-100
                         transition-opacity duration-150 flex items-center gap-1 font-medium">
          View <ExternalLink size={11} />
        </span>
      </div>
    </Link>
  );
};

export default JobCard;
