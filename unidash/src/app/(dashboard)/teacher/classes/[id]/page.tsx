"use client";
import GenericList from "@/components/genericList";
import PageHeading from "@/components/pageHeading";
import { GenericTable } from "@/components/table";
import Tabs from "@/components/tabs";
import { useClassById, useClassStudents } from "@/hooks/uses-teacher-hooks";

import { useSession } from "@/lib/authClient";
import { Schedules, User } from "@/lib/types";
import { useParams } from "next/navigation";

import { useState } from "react";

function ClassDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: session } = useSession();
  const token = session?.session?.token ?? "";

  const tabItems = [
    { label: "Class Details", defaultChecked: true },
    { label: "Users" },
  ] as const;

  type Tab = (typeof tabItems)[number]["label"];
  const [activeTab, setActiveTab] = useState<Tab>("Class Details");

  // 1. Fetch class details teachers/users using TanStack Query hooks
  const {
    data: classesResult,
    isLoading: isClassLoading,
    isFetching: isClassFetching,
  } = useClassById(token, id);

  const {
    data: usersResult,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
  } = useClassStudents(token, id);

  // 2. Extract data safely from responses
  const classData = classesResult?.data;

  const users = usersResult?.data ?? [];

  // 3. Compute loading and fetching statuses
  const isLoading = isClassLoading || isUsersLoading;
  const isFetching = isClassFetching || isUsersFetching;
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
        <PageHeading title={` Class Details: ${classData?.name}`} />

        <div>
          <Tabs
            tabItems={[
              {
                label: "Class Details",
                defaultChecked: true,
              },
              {
                label: "Users",
              },
            ]}
            setActiveTab={(tab) => setActiveTab(tab)}
            tabContent={{
              "Class Details": (
                <>
                  <GenericList
                    listTitle="Class Details"
                    listItems={[
                      {
                        itemName: "Class Name:",
                        itemDescription:
                          classData?.name ?? (isLoading ? "Loading..." : "N/A"),
                      },
                      {
                        itemName: "Class Description:",
                        itemDescription:
                          classData?.description ??
                          (isLoading ? "Loading..." : "N/A"),
                      },
                      {
                        itemName: "Class Invite Code:",
                        itemDescription:
                          classData?.inviteCode ??
                          (isLoading ? "Loading..." : "N/A"),
                      },
                      {
                        itemName: "Class Capacity:",
                        itemDescription:
                          classData?.capacity.toString() ??
                          (isLoading ? "Loading..." : "N/A"),
                      },
                      {
                        itemName: "Class Schedule:",
                        itemRender: (
                          <>
                            <GenericTable<Schedules>
                              columns={[
                                {
                                  key: "day",
                                  header: "Day",
                                  render: (row) => row.day,
                                },
                                {
                                  key: "startTime",
                                  header: "Start Time",
                                  render: (row) => row.startTime,
                                },
                                {
                                  key: "endTime",
                                  header: "End Time",
                                  render: (row) => row.endTime,
                                },
                                {
                                  key: "onlineMeetLink",
                                  header: "Meet Link",
                                  render: (row) =>
                                    row.onlineMeetLink ? (
                                      <a
                                        href={row.onlineMeetLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-primary underline"
                                      >
                                        Join
                                      </a>
                                    ) : (
                                      "N/A"
                                    ),
                                },
                              ]}
                              data={classData?.schedules ?? []}
                              getRowKey={(row) => `${row.day}-${row.startTime}`}
                              isLoading={isLoading}
                              emptyMessage={
                                isLoading
                                  ? "Loading schedules..."
                                  : "No schedules found."
                              }
                            />
                          </>
                        ),
                      },
                      {
                        itemName: "Subject Created At:",
                        itemDescription:
                          new Date(
                            classData?.createdAt!,
                          ).toLocaleDateString() ??
                          (isLoading ? "Loading..." : "N/A"),
                      },
                      {
                        itemName: "Subject Updated At:",
                        itemDescription:
                          new Date(
                            classData?.updatedAt!,
                          ).toLocaleDateString() ??
                          (isLoading ? "Loading..." : "N/A"),
                      },
                    ]}
                  />
                </>
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

export default ClassDetailsPage;
