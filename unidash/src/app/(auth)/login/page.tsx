"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/authClient";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";
import PageHeading from "@/components/pageHeading";
import FormBody, {
  FormErrors,
  FormFieldset,
  FormInput,
} from "@/components/form";

const signInSchema = z.object({
  email: z.string("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type SignInSchema = z.infer<typeof signInSchema>;

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        onSuccess: (ctx) => {
          showSuccessAlert("Login", "You logged in successfully");
          const role = ctx.data?.user?.role;
          switch (role) {
            case "admin":
              router.push("/admin/landing");
              break;
            case "teacher":
              router.push("/teacher/landing");
              break;
            case "student":
              router.push("/student/landing");
              break;
            default:
              router.push("/");
              break;
          }
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
          <PageHeading title="Login" />
          <p className="text-muted-foreground">Welcome Back!</p>
        </div>
        <FormBody onSubmit={handleSubmit(submitHandler)}>
          <FormFieldset legend="Login Form">
            <FormInput
              name="email"
              type="email"
              label="Email"
              register={register}
              placeholder="Enter Your Email"
              className="glass-morphism"
            />
            <FormErrors errors={errors.email?.message} />
            <FormInput
              name="password"
              type="password"
              label="Password"
              register={register}
              placeholder="Enter Your Password"
              className="glass-morphism"
            />
            <FormErrors errors={errors.password?.message} />
            <div className="flex justify-end m-2">
              <button
                type="submit"
                className="glass-morphism px-4 py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-infinity loading-xl"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </FormFieldset>
        </FormBody>
      </div>
    </>
  );
}

export default LoginPage;
