"use client";
import { useSession } from "@/lib/authClient";
import { useDeferredValue, useEffect, useState, useTransition } from "react";
import { User } from "@/lib/types";
import { Info } from "lucide-react";
import Link from "next/link";
import PageHeading from "@/components/pageHeading";
import SearchField from "@/components/searchField";
import { GenericTable } from "@/components/table";
import { motion } from "motion/react";
import { useUsers } from "@/hooks/use-admin-hooks";
import { PaginationControls } from "@/components/pagination";
import { usePagination } from "@/hooks/use-pagination";

function AllUsers() {
  const { data: session } = useSession();
  const token = session?.session?.token as string;

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const [searchInput, setSearchInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(searchInput);
  const activeQuery = {
    ...query,
    search: deferredSearch || undefined,
  };

  const {
    data: response,
    isLoading,
    isFetching,
  } = useUsers(token, activeQuery);
  const users = response?.data ?? [];
  const pagination = response?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);

    startTransition(() => {
      setQuery((prev) => ({
        ...prev,
        page: 1,
      }));
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;

    startTransition(() => {
      setQuery((prev) => ({
        ...prev,
        page: newPage,
      }));
    });
  };
  const { pageItems, goToPage, firstPage, lastPage, previousPage, nextPage } =
    usePagination({
      page: pagination.page,
      totalPages: pagination.totalPages,
      setPage: handlePageChange,
    });
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
          <SearchField value={searchInput} onChange={handleSearchChange} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isFetching || isPending ? 0.5 : 1,
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
          firstPage={firstPage}
          previousPage={previousPage}
          nextPage={nextPage}
          lastPage={lastPage}
          pageItems={pageItems}
          page={pagination.page}
          totalPages={pagination.totalPages}
          goToPage={goToPage}
        />
      </section>
    </>
  );
}

export default AllUsers;
