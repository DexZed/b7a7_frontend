"use client";
import { useSession } from "@/lib/authClient";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";

import SkeletonBanner, { SkeletonContent } from "@/components/skeletons";
import { Subject } from "@/lib/types";
import { getAllSubjects } from "@/data access/teacherData";
import SubjectForm from "./_components/subjectForm";

function SubjectsPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState<{
    page?: number;
    limit?: number;
    search?: string;
  }>({ page: 1, limit: 10 });

  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }>({ page: 1, limit: 10, total: 0, totalPages: 1 });

  const [searchInput, setSearchInput] = useState("");

  const [debouncedFilter, setDebouncedFilter] = useState("");

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!session?.session?.token) return;
      try {
        setIsLoading(true);
        const res = await getAllSubjects(
          session.session.token as string,
          query,
        );
        setSubjects(res.data);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch Subjects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, [query, session]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredSubjects = subjects?.filter((s) => {
    if (!debouncedFilter) return true;
    const term = debouncedFilter.toLowerCase();
    return (
      s?.name?.toLowerCase().includes(term) ||
      s?.department?.name?.toLowerCase().includes(term)
    );
  });

  const handleServerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery((prev) => ({
      ...prev,
      search: searchInput,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setQuery((prev) => ({ ...prev, page: newPage }));
  };
  if (isLoading) {
    return (
      <>
        <SkeletonBanner />
        <SkeletonContent width={"full"} height={"min-h-screen"} />
      </>
    );
  }
  return (
    <>
      <section className="flex flex-col gap-5 p-6 min-h-screen">
        <h1 className="text-3xl font-semibold">All Subjects</h1>
        <div className="flex justify-evenly items-center">
          <form onSubmit={handleServerSearch}>
            <div className="glass-morphism m-5 p-5">
              <div className="join">
                <div>
                  <label className="input input-accent validator join-item">
                    <svg
                      className="h-[1em] opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </g>
                    </svg>
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search"
                    />
                  </label>
                  <div className="validator-hint hidden">Start typing...</div>
                </div>
                <button
                  type="submit"
                  className="btn btn-accent btn-outline join-item"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <button
            onClick={() =>
              (
                document.getElementById("add-department") as HTMLDialogElement
              )?.showModal()
            }
            className="btn btn-primary btn-outline"
          >
            Add Subject
          </button>
        </div>
        <dialog
          id="add-department"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="text-2xl font-semibold">Add New Subject</h3>
            <SubjectForm />
          </div>
        </dialog>

        <div className="glass-morphism">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>

                  <th>Code</th>
                  <th>Description</th>

                  <th>Created At</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No matching subjects found on this page.
                    </td>
                  </tr>
                ) : (
                  filteredSubjects?.map((s, i) => {
                    const serialNumber =
                      (pagination.page - 1) * pagination.limit + i + 1;
                    return (
                      <tr key={s.id}>
                        <th>{serialNumber}</th>
                        <td>{s.name}</td>
                        <td>{s.code}</td>
                        <td>
                          {s.description?.length > 50
                            ? s.description.slice(0, 50) + "..."
                            : s.description}
                        </td>
                        <td>{new Date(s.createdAt).toLocaleDateString()}</td>

                        <td>
                          <Link
                            className="btn btn-ghost btn-outline"
                            href={`/teacher/subjects/${s.id}`}
                          >
                            <Info />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <div className="join">
            <button
              type="button"
              className="join-item btn btn-outline"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
            >
              «
            </button>
            <button
              type="button"
              className="join-item btn btn-outline btn-active"
            >
              {pagination.page}
            </button>
            <button
              type="button"
              className="join-item btn btn-outline btn-disabled"
            >
              of {pagination.totalPages || 1}
            </button>
            <button
              type="button"
              className="join-item btn btn-outline"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              {pagination.page + 1 <= pagination.totalPages
                ? pagination.page + 1
                : pagination.page}
            </button>
            <button
              type="button"
              className="join-item btn btn-outline"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
            >
              »
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default SubjectsPage;
