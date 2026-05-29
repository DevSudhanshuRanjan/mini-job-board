// frontend/src/components/jobs/JobList.jsx
import JobCard from './JobCard.jsx';
import { JobSkeletonGrid } from './JobSkeleton.jsx';
import { Briefcase } from 'lucide-react';

const EmptyState = ({ search, type }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center animate-fade-in opacity-0"
       style={{ animationFillMode: 'forwards' }}>
    <div className="w-16 h-16 rounded-lg bg-surface border border-hairline flex items-center justify-center mb-4">
      <Briefcase size={28} className="text-stone" />
    </div>
    <h3 className="font-semibold text-ink text-xl mb-2">No jobs found</h3>
    <p className="text-steel text-sm max-w-sm">
      {search
        ? `No results for "${search}". Try different keywords or clear filters.`
        : type
        ? `No ${type} jobs posted yet. Check back soon!`
        : 'No jobs posted yet. Be the first to post one!'
      }
    </p>
  </div>
);

const JobList = ({ jobs, loading, error, search, type }) => {
  if (loading) return <JobSkeletonGrid count={6} />;

  if (error) return (
    <div className="col-span-full text-center py-12 text-error">
      <p className="font-medium">Failed to load jobs.</p>
      <p className="text-sm text-steel mt-1">{error.message}</p>
    </div>
  );

  if (!jobs || jobs.length === 0) return (
    <div className="col-span-full">
      <EmptyState search={search} type={type} />
    </div>
  );

  return (
    <>
      {jobs.map((job, index) => (
        <JobCard key={job.id} job={job} index={index} />
      ))}
    </>
  );
};

export default JobList;
