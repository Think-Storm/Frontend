import { Skeleton } from './skeleton';

const ProjectCardSkeleton = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <Skeleton className="w-[330px] h-[24px] rounded" />
        <Skeleton className="w-[24px] h-[24px] rounded" />
      </div>
      <Skeleton className="mt-2 w-3/4 h-6 rounded" />
      <Skeleton className="mt-2 w-full h-4 rounded" />
      <div className="flex gap-2 mt-2 flex-wrap">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-[60px] h-5 rounded-full" />
        ))}
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
