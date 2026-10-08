"use client";
import { SkeletonContent } from "@/components/skeletons";
import { getlatest } from "@/data access/adminData";
import { useSession } from "@/lib/authClient";
import { LatestData } from "@/lib/types";
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
      <h1 className="text-xl font-semibold text-center">Latest Additions</h1>
      <div className="flex flex-col lg:flex-row justify-evenly gap-10">
        <div className="">
          <h1 className="text-xl font-semibold text-center m-2">Teachers</h1>
          <div className="flex flex-col gap-5">
            {teachers?.map((teacher) => (
              <div
                key={teacher.id}
                className="card w-150 h-60 card-xl shadow-sm glass-morphism"
              >
                <div className="card-body flex flex-col justify-center items-center">
                  <span className="badge badge-xs badge-warning badge-outline capitalize">
                    {teacher.role}
                  </span>
                  <div className="flex justify-between">
                    <h2 className="text-3xl font-bold capitalize">
                      {teacher.name}
                    </h2>
                  </div>
                  <ul className="mt-6 flex flex-col justify-center items-center gap-2 text-xs">
                    <li>
                      <span className="capitalize">
                        Email : {teacher.email}
                      </span>
                    </li>
                    <li>
                      <span className="capitalize">
                        Joined At :{" "}
                        {new Date(teacher.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-center m-2">Classes</h1>
          <div className="flex flex-col gap-5">
            {classes?.map((cls) => (
              <div
                key={cls.id}
                className="card w-150 h-60 card-xl shadow-sm glass-morphism"
              >
                <div className="card-body flex flex-col justify-center items-center">
                  <span className="badge badge-xs badge-warning badge-outline capitalize">
                    {cls.status}
                  </span>
                  <div className="flex justify-between">
                    <h2 className="text-3xl font-bold capitalize">
                      {cls.description}
                    </h2>
                  </div>
                  <ul className="mt-6 flex flex-col justify-center items-center gap-2 text-xs">
                    <li>
                      <span className="capitalize">Status : {cls.status}</span>
                    </li>
                    <li>
                      <span className="capitalize">
                        Created At :{" "}
                        {new Date(cls.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestStats;
