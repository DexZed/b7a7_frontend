"use client";
import { useSession } from "@/lib/authClient";
import { SkeletonContent } from "@/components/skeletons";
import { redirect } from "next/navigation";

function TeacherLandingPage() {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <SkeletonContent width={"w-full"} height={"min-h-screen"} />;
  }
  if (!session) {
    redirect("/login");
  }
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <section className="min-h-screen"></section>
    </>
  );
}

export default TeacherLandingPage;
