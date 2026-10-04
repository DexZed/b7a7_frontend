import SkeletonBanner, {
  SkeletonCards,
  SkeletonContent,
} from "@/components/skeletons";
import { Suspense } from "react";

type Props = {};

function AdminLandingPage({}: Props) {
  return (
    <>
      <section className="min-h-screen w-full">
        <Suspense fallback={<SkeletonBanner />}>
          <div></div>
        </Suspense>
        <Suspense fallback={<SkeletonCards count={8} />}>
          <div></div>
        </Suspense>
      </section>
    </>
  );
}

export default AdminLandingPage;
