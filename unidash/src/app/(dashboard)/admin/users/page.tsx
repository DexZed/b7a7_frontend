"use client";
import { useSession } from "@/lib/authClient";
import { getAllUsers } from "@/data access/adminData";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";
import { Info } from "lucide-react";
import Link from "next/link";
import PageHeading from "@/components/pageHeading";
import SearchField from "@/components/searchField";
import FormBody from "@/components/form";
import { GenericTable } from "@/components/table";
import PaginationControls from "@/components/pagination";
import { motion } from "motion/react";

function AllUsers() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState<{
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }>({ page: 1, limit: 10 });

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }>({ page: 1, limit: 10, total: 0, totalPages: 1 });

  const [searchInput, setSearchInput] = useState("");

  const [debouncedFilter, setDebouncedFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!session?.session?.token) return;
      try {
        setIsLoading(true);
        const res = await getAllUsers(session.session.token as string, query);
        setUsers(res.data);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [query, session]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsFiltering(true);

    const timer = setTimeout(() => {
      setDebouncedFilter(searchInput);
      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);
  const filteredUsers = users?.filter((u) => {
    if (!debouncedFilter) return true;
    const term = debouncedFilter.toLowerCase();
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      u.role?.toLowerCase().includes(term)
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
        <FormBody onSubmit={handleServerSearch}>
          <div className="glass-morphism m-5 p-5">
            <SearchField
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </FormBody>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isFiltering ? 0.5 : 1,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <GenericTable
            columns={columns}
            data={filteredUsers ?? []}
            getRowKey={(user) => user.id}
            isLoading={isLoading}
            emptyMessage="No matching users found on this page."
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
