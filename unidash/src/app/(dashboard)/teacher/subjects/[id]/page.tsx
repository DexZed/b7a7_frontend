"use client";
import SkeletonBanner, { SkeletonCards } from "@/components/skeletons";
import {
  getClassesBySubjectId,
  getsubjectById,
  getTeachersBySubjectId,
} from "@/data access/teacherData";

import { useSession } from "@/lib/authClient";
import { Class, SubjectResponse, User } from "@/lib/types";

import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

function SubjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const token = session?.session?.token;

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "subject_details" | "classes" | "users"
  >("subject_details");

  const [subjectData, setSubjectData] = useState<SubjectResponse>();
  const [classes, setClasses] = useState<Class[]>([]);
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
        const [subjectDataResult, classesData, usersData] = await Promise.all([
          getsubjectById(token, id),
          getClassesBySubjectId(token, id),
          getTeachersBySubjectId(token, id),
        ]);
        if (isMounted) {
          setSubjectData(subjectDataResult.data);
          setClasses(classesData.data);
          setUsers(usersData.data);
        }
      } catch (error) {
        console.error("Failed to Fetch Data:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id, token]);

  if (
    isLoading &&
    subjectData === undefined &&
    users.length === 0 &&
    classes.length === 0
  ) {
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
          Subject Details:{" "}
          {subjectData?.subject.name.slice(0, 1).toLocaleUpperCase() +
            subjectData?.subject.name.slice(1)!}
        </h1>

        <div>
          <div className="tabs tabs-lift">
            <input
              type="radio"
              name="subject_details_tabs"
              className="tab"
              aria-label="Subject Details"
              defaultChecked
              onChange={() => setActiveTab("subject_details")}
            />
            <div className="tab-content glass-morphism border-base-300 p-6">
              <div className="glass-morphism overflow-x-auto">
                <div className="card card-xl w-full glass-morphism shadow-sm">
                  <div className="card-body">
                    <span className="badge badge-xs badge-warning">
                      {subjectData?.subject.id}
                    </span>
                    <div className="flex justify-between">
                      <h2 className="text-3xl font-bold capitalize">
                        {subjectData?.subject.name}
                      </h2>
                      <span className="text-xl capitalize">
                        Code: {subjectData?.subject.code}
                      </span>
                    </div>
                    <div className="collapse collapse-arrow glass-morphism border border-base-300">
                      <input
                        type="radio"
                        name="my-accordion-2"
                        defaultChecked
                      />
                      <div className="collapse-title font-semibold">Name</div>
                      <div className="collapse-content text-sm capitalize">
                        {subjectData?.subject.name}
                      </div>
                    </div>

                    <div className="collapse collapse-arrow glass-morphism border border-base-300">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-semibold">
                        Description
                      </div>
                      <div className="collapse-content text-sm">
                        {subjectData?.subject.description}
                      </div>
                    </div>
                    <div className="collapse collapse-arrow glass-morphism border border-base-300">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-semibold">
                        Created At
                      </div>
                      <div className="collapse-content text-sm">
                        {new Date(
                          subjectData?.subject.createdAt!,
                        ).toDateString()}
                      </div>
                    </div>
                    <div className="collapse collapse-arrow glass-morphism border border-base-300">
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-semibold">
                        Updated At
                      </div>
                      <div className="collapse-content text-sm">
                        {new Date(
                          subjectData?.subject.updatedAt!,
                        ).toDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <input
              type="radio"
              name="subject_details_tabs"
              className="tab"
              aria-label="Classes"
              onChange={() => setActiveTab("classes")}
            />
            <div className="tab-content glass-morphism border-base-300 p-6">
              <div className="glass-morphism overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          No Classes found.
                        </td>
                      </tr>
                    ) : (
                      classes.map((c, i) => (
                        <tr key={c.id}>
                          <th>{i + 1}</th>
                          <td>{c.name}</td>
                          <td className="capitalize">{c.description}</td>
                          <td className="capitalize">{c.status}</td>
                          <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <input
              type="radio"
              name="subject_details_tabs"
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

export default SubjectDetailPage;
