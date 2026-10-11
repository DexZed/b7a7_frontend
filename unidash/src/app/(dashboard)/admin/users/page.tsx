"use client";
import { useSession } from "@/lib/authClient";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";
import { Info } from "lucide-react";
import Link from "next/link";
import PageHeading from "@/components/pageHeading";
import SearchField from "@/components/searchField";
import { GenericTable } from "@/components/table";
import PaginationControls from "@/components/pagination";
import { motion } from "motion/react";
import { useUsers } from "@/hooks/use-admin-hooks";

function AllUsers() {
  const { data: session } = useSession();
  const token = session?.session?.token as string;

  // Query state parameters passed directly to the custom hook
  const [query, setQuery] = useState<{
    page: number;
    limit: number;
    search?: string;
    role?: string;
  }>({ page: 1, limit: 10 });

  const [searchInput, setSearchInput] = useState("");

  // Debounce search input to update query parameters smoothly
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery((prev) => ({
        ...prev,
        search: searchInput || undefined,
        page: 1, // Reset to first page on search query change
      }));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch users using the custom React Query hook
  const { data: response, isLoading, isFetching } = useUsers(token, query);

  const users = response?.data ?? [];
  const pagination = response?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setQuery((prev) => ({ ...prev, page: newPage }));
  };

  const columns = [
    {
      key: "serial",
      header: "#",
      render: (_user: User, index: number) =>
        (pagination.page - 1) * pagination.limit + index + 1,
    },
    {
      key: "name",
      header: "Name",
      render: (user: User) => user.name,
    },
    {
      key: "role",
      header: "Role",
      className: "capitalize",
      render: (user: User) => user.role,
    },
    {
      key: "email",
      header: "Email",
      className: "normal-case",
      render: (user: User) => user.email,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (user: User) => new Date(user.createdAt).toLocaleDateString(),
    },
    {
      key: "updatedAt",
      header: "Updated At",
      render: (user: User) =>
        user.updatedAt
          ? new Date(user.updatedAt).toLocaleDateString()
          : "Not Updated Yet",
    },
    {
      key: "actions",
      header: "Actions",
      render: (user: User) => (
        <Link
          href={`/admin/users/${user.id}`}
          className="btn btn-ghost btn-outline btn-sm"
          aria-label={`View ${user.name}`}
        >
          <Info size={16} />
        </Link>
      ),
    },
  ];
  return (
    <>
      <section className="flex flex-col gap-5 p-6">
        <PageHeading title="All Users" />
        <div className="glass-morphism m-5 p-5">
          <SearchField
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isFetching ? 0.5 : 1,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <GenericTable
            columns={columns}
            data={users}
            getRowKey={(user) => user.id}
            isLoading={isLoading}
            emptyMessage="No matching users found."
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

export default AllUsers;
