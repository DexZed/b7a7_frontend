"use client";
import { useSession } from "@/lib/authClient";

import SkeletonBanner from "./skeletons";

function Banner({ description }: { description: string }) {
  const { data: session, isPending } = useSession();
  if (isPending) return <SkeletonBanner />;
  return (
    <>
      <div className="hero glass-morphism">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome {session?.user.name}</h1>
            <p className="py-6">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
