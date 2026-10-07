"use client";
import { useSession } from "@/lib/authClient";

function Banner({ description }: { description: string }) {
  const user = useSession();
  return (
    <>
      <div className="hero glass-morphism">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Welcome {user.data?.user.name}
            </h1>
            <p className="py-6">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
