"use client";
import Form from "@/components/form";
import { signUpSchema } from "@/lib/schemas";

type Props = {};

function RegistrationPage({}: Props) {
  return (
    <Form
      type="Registration"
      description="Create a new account"
      schema={signUpSchema}
      defaultValues={{
        name: "",
        email: "",
        password: "",
        role: "",
      }}
      onSubmit={async () => {
        return { success: true };
      }}
    />
  );
}

export default RegistrationPage;
