"use client";
import { SkeletonContent } from "@/components/skeletons";
import { getlatest } from "@/data access/adminData";
import { useSession } from "@/lib/authClient";
import { LatestData } from "@/lib/types";
import { getInitials } from "@/lib/utils";
import { BookBookmark, UserLock } from "lucide-react";
import { useState, useEffect } from "react";

function LatestStats() {
  const { data: session, isPending } = useSession();
  const [latestData, setLatestData] = useState<LatestData>();

  useEffect(() => {
    if (isPending || !session) return;

    const token = session.session.token;
    const fetchLatestData = async () => {
      const stats = await getlatest(token);
      setLatestData(stats.data);
    };
    fetchLatestData();
  }, [session, isPending]);
  if (isPending) {
    return <SkeletonContent />;
  }
  const classes = latestData?.latestClasses;
  const teachers = latestData?.latestTeachers;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold text-center">Latest Additions</h1>
      <div className="flex flex-col lg:flex-row justify-evenly gap-10">
        <div className="w-full">
          <h1 className="text-xl font-semibold text-center m-2">Teachers</h1>
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
          <h1 className="text-xl font-semibold text-center m-2">Classes</h1>
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
