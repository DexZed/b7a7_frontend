"use client";
import { signOut, useSession } from "@/lib/authClient";
import Link from "next/link";

type Props = {};

function Navbar({}: Props) {
  const user = useSession();
  function getInitials(name: string | undefined) {
    let initials;
    if (name?.split(" ").length === undefined) {
      initials = "U";
    } else if (name?.split(" ").length! > 1) {
      initials =
        name?.split(" ")[0][0] +
        name?.split(" ")[name?.split(" ").length - 1][0]!;
    } else {
      initials = name?.[0];
    }
    return initials?.toUpperCase();
  }
  const links = (
    <>
      <li>
        <Link href="/guest-login" className="btn btn-outline btn-ghost">
          Guest Portal
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar shadow-sm glass-morphism">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Unidash</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user.data ? (
          <>
            <button
              className="btn btn-outline btn-ghost"
              onClick={() => signOut()}
            >
              Logout
            </button>
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-sm">
                  {getInitials(user.data?.user.name!)}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link href={"/login"} className="btn btn-outline btn-ghost">
              Login
            </Link>
            <Link href={"/registration"} className="btn btn-outline btn-ghost">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
