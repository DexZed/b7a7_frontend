import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://b7a6-fieser-management.onrender.com/api",
});

export const { signIn, signUp, signOut, useSession } = authClient;
