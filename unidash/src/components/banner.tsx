"use client";
import { useSession } from "@/lib/authClient";

import SkeletonBanner from "./skeletons";
import { cn } from "@/lib/utils";

type Props = {
  description: string;
  headingClass?: string;
  descriptionClass?: string;
};
function Banner({ description, headingClass, descriptionClass }: Props) {
  const { data: session, isPending } = useSession();
  if (isPending) return <SkeletonBanner />;
  return (
    <>
      <div className="hero glass-morphism">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className={cn("text-5xl font-bold", headingClass)}>
              Welcome {session?.user.name}
            </h1>
            <p className={cn("py-6", descriptionClass)}>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
