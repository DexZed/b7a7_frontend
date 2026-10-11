"use client";
import PageHeading from "@/components/pageHeading";
import PaginationControls from "@/components/pagination";
import SkeletonBanner, {
  SkeletonCards,
  SkeletonContent,
} from "@/components/skeletons";
import { GenericTable } from "@/components/table";
import {
  getUserDepartmentsById,
  getUserSubjectsById,
} from "@/data access/adminData";
import { useSession } from "@/lib/authClient";
import { Department, Subject } from "@/lib/types";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const token = session?.session?.token;

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
        (deptPagination.page - 1) * deptPagination.limit + index + 1,
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
      render: (sub: Subject) => sub.department.name,
    },
    {
      key: "description",
      header: "Description",
      render: (sub: Subject) =>
        sub.description.length > 30
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <GenericTable
                    columns={columnsDept}
                    data={depts ?? []}
                    getRowKey={(dept) => dept.id}
                    isLoading={isLoading}
                    emptyMessage="No matching users found on this page."
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <GenericTable
                    columns={columnsSubjects}
                    data={subjects ?? []}
                    getRowKey={(subject) => subject.id}
                    isLoading={isLoading}
                    emptyMessage="No matching users found on this page."
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
