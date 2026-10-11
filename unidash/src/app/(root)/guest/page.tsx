"use client";

import Navbar from "@/components/navbar";
import PageHeading from "@/components/pageHeading";
import { signIn } from "@/lib/authClient";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

function GuestLogin() {
  const router = useRouter();
  const roles = [
    {
      name: "Admin",
      redirect: "admin/landing",
      description: "Login As An Admin",
    },
    {
      name: "Student",
      redirect: "/student/landing",
      description: "Take A Tour As A Student",
    },
    {
      name: "Teacher",
      redirect: "/teacher/landing",
      description: "See All The Faculty Services We Provide",
    },
  ];
  async function handleGuestLogin(role: string) {
    const roleType = role.toLowerCase();
    let data;
    switch (roleType) {
      case "admin":
        data = { email: "houston92@hotmail.com", password: "123456789" };
        break;
      case "teacher":
        data = { email: "justyn.sipes1@yahoo.com", password: "123456789" };
        break;
      case "student":
        data = { email: "timmy42@yahoo.com", password: "123456789" };
        break;
      default:
        break;
    }
    await signIn.email(
      {
        email: data?.email as string,
        password: data?.password as string,
      },
      {
        onSuccess: (ctx) => {
          showSuccessAlert("Login", "You logged in successfully");
          const role = ctx.data?.user?.role;
          router.push(`${roleType}/landing`);
        },
        onError: (error) => {
          showErrorAlert("Error logging in", String(error?.error?.message));
          console.error(
            "Error in Login ",
            error?.error?.message || "Something went wrong",
          );
        },
      },
    );
  }
  return (
    <>
      <Navbar />

      <section className="min-h-screen flex flex-col gap-5 items-center p-5">
        <PageHeading title="Select Role To Login" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-evenly gap-4 p-4"
        >
          {roles?.map((role, index) => (
            <div
              key={index}
              className="card w-96 glass-morphism card-xl shadow-sm"
            >
              <div className="card-body ">
                <div className="flex flex-col justify-center items-center">
                  <h2 className="card-title my-2">{role.name}</h2>
                  <p className="my-2">{role.description}</p>

                  <button
                    onClick={() => handleGuestLogin(role.name)}
                    className="btn btn-accent btn-outline w-full my-5"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

export default GuestLogin;
