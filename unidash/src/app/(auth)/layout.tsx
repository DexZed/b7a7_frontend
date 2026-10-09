"use client";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

type Props = { children: ReactNode };

function layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <section className="flex justify-center items-center min-h-screen">
        <div>{children}</div>
      </section>
    </>
  );
}

export default layout;
