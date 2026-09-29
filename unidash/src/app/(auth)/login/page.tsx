"use client";
import Form from "@/components/form";
import { signInSchema } from "@/lib/schemas";

type Props = {};

function LoginPage({}: Props) {
  return (
    <Form
      type="Log In"
      description="Welcome back"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={async () => {
        return { success: true };
      }}
    />
  );
}

export default LoginPage;
