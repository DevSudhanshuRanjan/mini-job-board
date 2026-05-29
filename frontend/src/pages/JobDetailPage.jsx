// frontend/src/pages/JobDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import { useJob } from '../hooks/useJobs.js';
import { formatFullDate, formatRelativeTime } from '../utils/formatters.js';
import JobBadge from '../components/jobs/JobBadge.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { ArrowLeft, MapPin, Building2, Clock, DollarSign, ExternalLink, Calendar } from 'lucide-react';

const JobDetailPage = () => {
  const { id } = useParams();
  const { data: job, isLoading, isError, error } = useJob(id);

  if (isLoading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size="lg" className="text-primary" />
    </div>
  );

  if (isError) return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h2 className="font-semibold text-h3 text-ink mb-2">Job Not Found</h2>
      <p className="text-steel mb-6">{error?.message || 'This job may have been removed.'}</p>
      <Button as={Link} to="/" variant="secondary" leftIcon={<ArrowLeft size={15} />}>
        Back to Jobs
      </Button>
    </div>
  );

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-up opacity-0"
          style={{ animationFillMode: 'forwards' }}>
      {/* Back */}
      <Link to="/"
            className="inline-flex items-center gap-1.5 text-sm text-steel hover:text-ink
                       transition-colors mb-8 group">
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        All jobs
      </Link>

      {/* Header Card — DESIGN.MD: card-feature */}
      <div className="bg-canvas border border-hairline rounded-lg p-7 mb-6 shadow-card">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="font-semibold text-h2 text-ink leading-snug">
            {job.title}
          </h1>
          <JobBadge type={job.type} className="flex-shrink-0 mt-1" />
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate mb-6">
          <span className="flex items-center gap-1.5">
            <Building2 size={14} className="text-stone" />
            <strong>{job.company}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-stone" />
            {job.location}
          </span>
          {job.salary_range && (
            <span className="flex items-center gap-1.5 text-brand-green font-mono text-xs">
              <DollarSign size={13} />
              {job.salary_range}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-stone text-xs">
            <Clock size={13} />
            Posted {formatRelativeTime(job.created_at)}
          </span>
          <span className="flex items-center gap-1.5 text-stone text-xs">
            <Calendar size={13} />
            {formatFullDate(job.created_at)}
          </span>
        </div>

        {/* Tags */}
        {job.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {job.tags.map((tag) => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>
        )}

        {/* Apply CTA — DESIGN.MD: button-primary purple */}
        {job.apply_url ? (
          <a href={job.apply_url} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="primary" rightIcon={<ExternalLink size={15} />} className="w-full sm:w-auto">
              Apply for this role
            </Button>
          </a>
        ) : (
          <Button size="lg" variant="secondary" disabled className="w-full sm:w-auto">
            No apply link provided
          </Button>
        )}
      </div>

      {/* Description Card */}
      <div className="bg-canvas border border-hairline rounded-lg p-7 shadow-card">
        <h2 className="font-semibold text-h5 text-ink mb-4">About This Role</h2>
        <div className="text-sm text-slate leading-[1.55] whitespace-pre-wrap break-words max-w-none">
          {job.description}
        </div>
      </div>

      {/* Posted by */}
      {job.profiles && (
        <div className="mt-4 px-4 py-3 bg-surface rounded-lg border border-hairline text-xs text-steel flex items-center gap-2">
          {job.profiles.avatar_url && (
            <img src={job.profiles.avatar_url} alt="" className="w-5 h-5 rounded-full object-cover" />
          )}
          Posted by <strong className="text-charcoal">{job.profiles.full_name || job.profiles.email}</strong>
        </div>
      )}

    </main>
  );
};

export default JobDetailPage;
