"use client";

import PageHeading from "@/components/pageHeading";
import PaginationControls from "@/components/pagination";
import { GenericTable } from "@/components/table";
import { useUserDepartments, useUserSubjects } from "@/hooks/use-admin-hooks";
import { useSession } from "@/lib/authClient";
import { Department, Subject } from "@/lib/types";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

export default function UserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const token = session?.session?.token as string;

  // Redirect if missing ID
  if (!id) {
    router.replace("/admin/users");
    return null;
  }

  const [activeTab, setActiveTab] = useState<"departments" | "subjects">(
    "departments",
  );

  // Independent query states for tabs
  const [deptQuery, setDeptQuery] = useState({ page: 1, limit: 10 });
  const [subjectQuery, setSubjectQuery] = useState({ page: 1, limit: 10 });

  // Fetch departments data using React Query
  const {
    data: deptResponse,
    isLoading: isDeptLoading,
    isFetching: isDeptFetching,
  } = useUserDepartments(token, id, deptQuery);

  // Fetch subjects data using React Query
  const {
    data: subjectResponse,
    isLoading: isSubjectLoading,
    isFetching: isSubjectFetching,
  } = useUserSubjects(token, id, subjectQuery);

  const depts = deptResponse?.data ?? [];
  const deptPagination = deptResponse?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const subjects = subjectResponse?.data ?? [];
  const subjectPagination = subjectResponse?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handleDeptPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > deptPagination.totalPages) return;
    setDeptQuery((prev) => ({ ...prev, page: newPage }));
  };

  const handleSubjectPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > subjectPagination.totalPages) return;
    setSubjectQuery((prev) => ({ ...prev, page: newPage }));
  };

  const columnsDept = [
    {
      key: "serial",
      header: "#",
      render: (_dept: Department, index: number) =>
        (deptPagination.page - 1) * deptPagination.limit + index + 1,
    },
    {
      key: "name",
      header: "Name",
      render: (dept: Department) => dept.name,
    },
    {
      key: "code",
      header: "Code",
      className: "capitalize",
      render: (dept: Department) => dept.code,
    },
    {
      key: "description",
      header: "Description",
      className: "normal-case",
      render: (dept: Department) => dept.description,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (dept: Department) =>
        new Date(dept.createdAt).toLocaleDateString(),
    },
    {
      key: "updatedAt",
      header: "Updated At",
      render: (dept: Department) =>
        dept.updatedAt
          ? new Date(dept.updatedAt).toLocaleDateString()
          : "Not Updated Yet",
    },
  ];

  const columnsSubjects = [
    {
      key: "serial",
      header: "#",
      render: (_sub: Subject, index: number) =>
        (subjectPagination.page - 1) * subjectPagination.limit + index + 1,
    },
    {
      key: "name",
      header: "Name",
      render: (sub: Subject) => sub.name,
    },
    {
      key: "code",
      header: "Code",
      className: "capitalize",
      render: (sub: Subject) => sub.code,
    },
    {
      key: "departmentName",
      header: "Department Name",
      className: "normal-case",
      render: (sub: Subject) => sub.department?.name ?? "N/A",
    },
    {
      key: "description",
      header: "Description",
      render: (sub: Subject) =>
        sub.description?.length > 30
          ? sub.description.slice(0, 30) + "..."
          : sub.description,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (sub: Subject) => new Date(sub.createdAt).toLocaleDateString(),
    },
    {
      key: "updatedAt",
      header: "Updated At",
      render: (sub: Subject) =>
        sub.updatedAt
          ? new Date(sub.updatedAt).toLocaleDateString()
          : "Not Updated Yet",
    },
  ];

  return (
    <section className="flex min-h-screen flex-col gap-3 p-6">
      <PageHeading title={`User ${id?.slice(0, 4)}... Details`} />

      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
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
              <div className="flex flex-col gap-5">
                <motion.div
                  animate={{ opacity: isDeptFetching ? 0.6 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <GenericTable
                    columns={columnsDept}
                    data={depts}
                    getRowKey={(dept) => dept.id}
                    isLoading={isDeptLoading}
                    emptyMessage="No departments found for this user."
                    skeletonRows={5}
                  />
                </motion.div>

                <PaginationControls
                  handlePageChange={handleDeptPageChange}
                  pagination={deptPagination}
                />
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
              <div className="flex flex-col gap-5">
                <motion.div
                  animate={{ opacity: isSubjectFetching ? 0.6 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <GenericTable
                    columns={columnsSubjects}
                    data={subjects}
                    getRowKey={(subject) => subject.id}
                    isLoading={isSubjectLoading}
                    emptyMessage="No subjects found for this user."
                    skeletonRows={5}
                  />
                </motion.div>

                <PaginationControls
                  handlePageChange={handleSubjectPageChange}
                  pagination={subjectPagination}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
