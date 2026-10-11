"use client";
import { useSession } from "@/lib/authClient";
import { SkeletonCards } from "@/components/skeletons";
import { useDashboardStats } from "@/hooks/use-admin-hooks";

export function AdminStats() {
  const { data: session } = useSession();
  const token = session?.session?.token as string;

  const { data: response, isLoading } = useDashboardStats(token);
  const stats = response?.data;

  if (isLoading || !stats) {
    return (
      <div className="flex flex-wrap w-full justify-around my-4 gap-2">
        <SkeletonCards count={8} width={"w-40"} height={"h-40"} />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5 justify-around items-center my-4">
      {Object.keys(stats).map((key) => (
        <div key={key} className="">
          <div className="card glass-morphism w-40">
            <div className="card-body flex flex-col justify-center items-center">
              <h2 className="card-title capitalize">{key}</h2>
              <p>{(stats as any)[key]}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
