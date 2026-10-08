"use server";
import { ChartData, LatestData, Response } from "@/lib/types";
import { DashboardStats } from "@/lib/types";
import { apiFetch } from "@/lib/api-fetch";

export async function getDashboardStats(
  token: string,
): Promise<Response<DashboardStats>> {
  const result = await apiFetch<Response<DashboardStats>>(
    "/api/stats/overview",
    token,
  );

  return result;
}

export async function heathCheck() {
  const result = await fetch(
    "https://b7a6-fieser-management.onrender.com/api/test",
  );
  const json = await result.json();
  console.log("hosted:", json);
  return json;
}

export async function heathCheck2() {
  const result = await fetch("http://localhost:3001/api/test");
  const json = await result.json();
  console.log("local:", json);
  return json;
}
export async function getChartData(
  token: string,
): Promise<Response<ChartData>> {
  const result = await apiFetch<Response<ChartData>>(
    "/api/stats/charts",
    token,
  );

  return result;
}
export async function getlatest(token: string): Promise<Response<LatestData>> {
  const result = await apiFetch<Response<LatestData>>(
    "/api/stats/latest",
    token,
  );

  return result;
}
