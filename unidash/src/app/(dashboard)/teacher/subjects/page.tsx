"use client";
import { useSession } from "@/lib/authClient";
import { useDeferredValue, useState, useTransition } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { Subject } from "@/lib/types";
import SubjectForm from "./_components/subjectForm";
import PageHeading from "@/components/pageHeading";
import SearchField from "@/components/searchField";
import { useSubjects } from "@/hooks/uses-teacher-hooks";
import { motion } from "motion/react";
import { GenericTable } from "@/components/table";
import PaginationControls from "@/components/pagination";

export function SubjectsPage() {
  const { data: session } = useSession();
  const token = session?.session?.token ?? "";

  // 1. Query parameters state
  const [query, setQuery] = useState<{
    page?: number;
    limit?: number;
    search?: string;
  }>({ page: 1, limit: 10 });

  const [searchInput, setSearchInput] = useState("");
  const [isPending, startTransition] = useTransition();

  // 2. Defer search input to keep typing responsive
  const deferredSearch = useDeferredValue(searchInput);

  // 3. Combined query payload with deferred search
  const activeQuery = {
    ...query,
    search: deferredSearch || undefined,
  };

  // 4. Fetch data natively via TanStack Query hook
  const {
    data: subjectsData,
    isLoading,
    isFetching,
  } = useSubjects(token, activeQuery);

  const subjects = subjectsData?.data ?? [];
  const pagination = subjectsData?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    startTransition(() => {
      setQuery((prev) => ({ ...prev, search: value, page: 1 }));
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    startTransition(() => {
      setQuery((prev) => ({ ...prev, page: newPage }));
    });
  };

  const columns = [
    {
      key: "serial",
      header: "#",
      render: (_: Subject, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      key: "name",
      header: "Name",
      render: (s: Subject) => s.name,
    },
    {
      key: "code",
      header: "Code",
      render: (s: Subject) => s.code,
    },
    {
      key: "description",
      header: "Description",
      render: (s: Subject) => {
        const desc = s.description || "";
        return desc.length > 50 ? desc.slice(0, 50) + "..." : desc;
      },
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (s: Subject) => new Date(s.createdAt).toLocaleDateString(),
    },
    {
      key: "details",
      header: "Details",
      render: (s: Subject) => (
        <Link
          className="btn btn-ghost btn-outline"
          href={`/teacher/subjects/${s.id}`}
        >
          <Info />
        </Link>
      ),
    },
  ];
  return (
    <>
      <section className="flex flex-col gap-5 p-6 min-h-screen">
        <PageHeading title="All Subjects" />
        <div className="flex justify-evenly items-center">
          <SearchField value={searchInput} onChange={handleSearchChange} />
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isFetching || isPending ? 0.5 : 1,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <GenericTable
            columns={columns}
            data={subjects}
            getRowKey={(subject) => subject.id}
            isLoading={isLoading || isFetching || isPending}
            emptyMessage="No matching subjects found."
            skeletonRows={5}
          />
        </motion.div>

        <PaginationControls
          handlePageChange={handlePageChange}
          pagination={pagination}
        />
      </section>
    </>
  );
}

export default SubjectsPage;
