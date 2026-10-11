"use client";

import { SkeletonCards } from "@/components/skeletons";
import { useChartData } from "@/hooks/use-admin-hooks";
import { useSession } from "@/lib/authClient";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const AdminChart = () => {
  const { data: session } = useSession();
  const token = session?.session?.token as string;

  const { data: response, isLoading } = useChartData(token);
  const chartData = response?.data;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonCards width={"w-full"} height={"h-96"} count={3} />
      </div>
    );
  }

  const usersByRoleData = chartData?.usersByRole.map((role) => ({
    label: role.role.toUpperCase(),
    "Users By Role": role.total,
  }));

  const subByDeptData = chartData?.subjectsByDepartment.map((dept) => ({
    label: dept.departmentName.toUpperCase(),
    "Subjects Per Department": dept.totalSubjects,
  }));

  const classesBySubjectData = chartData?.classesBySubject.map((sub) => ({
    label: sub.subjectName.toUpperCase(),
    "Classes Per Subject": sub.totalClasses,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 glass-morphism p-4 my-5">
      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={usersByRoleData}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      >
        <CartesianGrid />
        <XAxis dataKey="label" />
        <YAxis width="auto" />
        <Tooltip contentStyle={{ color: "black" }} />
        <Legend />
        <Bar dataKey="Users By Role" radius={[10, 10, 0, 0]} />
      </BarChart>

      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={subByDeptData}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      >
        <CartesianGrid />
        <XAxis dataKey="label" />
        <YAxis width="auto" />
        <Tooltip contentStyle={{ color: "black" }} />
        <Legend />
        <Bar dataKey="Subjects Per Department" radius={[10, 10, 0, 0]} />
      </BarChart>

      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={classesBySubjectData}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      >
        <CartesianGrid />
        <XAxis dataKey="label" />
        <YAxis width="auto" />
        <Tooltip contentStyle={{ color: "black" }} />
        <Legend />
        <Bar dataKey="Classes Per Subject" radius={[10, 10, 0, 0]} />
      </BarChart>
    </div>
  );
};

export default AdminChart;
