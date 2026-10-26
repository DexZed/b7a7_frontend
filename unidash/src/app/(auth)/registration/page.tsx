"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/authClient";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";
import PageHeading from "@/components/pageHeading";
import FormBody, {
  FormFieldset,
  FormErrors,
  FormInput,
  FormSelect,
} from "@/components/form";

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
    formState: { errors, isSubmitting },
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
          <PageHeading title="Registration" />
          <p className="text-muted-foreground">
            Create a new account to get started.
          </p>
        </div>
        <FormBody onSubmit={handleSubmit(submitHandler)}>
          <FormFieldset legend="Registration Form">
            <FormInput
              name="firstName"
              type="text"
              label="First Name"
              register={register}
              placeholder="Enter Your First Name"
              className="glass-morphism"
            />
            <FormErrors errors={errors.firstName?.message} />
            <FormInput
              name="lastName"
              type="text"
              label="Last Name"
              register={register}
              placeholder="Enter Your Last Name"
              className="glass-morphism"
            />
            <FormErrors errors={errors.lastName?.message} />
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
            <FormSelect
              name="role"
              label="Role"
              register={register}
              options={["admin", "teacher", "student"].map((r) => ({
                label: r.charAt(0).toUpperCase() + r.slice(1),
                value: r,
              }))}
              className="glass-morphism"
            />
            <FormErrors errors={errors.role?.message} />
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

export default RegistrationPage;
