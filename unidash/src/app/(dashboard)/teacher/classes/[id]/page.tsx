"use client";
import SkeletonBanner, { SkeletonCards } from "@/components/skeletons";
import { getClassById, getClassStudentsById } from "@/data access/teacherData";

import { useSession } from "@/lib/authClient";
import { ClassesFullSchema, User } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

function ClassDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const token = session?.session?.token;

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"class_details" | "users">(
    "class_details",
  );

  const [classData, setClassData] = useState<ClassesFullSchema>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!id) {
      router.replace("/teacher/classes");
      return;
    }

    if (!token) return;

    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [classDataResult, usersResult] = await Promise.all([
          getClassById(token, id),
          getClassStudentsById(token, id),
        ]);
        if (isMounted) {
          setClassData(classDataResult.data);
          setUsers(usersResult.data);
        }
      } catch (error) {
        console.error("Failed to Class or Users details:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id, token]);

  if (isLoading && classData === undefined && users.length === 0) {
    return (
      <>
        <SkeletonBanner />
        <div className="flex gap-5">
          <SkeletonCards width="w-full" height="h-96" count={3} />
        </div>
      </>
    );
  }

  return (
    <>
      <section className="flex min-h-screen flex-col gap-3 p-6">
        <h1 className="text-3xl font-semibold">
          Class Details: {classData?.name}
        </h1>

        <div>
          <div className="tabs tabs-lift">
            <input
              type="radio"
              name="class_details_tabs"
              className="tab"
              aria-label="Class Details"
              defaultChecked
              onChange={() => setActiveTab("class_details")}
            />
            <div className="tab-content glass-morphism border-base-300 p-6">
              <div className="glass-morphism overflow-x-auto">
                <div className="card card-xl w-full glass-morphism shadow-sm">
                  <div className="card-body">
                    <span className="badge badge-xs badge-warning">
                      {classData?.status}
                    </span>
                    <div className="flex justify-between">
                      <h2 className="text-3xl font-bold">{classData?.name}</h2>
                      <span className="text-xl">
                        Price: {classData?.currency} {classData?.price}
                      </span>
                    </div>
                    <div className="collapse collapse-arrow glass-morphism border border-base-300">
                      <input
                        type="radio"
                        name="my-accordion-2"
                        defaultChecked
                      />
                      <div className="collapse-title font-semibold">Name</div>
                      <div className="collapse-content text-sm">
                        {classData?.name}
                      </div>
                    </div>
                    <div className="collapse collapse-arrow glass-morphism border border-base-300">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-semibold">
                        Invite Code
                      </div>
                      <div className="collapse-content text-sm">
                        {classData?.inviteCode}
                      </div>
                    </div>
                    <div className="collapse collapse-arrow glass-morphism border border-base-300">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-semibold">
                        Capacity
                      </div>
                      <div className="collapse-content text-sm">
                        {classData?.capacity}
                      </div>
                    </div>
                    <div className="collapse collapse-arrow glass-morphism border border-base-300">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-semibold">
                        Schedules
                      </div>
                      <div className="collapse-content text-sm">
                        Day: {classData?.schedules?.[0].day},<br /> Time:{" "}
                        {classData?.schedules?.[0].startTime.slice(0, 5)} -{" "}
                        {classData?.schedules?.[0].endTime.slice(0, 5)},<br />{" "}
                        Online Meet Link :{" "}
                        {classData?.schedules?.[0].onlineMeetLink}
                      </div>
                    </div>
                    <div className="collapse collapse-arrow glass-morphism border border-base-300">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-semibold">
                        Created At
                      </div>
                      <div className="collapse-content text-sm">
                        {new Date(classData?.createdAt!).toDateString()}
                      </div>
                    </div>
                    <div className="collapse collapse-arrow glass-morphism border border-base-300">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-semibold">
                        Updated At
                      </div>
                      <div className="collapse-content text-sm">
                        {new Date(classData?.updatedAt!).toDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <input
              type="radio"
              name="class_details_tabs"
              className="tab"
              aria-label="Users"
              onChange={() => setActiveTab("users")}
            />
            <div className="tab-content glass-morphism border-base-300 p-6">
              <div className="glass-morphism overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined At</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          No Users found.
                        </td>
                      </tr>
                    ) : (
                      users.map((u, i) => (
                        <tr key={u.id}>
                          <th>{i + 1}</th>
                          <td>{u.name}</td>
                          <td className="capitalize">{u.email}</td>
                          <td className="capitalize">{u.role}</td>
                          <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td>
                            {u.updatedAt
                              ? new Date(u.updatedAt).toLocaleDateString()
                              : "Not Updated Yet"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClassDetailsPage;
