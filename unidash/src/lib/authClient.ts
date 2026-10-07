import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "./validate";

export const authClient = createAuthClient({
  baseURL: `${env.NEXT_PUBLIC_BACKEND_URL!}/api/auth`,
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: ["student", "teacher", "admin"],
          required: true,
          defaultValue: "student",
          input: true, // Allow role to be set during registration
        },
        imageCldPubId: {
          type: "string",
          required: false,
          input: true, // Allow imageCldPubId to be set during registration
        },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
