"use client";

import NeedlesslyComplicatedBarChart from "@/components/charts";
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
    x: role.role.toUpperCase(),
    "Users By Role": role.total,
  }));

  const subByDeptData = chartData?.subjectsByDepartment.map((dept) => ({
    x: dept.departmentName.toUpperCase(),
    "Subjects By Department": dept.totalSubjects,
  }));

  const classesBySubjectData = chartData?.classesBySubject.map((sub) => ({
    x: sub.subjectName.toUpperCase(),
    "Classes By Subject": sub.totalClasses,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 glass-morphism p-4 my-5">
      <NeedlesslyComplicatedBarChart
        data={usersByRoleData ?? []}
        yDataKey="Users By Role"
      />
      <NeedlesslyComplicatedBarChart
        data={subByDeptData ?? []}
        yDataKey="Subjects By Department"
      />
      <NeedlesslyComplicatedBarChart
        data={classesBySubjectData ?? []}
        yDataKey="Classes By Subject"
      />
    </div>
  );
};

export default AdminChart;
