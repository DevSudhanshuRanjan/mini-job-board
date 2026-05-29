// frontend/src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { useJobs } from '../hooks/useJobs.js';
import { useDebounce } from '../hooks/useDebounce.js';
import JobFilters from '../components/jobs/JobFilters.jsx';
import JobList from '../components/jobs/JobList.jsx';
import Button from '../components/ui/Button.jsx';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [search,     setSearch]     = useState('');
  const [activeType, setActiveType] = useState('');
  const [page,       setPage]       = useState(1);

  const debouncedSearch = useDebounce(search, 380);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [debouncedSearch, activeType]);

  const { data, isLoading, isError, error, isFetching } = useJobs({
    type:   activeType || undefined,
    search: debouncedSearch || undefined,
    page,
  });

  const jobs       = data?.data  ?? [];
  const meta       = data?.meta  ?? {};
  const totalCount = meta.total  ?? 0;

  return (
    <main className="max-w-[1280px] mx-auto px-4 sm:px-8 py-10 flex flex-col gap-8">

      {/* ── HERO SECTION — DESIGN.MD: hero-band-dark with brand-navy ── */}
      <section
        className="rounded-xl overflow-hidden bg-brand-navy text-on-dark px-6 sm:px-12 py-16 sm:py-20 text-center animate-fade-up opacity-0 relative"
        style={{ animationFillMode: 'forwards' }}
      >
        {/* Decorative dots */}
        <div className="absolute top-6 left-8 w-3 h-3 rounded-full bg-brand-pink opacity-60" />
        <div className="absolute top-10 right-12 w-2.5 h-2.5 rounded-full bg-brand-yellow opacity-60" />
        <div className="absolute bottom-8 left-1/4 w-2 h-2 rounded-full bg-brand-teal opacity-50" />
        <div className="absolute bottom-12 right-1/3 w-3 h-3 rounded-full bg-brand-green opacity-40" />
        <div className="absolute top-1/3 right-8 w-2 h-2 rounded-full bg-brand-orange opacity-50" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={13} className="text-brand-yellow" />
            <span className="text-xs font-medium text-on-dark-muted">
              {totalCount > 0 ? `${totalCount} open positions` : 'New jobs added daily'}
            </span>
          </div>
          <h1 className="font-semibold text-4xl sm:text-5xl lg:text-hero text-on-dark leading-[1.05] tracking-[-2px] mb-4">
            Find Your Next<br />
            <span className="text-brand-yellow">Great Role</span>
          </h1>
          <p className="text-on-dark-muted text-subtitle max-w-lg mx-auto leading-relaxed">
            Browse curated remote, hybrid, and on-site opportunities from top companies.
          </p>
        </div>
      </section>

      {/* ── FILTERS ──────────────────────────────────────────────── */}
      <JobFilters
        searchValue={search}
        onSearchChange={setSearch}
        activeType={activeType}
        onTypeChange={setActiveType}
        resultCount={totalCount}
        loading={isLoading || isFetching}
      />

      {/* ── JOB GRID ─────────────────────────────────────────────── */}
      <section
        className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-h-[400px] transition-opacity duration-200 ${isFetching ? 'opacity-70' : 'opacity-100'}`}
        aria-live="polite"
        aria-busy={isLoading}
      >
        <JobList
          jobs={jobs}
          loading={isLoading}
          error={isError ? error : null}
          search={debouncedSearch}
          type={activeType}
        />
      </section>

      {/* ── PAGINATION ───────────────────────────────────────────── */}
      {meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-4 animate-fade-in opacity-0"
             style={{ animationFillMode: 'forwards' }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((p) => p - 1)}
            disabled={!meta.hasPrevPage}
            leftIcon={<ChevronLeft size={14} />}
          >
            Previous
          </Button>

          <span className="text-sm text-steel font-mono">
            Page <strong className="text-ink">{meta.page}</strong> of <strong className="text-ink">{meta.totalPages}</strong>
          </span>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={!meta.hasNextPage}
            rightIcon={<ChevronRight size={14} />}
          >
            Next
          </Button>
        </div>
      )}

    </main>
  );
};

export default HomePage;
