"use client";
import { useSession } from "@/lib/authClient";
import { useDeferredValue, useEffect, useState, useTransition } from "react";
import { Department } from "@/lib/types";
import Link from "next/link";
import { Info } from "lucide-react";
import { GenericTable } from "@/components/table";
import { motion } from "motion/react";
import PageHeading from "@/components/pageHeading";
import PaginationControls from "@/components/pagination";
import SearchField from "@/components/searchField";
import { useDepartments } from "@/hooks/uses-teacher-hooks";
export default function DepartmentsPage() {
  const { data: session } = useSession();
  const token = session?.session?.token as string;

  const [page, setPage] = useState(1);
  const limit = 10;
  const [searchInput, setSearchInput] = useState("");
  const [isPending, startTransition] = useTransition();

  // Debounce the search input to prevent excessive query triggering
  const debouncedSearch = useDeferredValue(searchInput);

  // Fetch departments using React Query with server-side query params
  const { data, isLoading, isFetching } = useDepartments(token, {
    page,
    limit,
    search: debouncedSearch,
  });

  const departments = data?.data || [];
  const pagination = data?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    startTransition(() => {
      setPage(1); // Reset to first page on search
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    startTransition(() => {
      setPage(newPage);
    });
  };

  const columns = [
    {
      key: "serial",
      header: "#",
      render: (_department: Department, index: number) =>
        (pagination.page - 1) * pagination.limit + index + 1,
    },
    {
      key: "name",
      header: "Name",
      render: (department: Department) => department.name,
    },
    {
      key: "code",
      header: "Code",
      className: "capitalize",
      render: (department: Department) => department.code,
    },
    {
      key: "description",
      header: "Description",
      className: "normal-case",
      render: (department: Department) => department.description,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (department: Department) =>
        new Date(department.createdAt).toLocaleDateString(),
    },
    {
      key: "updatedAt",
      header: "Updated At",
      render: (department: Department) =>
        department.updatedAt
          ? new Date(department.updatedAt).toLocaleDateString()
          : "Not Updated Yet",
    },
    {
      key: "totalSubjects",
      header: "Total Subjects",
      render: (department: Department) => department.totalSubjects,
    },
    {
      key: "details",
      header: "Details",
      render: (department: Department) => (
        <Link
          href={`/teacher/departments/${department.id}`}
          className="btn btn-ghost btn-outline btn-sm"
          aria-label={`View ${department.name}`}
        >
          <Info size={16} />
        </Link>
      ),
    },
  ];

  return (
    <section className="flex flex-col gap-5 p-6 min-h-screen">
      <PageHeading title="All Departments" />

      <SearchField value={searchInput} onChange={handleSearchChange} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isFetching ? 0.5 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <GenericTable
          columns={columns}
          data={departments}
          getRowKey={(department) => department.id}
          isLoading={isLoading || isFetching || isPending}
          emptyMessage="No matching departments found."
          skeletonRows={5}
        />
      </motion.div>

      <PaginationControls
        handlePageChange={handlePageChange}
        pagination={pagination}
      />
    </section>
  );
}
