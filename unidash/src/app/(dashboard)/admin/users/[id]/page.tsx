"use client";
import SkeletonBanner, {
  SkeletonCards,
  SkeletonContent,
} from "@/components/skeletons";
import {
  getUserDepartmentsById,
  getUserSubjectsById,
} from "@/data access/adminData";
import { useSession } from "@/lib/authClient";
import { Department, Subject } from "@/lib/types";
import { BookCopy, ListSortDescending, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const token = session?.session?.token;

  // Separate query and pagination states for Departments and Subjects
  const [deptQuery, setDeptQuery] = useState({ page: 1, limit: 10 });
  const [deptPagination, setDeptPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [depts, setDepts] = useState<Department[]>([]);

  const [subjectQuery, setSubjectQuery] = useState({ page: 1, limit: 10 });
  const [subjectPagination, setSubjectPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"departments" | "subjects">(
    "departments",
  );

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
        const [deptResult, subjectResult] = await Promise.all([
          getUserDepartmentsById(token, id, deptQuery),
          getUserSubjectsById(token, id, subjectQuery),
        ]);

        if (isMounted) {
          setDepts(deptResult.data);
          setDeptPagination(deptResult.pagination);

          setSubjects(subjectResult.data);
          setSubjectPagination(subjectResult.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id, token, deptQuery, subjectQuery]);

  const handleDeptPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > deptPagination.totalPages) return;
    setDeptQuery((prev) => ({ ...prev, page: newPage }));
  };

  const handleSubjectPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > subjectPagination.totalPages) return;
    setSubjectQuery((prev) => ({ ...prev, page: newPage }));
  };

  if (isLoading && depts.length === 0 && subjects.length === 0) {
    return (
      <>
        <SkeletonBanner />
        <div className="flex gap-5">
          <SkeletonCards width="w-full" height="h-96" count={2} />
        </div>
      </>
    );
  }

  return (
    <section className="flex min-h-screen flex-col gap-3 p-6">
      <h1 className="text-3xl font-semibold">
        User {id?.slice(0, 4)}... Details
      </h1>

      <div>
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="user_details_tabs"
            className="tab"
            aria-label="Departments"
            defaultChecked
            onChange={() => setActiveTab("departments")}
          />
          <div className="tab-content glass-morphism border-base-300 p-6">
            <div className="glass-morphism overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {depts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        No departments found.
                      </td>
                    </tr>
                  ) : (
                    depts.map((d, i) => (
                      <tr key={d.id}>
                        <th>
                          {(deptPagination.page - 1) * deptPagination.limit +
                            i +
                            1}
                        </th>
                        <td>{d.name}</td>
                        <td>{d.code}</td>
                        <td>{d.description}</td>
                        <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                        <td>
                          {d.updatedAt
                            ? new Date(d.updatedAt).toLocaleDateString()
                            : "Not Updated Yet"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center gap-2 m-5">
              <div className="join">
                <button
                  type="button"
                  className="join-item btn btn-outline"
                  onClick={() => handleDeptPageChange(deptPagination.page - 1)}
                  disabled={deptPagination.page <= 1}
                >
                  «
                </button>
                <button
                  type="button"
                  className="join-item btn btn-outline btn-active"
                >
                  {deptPagination.page}
                </button>
                <button
                  type="button"
                  className="join-item btn btn-outline btn-disabled"
                >
                  of {deptPagination.totalPages || 1}
                </button>
                <button
                  type="button"
                  className="join-item btn btn-outline"
                  onClick={() => handleDeptPageChange(deptPagination.page + 1)}
                  disabled={deptPagination.page >= deptPagination.totalPages}
                >
                  »
                </button>
              </div>
            </div>
          </div>

          <input
            type="radio"
            name="user_details_tabs"
            className="tab"
            aria-label="Subjects"
            onChange={() => setActiveTab("subjects")}
          />
          <div className="tab-content glass-morphism border-base-300 p-6">
            <div className="glass-morphism overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Department Name</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        No subjects found.
                      </td>
                    </tr>
                  ) : (
                    subjects.map((s, i) => (
                      <tr key={s.id}>
                        <th>
                          {(subjectPagination.page - 1) *
                            subjectPagination.limit +
                            i +
                            1}
                        </th>
                        <td>{s.name}</td>
                        <td>{s.code}</td>
                        <td>{s.department?.name}</td>
                        <td>{s.description}</td>
                        <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                        <td>
                          {s.updatedAt
                            ? new Date(s.updatedAt).toLocaleDateString() + ""
                            : "Not Updated Yet"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center gap-2 m-5">
              <div className="join">
                <button
                  type="button"
                  className="join-item btn btn-outline"
                  onClick={() =>
                    handleSubjectPageChange(subjectPagination.page - 1)
                  }
                  disabled={subjectPagination.page <= 1}
                >
                  «
                </button>
                <button
                  type="button"
                  className="join-item btn btn-outline btn-active"
                >
                  {subjectPagination.page}
                </button>
                <button
                  type="button"
                  className="join-item btn btn-outline btn-disabled"
                >
                  of {subjectPagination.totalPages || 1}
                </button>
                <button
                  type="button"
                  className="join-item btn btn-outline"
                  onClick={() =>
                    handleSubjectPageChange(subjectPagination.page + 1)
                  }
                  disabled={
                    subjectPagination.page >= subjectPagination.totalPages
                  }
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
