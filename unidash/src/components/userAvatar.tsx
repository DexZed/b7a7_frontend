"use client";
import { signOut, useSession } from "@/lib/authClient";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

function UserAvatarNav() {
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
  return (
    <>
      {user.data ? (
        <>
          <button
            className="btn btn-outline btn-ghost"
            onClick={async () => {
              await signOut();
              redirect("/login");
            }}
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
    </>
  );
}

export default UserAvatarNav;

export function DrawerAvatar() {
  const user = useSession();

  return (
    <>
      {user.data ? (
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <span className="text-sm">
              {getInitials(user.data?.user.name!)}
            </span>
          </div>
        </div>
      ) : (
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <span className="text-sm">U</span>
          </div>
        </div>
      )}
    </>
  );
}
