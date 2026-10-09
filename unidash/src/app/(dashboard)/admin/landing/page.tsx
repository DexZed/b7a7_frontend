"use client";
import Banner from "@/components/banner";
import AdminStats from "../_components/stats";
import AdminCharts from "../_components/chart";
import LatestStats from "../_components/latest";
import { useSession } from "@/lib/authClient";
import { redirect } from "next/navigation";
import { SkeletonContent } from "@/components/skeletons";

type Props = {};

function AdminLandingPage({}: Props) {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <SkeletonContent width={"w-full"} height={"min-h-screen"} />;
  }
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <section className="min-h-screen w-full">
        <Banner description="Here you can manage all the activities of the university. You can add new students, faculty members, courses, and manage all the other activities of the university." />
        <AdminStats />
        <AdminCharts />
        <LatestStats />
      </section>
    </>
  );
}

export default AdminLandingPage;
