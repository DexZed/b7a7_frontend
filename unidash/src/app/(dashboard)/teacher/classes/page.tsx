"use client";
import { useSession } from "@/lib/authClient";
import { useDeferredValue, useState, useTransition } from "react";
import { Class } from "@/lib/types";
import ClassForm from "./_components/classForm";
import SearchField from "@/components/searchField";
import PageHeading from "@/components/pageHeading";
import PaginationControls from "@/components/pagination";
import { GenericTable } from "@/components/table";
import { useClasses } from "@/hooks/uses-teacher-hooks";
import { motion } from "motion/react";
import { Info } from "lucide-react";
import Link from "next/link";

export function ClassesPage() {
  const { data: session } = useSession();
  const token = session?.session?.token ?? "";

  // 1. Unified query state for parameters
  const [query, setQuery] = useState<{
    page?: number;
    limit?: number;
    search?: string;
  }>({ page: 1, limit: 10 });

  const [searchInput, setSearchInput] = useState("");
  const [isPending, startTransition] = useTransition();

  // 2. Defer search input to keep typing responsive
  const deferredSearch = useDeferredValue(searchInput);

  // 3. Pass deferred search directly into query parameters
  const activeQuery = {
    ...query,
    search: deferredSearch || undefined,
  };

  // 4. Fetch data natively via TanStack Query hook
  const {
    data: classesData,
    isLoading,
    isFetching,
  } = useClasses(token, activeQuery);

  const classes = classesData?.data ?? [];
  const pagination = classesData?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    // Transition state update to keep the input fluid while filtering
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
      render: (_: Class, index: number) =>
        (query.page! - 1) * query.limit! + index + 1,
    },
    {
      key: "name",
      header: "Name",
      render: (c: Class) => c.name,
    },
    {
      key: "description",
      header: "Description",
      render: (c: Class) => c.description,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (c: Class) => new Date(c.createdAt).toLocaleDateString(),
    },
    {
      key: "details",
      header: "Details",
      render: (c: Class) => (
        <Link
          href={`/teacher/classes/${c.id}`}
          className="btn btn-sm btn-ghost"
        >
          {" "}
          <Info />
        </Link>
      ),
    },
  ];

  return (
    <>
      <section className="flex flex-col gap-5 p-6 min-h-screen">
        <PageHeading title="All Classes" />

        <div className="flex justify-between items-center">
          <SearchField value={searchInput} onChange={handleSearchChange} />
          <button
            onClick={() =>
              (
                document.getElementById("add-department") as HTMLDialogElement
              )?.showModal()
            }
            className="btn btn-primary btn-outline"
          >
            Add A Class
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
            <h3 className="text-2xl font-semibold">Add New Class</h3>
            <ClassForm />
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
            data={classes}
            getRowKey={(clas) => clas.id}
            isLoading={isLoading || isFetching || isPending}
            emptyMessage="No matching classes found."
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

export default ClassesPage;
