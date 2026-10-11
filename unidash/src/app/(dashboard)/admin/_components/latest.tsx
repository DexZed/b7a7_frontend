"use client";
import PageHeading from "@/components/pageHeading";
import { SkeletonContent } from "@/components/skeletons";
import { useLatestData } from "@/hooks/use-admin-hooks";
import { useSession } from "@/lib/authClient";
import { getInitials } from "@/lib/utils";
import { BookBookmark, UserLock } from "lucide-react";

export function LatestStats() {
  const { data: session } = useSession();
  const token = session?.session?.token as string;

  const { data: response, isLoading } = useLatestData(token);
  const latestData = response?.data;

  if (isLoading) {
    return <SkeletonContent />;
  }

  const classes = latestData?.latestClasses;
  const teachers = latestData?.latestTeachers;

  return (
    <div className="space-y-4">
      <PageHeading title={"Latest Additions"} className="text-center" />
      <div className="flex flex-col lg:flex-row justify-evenly gap-10">
        <div className="w-full">
          <PageHeading title={"Teachers"} className="text-center mb-3" />
          <div className="flex flex-col gap-5">
            <ul className="list glass-morphism rounded-box shadow-md">
              <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                New Faculties
              </li>
              {teachers?.map((t, i) => (
                <li key={t.id} className="list-row">
                  <div className="text-4xl font-thin opacity-30 tabular-nums">
                    {i + 1}
                  </div>
                  <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-8 rounded-full">
                      <span className="text-sm">{getInitials(t.name)}</span>
                    </div>
                  </div>
                  <div className="list-col-grow">
                    <div className="capitalize">{t.name}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {t.email}
                    </div>
                  </div>
                  <button className="btn btn-square btn-ghost">
                    <UserLock />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full">
          <PageHeading title={"Classes"} className="text-center mb-3" />
          <div className="flex flex-col gap-5">
            <ul className="list glass-morphism rounded-box shadow-md">
              <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                New Classes
              </li>
              {classes?.map((c, i) => (
                <li key={c.id} className="list-row">
                  <div className="text-4xl font-thin opacity-30 tabular-nums">
                    {i + 1}
                  </div>
                  <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-8 rounded-full">
                      <span className="text-sm">{c.description}</span>
                    </div>
                  </div>
                  <div className="list-col-grow">
                    <div className="capitalize">{c.description}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {c.status}
                    </div>
                  </div>
                  <button className="btn btn-square btn-ghost">
                    <BookBookmark />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LatestStats;
