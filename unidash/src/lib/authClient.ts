import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://b7a6-fieser-management.onrender.com/api",
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
