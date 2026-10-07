"use server";
import { Response } from "@/lib/types";
import { DashboardStats } from "@/lib/types";

export async function getDashboardStats(
  token: string,
): Promise<Response<DashboardStats>> {
  try {
    const result = await fetch(
      "https://b7a6-fieser-management.onrender.com/api/stats/overview",

      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return result.json() as Promise<Response<DashboardStats>>;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
