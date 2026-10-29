"use client";

import PageHeading from "@/components/pageHeading";
import { PaginationControls } from "@/components/pagination";

import { GenericTable } from "@/components/table";
import Tabs from "@/components/tabs";
import { useUserDepartments, useUserSubjects } from "@/hooks/use-admin-hooks";
import { usePagination } from "@/hooks/use-pagination";
import { useSession } from "@/lib/authClient";
import { Department, Subject } from "@/lib/types";
import { createColumns, textTruncate } from "@/lib/utils";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";

import { useState, useTransition } from "react";

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

  const [activeTab, setActiveTab] = useState<"Departments" | "Subjects">(
    "Departments",
  );

  const [deptQuery, setDeptQuery] = useState({ page: 1, limit: 10 });
  const [subjectQuery, setSubjectQuery] = useState({ page: 1, limit: 10 });
  const [isPending, startTransition] = useTransition();

  const {
    data: deptResponse,
    isLoading: isDeptLoading,
    isFetching: isDeptFetching,
  } = useUserDepartments(token, id, deptQuery);

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

    startTransition(() => {
      setDeptQuery((prev) => ({
        ...prev,
        page: newPage,
      }));
    });
  };

  const {
    pageItems: dpageItems,
    goToPage: dgoToPage,
    firstPage: dfirstPage,
    lastPage: dlastPage,
    previousPage: dpreviousPage,
    nextPage: dnextPage,
  } = usePagination({
    page: deptPagination.page,
    totalPages: deptPagination.totalPages,
    setPage: handleDeptPageChange,
    siblingCount: 1,
    boundaryCount: depts.length > 5 ? 1 : 0,
  });

  const handleSubjectPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > subjectPagination.totalPages) return;

    startTransition(() => {
      setSubjectQuery((prev) => ({ ...prev, page: newPage }));
    });
  };

  const {
    pageItems: sPageItems,
    goToPage: sGoToPage,
    firstPage: sFirstPage,
    lastPage: sLastPage,
    previousPage: sPreviousPage,
    nextPage: sNextPage,
  } = usePagination({
    page: subjectPagination.page,
    totalPages: subjectPagination.totalPages,
    setPage: handleSubjectPageChange,
    siblingCount: 1,
    boundaryCount: subjects.length > 5 ? 1 : 0,
  });

  const columnsDept = [
    {
      key: "serial",
      header: "#",
      render: (_dept: Department, index: number) =>
        (deptPagination.page - 1) * deptPagination.limit + index + 1,
    },
    ...createColumns<Department>(depts, {
      description: {
        render: (dept) => textTruncate(dept.description),
      },
      createdAt: {
        render: (dept) => new Date(dept.createdAt).toLocaleDateString(),
      },
      updatedAt: {
        render: (dept) =>
          dept.updatedAt
            ? new Date(dept.updatedAt).toLocaleDateString()
            : "Not Updated Yet",
      },
    }),
  ];

  const columnsSubjects = [
    {
      key: "serial",
      header: "#",
      render: (_sub: Subject, index: number) =>
        (subjectPagination.page - 1) * subjectPagination.limit + index + 1,
    },
    ...createColumns<Subject>(
      subjects,
      {
        description: {
          render: (sub) => textTruncate(sub.description),
        },
        createdAt: {
          render: (sub) => new Date(sub.createdAt).toLocaleDateString(),
        },
        updatedAt: {
          render: (sub) =>
            sub.updatedAt
              ? new Date(sub.updatedAt).toLocaleDateString()
              : "Not Updated Yet",
        },
      },
      ["department"],
    ),
  ];

  return (
    <section className="flex min-h-screen flex-col gap-3 p-6">
      <PageHeading title={`User ${id?.slice(0, 4)}... Details`} />

      <Tabs
        tabItems={[
          {
            label: "Departments",
            defaultChecked: true,
          },
          {
            label: "Subjects",
          },
        ]}
        setActiveTab={(tab) => setActiveTab(tab)}
        tabContent={{
          Departments: (
            <>
              <GenericTable
                columns={columnsDept}
                data={depts}
                getRowKey={(dept) => dept.id}
                isLoading={isDeptLoading || isDeptFetching}
                emptyMessage="No departments found for this user."
                skeletonRows={5}
              />
              <div className="flex flex-col justify-center items-center mt-2">
                <PaginationControls
                  firstPage={dfirstPage}
                  previousPage={dpreviousPage}
                  nextPage={dnextPage}
                  lastPage={dlastPage}
                  pageItems={dpageItems}
                  page={deptPagination.page}
                  totalPages={deptPagination.totalPages}
                  goToPage={dgoToPage}
                />
              </div>
            </>
          ),
          Subjects: (
            <>
              <GenericTable
                columns={columnsSubjects}
                data={subjects}
                getRowKey={(subject) => subject.id}
                isLoading={isSubjectLoading || isSubjectFetching}
                emptyMessage="No subjects found for this user."
                skeletonRows={5}
              />
              <div className="flex flex-col justify-center items-center mt-2">
                <PaginationControls
                  firstPage={sFirstPage}
                  previousPage={sPreviousPage}
                  nextPage={sNextPage}
                  lastPage={sLastPage}
                  pageItems={sPageItems}
                  page={subjectPagination.page}
                  totalPages={subjectPagination.totalPages}
                  goToPage={sGoToPage}
                />
              </div>
            </>
          ),
        }}
        isFetching={isDeptFetching || isSubjectFetching || isPending}
      />
    </section>
  );
}
