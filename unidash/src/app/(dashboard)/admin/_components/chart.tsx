"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { generateMockData, RechartsDevtools } from "@recharts/devtools";
import { useSession } from "@/lib/authClient";
import { useEffect, useState } from "react";
import { ChartData } from "@/lib/types";
import { getChartData } from "@/data access/adminData";
import { SkeletonCards, SkeletonContent } from "@/components/skeletons";

const data = generateMockData(6, 823);
/**
 *
 * data shape = [
 * {
 *  label: string,
 *  x: number,
 *  y: number,
 *  z: number
 * },
 * ]
 */

const AdminChart = () => {
  const { data: session, isPending } = useSession();
  const [chartData, setChartData] = useState<ChartData>();

  useEffect(() => {
    if (isPending || !session) return;

    const token = session.session.token;
    const fetchChartData = async () => {
      const stats = await getChartData(token);
      setChartData(stats.data);
    };
    fetchChartData();
  }, [session, isPending]);

  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonCards width={"w-full"} height={"h-96"} count={3} />
      </div>
    );
  }
  const usersByRoleData = chartData?.usersByRole.map((role) => ({
    label: role.role.toUpperCase(),
    Count: role.total,
  }));
  const subByDeptData = chartData?.subjectsByDepartment.map((dept) => ({
    label: dept.departmentName.toUpperCase(),
    Count: dept.totalSubjects,
  }));
  const classesBySubjectData = chartData?.classesBySubject.map((sub) => {
    return {
      label: sub.subjectName.toUpperCase(),
      Count: sub.totalClasses,
    };
  });
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
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="label" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Count" radius={[10, 10, 0, 0]} />

        <RechartsDevtools />
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
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="label" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Count" radius={[10, 10, 0, 0]} />

        <RechartsDevtools />
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
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="label" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Count" radius={[10, 10, 0, 0]} />

        <RechartsDevtools />
      </BarChart>
    </div>
  );
};

export default AdminChart;
