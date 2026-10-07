"use server";
import { Response } from "@/lib/types";
import { DashboardStats } from "@/lib/types";
import { apiFetch } from "@/lib/api-fetch";

export async function getDashboardStats(
  token: string,
): Promise<Response<DashboardStats>> {
  const result = await apiFetch<Response<DashboardStats>>(
    "/stats/overview",
    token,
  );

  return result;
}
