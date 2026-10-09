"use client";
import UserAvatarNav, { DrawerAvatar } from "@/components/userAvatar";
import { useSession } from "@/lib/authClient";
import { House, Users } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = { children: ReactNode };

function layout({ children }: Props) {
  let links;
  const { data: session } = useSession();

  const role = session?.user?.role;
  switch (role) {
    case "admin":
      links = [
        {
          name: "landing",
          href: "/admin/landing",
          icon: <House />,
        },
        {
          name: "users",
          href: "/admin/users",
          icon: <Users />,
        },
      ];
      break;
    case "teacher":
      links = [
        {
          name: "landing",
          href: "/teacher/landing",
          icon: null,
        },
        {
          name: "placeholder",
          href: "#",
          icon: null,
        },
      ];
      break;
    case "student":
      links = [
        {
          name: "landing",
          href: "/student/landing",
          icon: null,
        },
        {
          name: "placeholder",
          href: "#",
          icon: null,
        },
      ];
      break;
    default:
      break;
  }
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle inline"
      />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full glass-morphism">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost drawer-button"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="navbar-start px-4">Unidash</div>
          <div className="navbar-end">
            <UserAvatarNav />
          </div>
        </nav>
        {/* Page content here */}
        <div className="m-2 p-2">{children}</div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start glass-morphism is-drawer-close:w-14">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            {links?.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right capitalize"
                  data-tip={link.name}
                >
                  {link.icon}
                  <span className="is-drawer-close:hidden">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4">
            <DrawerAvatar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default layout;
