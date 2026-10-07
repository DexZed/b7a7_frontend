"use server";
import { env } from "process";

export async function apiFetch<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  console.log(response);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "API request failed");
  }

  return result;
}
