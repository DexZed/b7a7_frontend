"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/authClient";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";

const signInSchema = z.object({
  email: z.string("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type SignInSchema = z.infer<typeof signInSchema>;

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const submitHandler = async (data: SignInSchema) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          showSuccessAlert("Login", "You logged in successfully");
          // TODO: Conditional Routing based on role
          router.push("/");
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
  };

  return (
    <>
      <div className="glass-morphism max-w-md w-3xl p-5 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-muted-foreground">Welcome Back!</p>
        </div>
        <div className="py-4 flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col justify-center items-center gap-2 pl-15 pb-7">
              <fieldset className="fieldset w-96">
                <legend className="fieldset-legend capitalize ">email</legend>
                <input
                  {...register("email")}
                  name="email"
                  type="text"
                  className="input"
                  placeholder="Enter Your Email"
                />
                {errors.email && (
                  <span className="label text-red-500">
                    {String(errors.email?.message)}
                  </span>
                )}
              </fieldset>
              <fieldset className="fieldset w-96">
                <legend className="fieldset-legend capitalize ">
                  password
                </legend>
                <input
                  {...register("password")}
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Enter Your Password"
                />
                {errors.password && (
                  <span className="label text-red-500">
                    {String(errors.password?.message)}
                  </span>
                )}
              </fieldset>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="w-80 btn btn-info btn-outline">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
