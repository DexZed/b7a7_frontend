"use server";
import {
  ChartData,
  Department,
  LatestData,
  PaginatedResponse,
  Response,
  Subject,
  User,
} from "@/lib/types";
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

export async function getAllUsers(
  token: string,
  queryObj?: { page?: number; limit?: number; search?: string; role?: string },
): Promise<PaginatedResponse<User>> {
  const dynamicQueryString = new URLSearchParams();
  if (queryObj) {
    const { page, limit, search, role } = queryObj;
    if (page) dynamicQueryString.append("page", page.toString());
    if (limit) dynamicQueryString.append("limit", limit.toString());
    if (search) dynamicQueryString.append("search", search);
    if (role) dynamicQueryString.append("role", role);
  }
  const queryString = dynamicQueryString.toString();
  const endpoint = queryString ? `/api/users?${queryString}` : `/api/users`;

  const result = await apiFetch<PaginatedResponse<User>>(endpoint, token);
  return result;
}

export async function getUserDepartmentsById(
  token: string,
  id: string,
  queryObj?: { page?: number; limit?: number },
): Promise<PaginatedResponse<Department>> {
  const dynamicQueryString = new URLSearchParams();
  if (queryObj) {
    const { page, limit } = queryObj;
    if (page) dynamicQueryString.append("page", page.toString());
    if (limit) dynamicQueryString.append("limit", limit.toString());
  }
  const queryString = dynamicQueryString.toString();
  const endpoint = queryString
    ? `/api/users/${id}/departments?${queryString}`
    : `/api/users/${id}/departments`;

  const result = await apiFetch<PaginatedResponse<Department>>(endpoint, token);
  return result;
}

export async function getUserSubjectsById(
  token: string,
  id: string,
  queryObj?: { page?: number; limit?: number },
): Promise<PaginatedResponse<Subject>> {
  const dynamicQueryString = new URLSearchParams();
  if (queryObj) {
    const { page, limit } = queryObj;
    if (page) dynamicQueryString.append("page", page.toString());
    if (limit) dynamicQueryString.append("limit", limit.toString());
  }
  const queryString = dynamicQueryString.toString();
  const endpoint = queryString
    ? `/api/users/${id}/subjects?${queryString}`
    : `/api/users/${id}/subjects`;

  const result = await apiFetch<PaginatedResponse<Subject>>(endpoint, token);
  return result;
}
