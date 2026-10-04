"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/authClient";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["admin", "teacher", "student"]).default("student").optional(),
});
type SignUpSchema = z.infer<typeof signUpSchema>;

function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  const router = useRouter();

  const submitHandler = async (data: SignUpSchema) => {
    const name = data.firstName.concat(" ").concat(data.lastName);

    await signUp.email(
      {
        name: name,
        email: data.email,
        password: data.password,
        role: data.role! as "admin" | "teacher" | "student",
      },
      {
        onSuccess: () => {
          showSuccessAlert(
            "User created successfully",
            "You can now login to your account",
          );
          router.push("/login");
        },
        onError: (error) => {
          showErrorAlert("Error creating user", String(error?.error?.message));
          console.error(
            "Error in Signup ",
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
          <h1 className="text-2xl font-semibold">Registration</h1>
          <p className="text-muted-foreground">
            Create a new acciunt to ger started.
          </p>
        </div>
        <div className="py-4 flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col justify-center items-center gap-2 pl-15 pb-7">
              <fieldset className="fieldset w-96">
                <legend className="fieldset-legend capitalize ">
                  firstName
                </legend>
                <input
                  name="firstName"
                  type="text"
                  className="input"
                  placeholder="Enter Your First Name"
                />
                {errors.firstName && (
                  <span className="label text-red-500">
                    {String(errors.firstName?.message)}
                  </span>
                )}
              </fieldset>
              <fieldset className="fieldset w-96">
                <legend className="fieldset-legend capitalize ">
                  lastName
                </legend>
                <input
                  name="lastName"
                  type="text"
                  className="input"
                  placeholder="Enter Your Last Name"
                />
                {errors.lastName && (
                  <span className="label text-red-500">
                    {String(errors.lastName?.message)}
                  </span>
                )}
              </fieldset>
              <fieldset className="fieldset w-96">
                <legend className="fieldset-legend capitalize ">email</legend>
                <input
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
              <fieldset className="fieldset w-96">
                <legend className="fieldset-legend capitalize ">role</legend>
                <select
                  defaultValue="student"
                  {...register("role")}
                  className="select"
                >
                  <option disabled={true}>Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
                {errors.role && (
                  <span className="label text-red-500">
                    {String(errors.role?.message)}
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

export default RegistrationPage;
