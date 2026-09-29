import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
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
