// frontend/src/components/jobs/JobSkeleton.jsx

const SkeletonBlock = ({ className }) => (
  <div className={`shimmer rounded-md ${className}`} />
);

const JobSkeleton = () => (
  <div className="bg-canvas border border-hairline rounded-lg p-6 flex flex-col gap-4">
    <div className="flex items-start justify-between gap-3">
      <SkeletonBlock className="h-5 w-3/5" />
      <SkeletonBlock className="h-6 w-16 rounded-full" />
    </div>
    <SkeletonBlock className="h-4 w-2/5" />
    <SkeletonBlock className="h-4 w-1/3" />
    <div className="flex gap-2 mt-2">
      <SkeletonBlock className="h-6 w-16 rounded-sm" />
      <SkeletonBlock className="h-6 w-20 rounded-sm" />
      <SkeletonBlock className="h-6 w-14 rounded-sm" />
    </div>
    <div className="flex items-center justify-between mt-2 pt-4 border-t border-hairline">
      <SkeletonBlock className="h-4 w-24" />
      <SkeletonBlock className="h-8 w-28 rounded-md" />
    </div>
  </div>
);

export const JobSkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {Array.from({ length: count }, (_, i) => (
      <JobSkeleton key={i} />
    ))}
  </div>
);

export default JobSkeleton;
