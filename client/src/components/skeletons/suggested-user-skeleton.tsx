import { Skeleton } from "../ui/skeleton";

export default function SuggestedUserSkeleton() {
  return (
    <div className="flex gap-4 items-center p-1 rounded-md">
      <div>
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex w-full flex-col items-start gap-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div>
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}
