import Banner from "@/components/banner";
import { SkeletonContent } from "@/components/skeletons";
import { Suspense } from "react";
import AdminStats from "./_components/stats";
import AdminCharts from "./_components/chart";

type Props = {};

function AdminLandingPage({}: Props) {
  return (
    <>
      <section className="min-h-screen w-full">
        <Banner description="Here you can manage all the activities of the university. You can add new students, faculty members, courses, and manage all the other activities of the university." />
        <AdminStats />

        <Suspense fallback={<SkeletonContent />}>
          <AdminCharts />
        </Suspense>
      </section>
    </>
  );
}

export default AdminLandingPage;
