"use server";
import { env } from "process";

export async function apiFetch<T>(
  endpoint: string,
  token: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(
    `https://b7a6-fieser-management.onrender.com${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    },
  );
  const result = await response.json();

  if (!response.ok) {
    console.error("Error", result);
  }

  return result;
}
