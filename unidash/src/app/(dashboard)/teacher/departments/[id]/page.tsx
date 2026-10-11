"use client";
import PageHeading from "@/components/pageHeading";
import { GenericTable } from "@/components/table";
import Tabs from "@/components/tabs";
import {
  useDepartmentClasses,
  useDepartmentSubjects,
  useDepartmentUsers,
} from "@/hooks/uses-teacher-hooks";
import { useSession } from "@/lib/authClient";
import { ClassesFullSchema, Subject, User } from "@/lib/types";
import { useParams } from "next/navigation";

import { useState } from "react";

function DepartmentDetails() {
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const token = session?.session?.token ?? "";

  const tabItems = [
    { label: "Subjects", defaultChecked: true },
    { label: "Classes" },
    { label: "Users" },
  ] as const;

  type Tab = (typeof tabItems)[number]["label"];

  const [activeTab, setActiveTab] = useState<Tab>("Subjects");

  // Use the TanStack Query hooks provided
  const {
    data: subjectsData,
    isLoading: isSubjectsLoading,
    isFetching: isSubjectsFetching,
  } = useDepartmentSubjects(token, id);

  const {
    data: classesData,
    isLoading: isClassesLoading,
    isFetching: isClassesFetching,
  } = useDepartmentClasses(token, id);

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
  } = useDepartmentUsers(token, id);

  // Extract arrays safely from the API responses (assuming .data structure based on your original code)
  const subjects = subjectsData?.data ?? [];
  const classes = classesData?.data ?? [];
  const users = usersData?.data ?? [];

  // Determine overall or tab-specific loading/fetching states for the UI

  const isFetching = isSubjectsFetching || isClassesFetching || isUsersFetching;

  const subjectColumns = [
    {
      key: "serial",
      header: "#",
      render: (_: Subject, index: number) => index + 1,
    },
    {
      key: "name",
      header: "Name",
      render: (subject: Subject) => subject.name,
    },
    {
      key: "code",
      header: "Code",
      className: "capitalize",
      render: (subject: Subject) => subject.code,
    },
    {
      key: "description",
      header: "Description",
      className: "normal-case",
      render: (subject: Subject) => subject.description,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (subject: Subject) =>
        new Date(subject.createdAt).toLocaleDateString(),
    },
    {
      key: "updatedAt",
      header: "Updated At",
      render: (subject: Subject) =>
        subject.updatedAt
          ? new Date(subject.updatedAt).toLocaleDateString()
          : "Not Updated Yet",
    },
  ];

  const classesColumns = [
    {
      key: "serial",
      header: "#",
      render: (_: ClassesFullSchema, index: number) => index + 1,
    },
    {
      key: "className",
      header: "Class Name",
      render: (c: ClassesFullSchema) => c.name,
    },
    {
      key: "inviteCode",
      header: "Code",
      className: "capitalize",
      render: (c: ClassesFullSchema) => c.inviteCode,
    },
    {
      key: "subjectName",
      header: "Subject Name",
      className: "normal-case",
      render: (c: ClassesFullSchema) => c.subject.name,
    },
    {
      key: "teacherName",
      header: "Teacher Name",
      render: (c: ClassesFullSchema) => c.teacher.name,
    },
    {
      key: "description",
      header: "Description",
      className: "normal-case",
      render: (c: ClassesFullSchema) => c.description,
    },
    {
      key: "capacity",
      header: "Capacity",
      render: (c: ClassesFullSchema) => c.capacity,
    },
    {
      key: "status",
      header: "Status",
      render: (c: ClassesFullSchema) => c.status,
    },
    {
      key: "price",
      header: "Price",
      render: (c: ClassesFullSchema) => c.price,
    },
  ];

  const usersColumns = [
    {
      key: "serial",
      header: "#",
      render: (_: User, index: number) => index + 1,
    },
    {
      key: "name",
      header: "Name",
      render: (u: User) => u.name,
    },
    {
      key: "email",
      header: "Email",
      className: "lowercase",
      render: (u: User) => u.email,
    },
    {
      key: "role",
      header: "Role",
      render: (u: User) => u.role,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (u: User) => new Date(u.createdAt).toLocaleDateString(),
    },
    {
      key: "updatedAt",
      header: "Updated At",
      render: (u: User) =>
        u.updatedAt
          ? new Date(u.updatedAt).toLocaleDateString()
          : "Not Updated Yet",
    },
  ];

  return (
    <section className="flex min-h-screen flex-col gap-3 p-6">
      <PageHeading title={`Department ${id?.slice(0, 4)}... Details`} />

      <div>
        <Tabs
          tabItems={[
            {
              label: "Subjects",
              defaultChecked: true,
            },
            {
              label: "Classes",
            },
            {
              label: "Users",
            },
          ]}
          setActiveTab={(tab) => setActiveTab(tab)}
          tabContent={{
            Subjects: (
              <GenericTable
                columns={subjectColumns}
                data={subjects}
                getRowKey={(subject) => subject.id}
                isLoading={isSubjectsLoading || isSubjectsFetching}
                emptyMessage="No matching subjects found."
                skeletonRows={5}
              />
            ),
            Classes: (
              <GenericTable
                columns={classesColumns}
                data={classes}
                getRowKey={(clas) => clas.id}
                isLoading={isClassesLoading || isClassesFetching}
                emptyMessage="No matching classes found."
                skeletonRows={5}
              />
            ),
            Users: (
              <GenericTable
                columns={usersColumns}
                data={users}
                getRowKey={(u) => u.id}
                isLoading={isUsersLoading || isUsersFetching}
                emptyMessage="No matching users found."
                skeletonRows={5}
              />
            ),
          }}
          isFetching={isFetching}
        />
      </div>
    </section>
  );
}

export default DepartmentDetails;
