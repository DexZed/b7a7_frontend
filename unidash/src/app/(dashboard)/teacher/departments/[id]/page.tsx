"use client";
import SkeletonBanner, { SkeletonCards } from "@/components/skeletons";
import {
  getDepartmentClassesById,
  getDepartmentSubjectsById,
  getDepartmentUsersById,
} from "@/data access/teacherData";
import { useSession } from "@/lib/authClient";
import { ClassesFullSchema, Subject, User } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

function DepartmentDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const token = session?.session?.token;

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"classes" | "subjects" | "users">(
    "subjects",
  );

  const [classes, serClasses] = useState<ClassesFullSchema[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!id) {
      router.replace("/admin/users");
      return;
    }

    if (!token) return;

    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [classesResult, subjectsResult, usersResult] = await Promise.all([
          getDepartmentClassesById(token, id),
          getDepartmentSubjectsById(token, id),
          getDepartmentUsersById(token, id),
        ]);
        if (isMounted) {
          serClasses(classesResult.data);
          setSubjects(subjectsResult.data);
          setUsers(usersResult.data);
        }
      } catch (error) {
        console.error("Failed to fetch Department details:", error);
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
    classes.length === 0 &&
    subjects.length === 0 &&
    users.length === 0
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
    <section className="flex min-h-screen flex-col gap-3 p-6">
      <h1 className="text-3xl font-semibold">
        Department {id?.slice(0, 4)}... Details
      </h1>

      <div>
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="department_details_tabs"
            className="tab"
            aria-label="Subjects"
            defaultChecked
            onChange={() => setActiveTab("subjects")}
          />
          <div className="tab-content glass-morphism border-base-300 p-6">
            <div className="glass-morphism overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Description</th>

                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        No Subjects found.
                      </td>
                    </tr>
                  ) : (
                    subjects.map((s, i) => (
                      <tr key={s.id}>
                        <th>{i + 1}</th>
                        <th>{s.name}</th>
                        <th>{s.code}</th>
                        <th>
                          {s.description.length > 50
                            ? s.description.slice(0, 50) + "..."
                            : s.description}
                        </th>

                        <th>{new Date(s.createdAt).toLocaleDateString()}</th>
                        <th>
                          {s.updatedAt
                            ? new Date(s.updatedAt).toLocaleDateString()
                            : "Not Updated Yet"}
                        </th>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <input
            type="radio"
            name="department_details_tabs"
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
                    <th>Class Name</th>
                    <th>Invite Code</th>
                    <th>Subject Name</th>
                    <th>Teacher Name</th>
                    <th>Description</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        No classes found.
                      </td>
                    </tr>
                  ) : (
                    classes.map((c, i) => (
                      <tr key={c.id}>
                        <th>{i + 1}</th>
                        <td>{c.name}</td>
                        <td>{c.inviteCode}</td>
                        <td>{c.subject.name}</td>
                        <td>{c.teacher.name}</td>
                        <td>{c.description}</td>
                        <td>{c.capacity}</td>
                        <td>{c.status}</td>
                        <td>{c.price}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <input
            type="radio"
            name="department_details_tabs"
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
                        <td>{u.email}</td>
                        <td>{u.role}</td>
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
  );
}

export default DepartmentDetails;
