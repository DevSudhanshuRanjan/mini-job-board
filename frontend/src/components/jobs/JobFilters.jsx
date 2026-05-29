// frontend/src/components/jobs/JobFilters.jsx
import { Search, X } from 'lucide-react';
import { clsx } from 'clsx';

const JOB_TYPES = ['All', 'Remote', 'On-site', 'Hybrid'];

const JobFilters = ({
  searchValue,
  onSearchChange,
  activeType,
  onTypeChange,
  resultCount,
  loading,
}) => {
  const hasActiveFilters = searchValue || (activeType && activeType !== 'All');

  const handleClear = () => {
    onSearchChange('');
    onTypeChange('All');
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
      {/* Search Bar — DESIGN.MD: search-pill style */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search jobs, companies, skills…"
          className={clsx(
            // DESIGN.MD: search-pill — surface bg, steel text, 8px rounded, 44px height
            'w-full h-[44px] pl-11 pr-12 bg-surface border border-hairline rounded-md',
            'text-base text-ink placeholder:text-steel',
            'transition-all duration-150',
            'focus:outline-none focus:border-primary focus:border-2',
            'hover:border-hairline-strong'
          )}
        />
        {searchValue && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone
                       hover:text-ink transition-colors"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Filter Pills + Results Count */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Type Filter Pills — DESIGN.MD: pill-tab / pill-tab-active */}
        <div className="flex items-center gap-2 flex-wrap">
          {JOB_TYPES.map((type) => {
            const isActive = activeType === type || (type === 'All' && !activeType);
            return (
              <button
                key={type}
                onClick={() => onTypeChange(type === 'All' ? '' : type)}
                className={clsx(
                  // DESIGN.MD: pill-tab — rounded-full, body-sm-medium
                  'h-8 px-4 rounded-full text-sm font-medium transition-all duration-150',
                  'border focus:outline-none focus:ring-2 focus:ring-primary/30',
                  isActive
                    ? 'bg-ink-deep text-on-dark border-ink-deep'
                    : 'bg-transparent border-hairline text-steel hover:border-hairline-strong hover:text-ink'
                )}
              >
                {type}
              </button>
            );
          })}

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={handleClear}
              className="h-8 px-3 rounded-full text-xs text-stone border border-dashed border-hairline
                         hover:text-error hover:border-error/40 transition-all duration-150 flex items-center gap-1"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        {/* Result Count */}
        <p className="text-sm text-steel font-mono">
          {loading
            ? 'Searching…'
            : `${resultCount ?? 0} job${resultCount !== 1 ? 's' : ''} found`
          }
        </p>
      </div>
    </div>
  );
};

export default JobFilters;
