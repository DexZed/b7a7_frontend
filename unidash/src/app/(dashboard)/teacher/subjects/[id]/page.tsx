"use client";
import GenericList from "@/components/genericList";
import PageHeading from "@/components/pageHeading";
import { GenericTable } from "@/components/table";
import Tabs from "@/components/tabs";
import {
  useSubjectById,
  useClassesBySubjectId,
  useTeachersBySubjectId,
} from "@/hooks/use-teacher-hooks";
import { useSession } from "@/lib/authClient";
import { Class, User } from "@/lib/types";
import { useParams } from "next/navigation";
import { useState } from "react";

export function SubjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const token = session?.session?.token ?? "";

  const tabItems = [
    { label: "Subject Details", defaultChecked: true },
    { label: "Classes" },
    { label: "Users" },
  ] as const;

  type Tab = (typeof tabItems)[number]["label"];
  const [activeTab, setActiveTab] = useState<Tab>("Subject Details");

  // 1. Fetch subject details, related classes, and teachers/users using TanStack Query hooks
  const {
    data: subjectResult,
    isLoading: isSubjectLoading,
    isFetching: isSubjectFetching,
  } = useSubjectById(token, id);

  const {
    data: classesResult,
    isLoading: isClassesLoading,
    isFetching: isClassesFetching,
  } = useClassesBySubjectId(token, id);

  const {
    data: usersResult,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
  } = useTeachersBySubjectId(token, id);

  // 2. Extract data safely from responses
  const subjectData = subjectResult?.data;
  const classes = classesResult?.data ?? [];
  const users = usersResult?.data ?? [];

  // 3. Compute loading and fetching statuses
  const isLoading = isSubjectLoading || isClassesLoading || isUsersLoading;
  const isFetching = isSubjectFetching || isClassesFetching || isUsersFetching;

  const classesColumns = [
    {
      key: "serial",
      header: "#",
      render: (_: Class, index: number) => index + 1,
    },
    {
      key: "className",
      header: "Class Name",
      render: (c: Class) => c.name,
    },
    {
      key: "description",
      header: "Description",
      className: "normal-case",
      render: (c: Class) => c.description,
    },
    {
      key: "status",
      header: "Status",
      render: (c: Class) => c.status,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (c: Class) => new Date(c.createdAt).toLocaleDateString(),
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
    <>
      <section className="flex min-h-screen flex-col gap-3 p-6">
        <PageHeading title={`Subject ${id?.slice(0, 4)}... Details`} />

        <div>
          <Tabs
            tabItems={[
              {
                label: "Subject Details",
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
              "Subject Details": (
                <>
                  <GenericList
                    listTitle="Subject Details"
                    listItems={[
                      {
                        itemName: "Subject Name:",
                        itemDescription:
                          subjectData?.subject.description ??
                          (isLoading ? "Loading..." : "N/A"),
                      },
                      {
                        itemName: "Subject Description:",
                        itemDescription:
                          subjectData?.subject.description ??
                          (isLoading ? "Loading..." : "N/A"),
                      },
                      {
                        itemName: "Subject Created At:",
                        itemDescription:
                          new Date(
                            subjectData?.subject.createdAt!,
                          ).toLocaleDateString() ??
                          (isLoading ? "Loading..." : "N/A"),
                      },
                      {
                        itemName: "Subject Updated At:",
                        itemDescription:
                          new Date(
                            subjectData?.subject.updatedAt!,
                          ).toLocaleDateString() ??
                          (isLoading ? "Loading..." : "N/A"),
                      },
                    ]}
                  />
                </>
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
    </>
  );
}

export default SubjectDetailPage;
