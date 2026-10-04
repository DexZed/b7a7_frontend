import { cn } from "@/lib/utils";

export default function SkeletonBanner() {
  return <div className="h-96 w-full  animate-pulse glass rounded-lg"></div>;
}

export function SkeletonContent({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <div
      className={cn("mt-6 animate-pulse glass rounded-lg", height, width)}
    ></div>
  );
}

export function SkeletonCards({ count = 4 }: { count?: number }) {
  return (
    <>
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonContent key={i} width={"w-full"} height={"h-54"} />
        ))}
      </div>
    </>
  );
}
