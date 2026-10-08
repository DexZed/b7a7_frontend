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

export function SkeletonCards({
  count = 4,
  width,
  height,
}: {
  count?: number;
  width?: string;
  height?: string;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonContent key={i} width={width} height={height} />
      ))}
    </>
  );
}
