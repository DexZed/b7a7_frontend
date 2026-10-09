"use client";
import Navbar from "@/components/navbar";
import { signIn } from "@/lib/authClient";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";
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
        data = { email: "admin@gmail.com", password: "123456789" };
        break;
      case "teacher":
        data = { email: "teacher@gmail.com", password: "123456789" };
        break;
      case "student":
        data = { email: "student@gmail.com", password: "123456789" };
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
      <section className="min-h-screen flex flex-col gap-5">
        <h1 className="text-3xl text-center m-3">Select Role Log in Type</h1>
        <div className="flex justify-evenly gap-4 p-4">
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
        </div>
      </section>
    </>
  );
}

export default GuestLogin;
