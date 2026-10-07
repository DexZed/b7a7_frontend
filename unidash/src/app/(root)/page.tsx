import Link from "next/link";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome</h1>
            <p className="py-6">
              A high-performance Custom stack (PostgreSQL, NestJs) academic hub.
              This multi-role system (Admin, Teacher, Student) utilizes a
              decoupled architecture where an NestJs backend serves a modular
              routes.
            </p>
            <div className="flex justify-evenly items-center">
              <Link href={"/login"} className="btn btn-ghost btn-outline  w-40">
                Login
              </Link>
              <Link
                href={"/register"}
                className="btn btn-ghost btn-outline w-40"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
