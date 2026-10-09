"use client";
import { useSession } from "@/lib/authClient";
import { getAllUsers } from "@/data access/adminData";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";

function AllUsers() {
  const { data: session } = useSession();

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
        const res = await getAllUsers(session.session.token as string, query);
        setUsers(res.data);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
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
  return (
    <>
      <section className="flex flex-col gap-5 p-6">
        <h1 className="text-3xl font-semibold">All Users</h1>
        <form onSubmit={handleServerSearch} className="glass-morphism m-5 p-5">
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
        <div className="glass-morphism">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No matching users found on this page.
                    </td>
                  </tr>
                ) : (
                  filteredUsers?.map((u, i) => {
                    const serialNumber =
                      (pagination.page - 1) * pagination.limit + i + 1;
                    return (
                      <tr key={u.id}>
                        <th>{serialNumber}</th>
                        <td>{u.name}</td>
                        <td>{u.role}</td>
                        <td>{u.email}</td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td>
                          {u.updatedAt
                            ? new Date(u.updatedAt).toLocaleDateString()
                            : "Not Updated Yet"}
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

export default AllUsers;
