import type {
  ChartData,
  Department,
  LatestData,
  PaginatedResponse,
  Response,
  Subject,
  User,
} from "@/lib/types";
import type { DashboardStats } from "@/lib/types";
import { apiFetch } from "@/lib/api-fetch";

export async function getDashboardStats(
  token: string,
): Promise<Response<DashboardStats>> {
  return apiFetch("/api/stats/overview", token);
}

export async function getChartData(
  token: string,
): Promise<Response<ChartData>> {
  return apiFetch("/api/stats/charts", token);
}

export async function getlatest(token: string): Promise<Response<LatestData>> {
  return apiFetch("/api/stats/latest", token);
}

export async function healthCheck() {
  return apiFetch("/api/test");
}

type UserQuery = {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
};

type PaginationQuery = {
  page?: number;
  limit?: number;
};

function buildQueryString(params: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export async function getAllUsers(
  token: string,
  queryObj: UserQuery = {},
): Promise<PaginatedResponse<User>> {
  const query = buildQueryString(queryObj);

  return apiFetch(`/api/users${query}`, token);
}

export async function getUserDepartmentsById(
  token: string,
  id: string,
  queryObj: PaginationQuery = {},
): Promise<PaginatedResponse<Department>> {
  const query = buildQueryString(queryObj);

  return apiFetch(
    `/api/users/${encodeURIComponent(id)}/departments${query}`,
    token,
  );
}

export async function getUserSubjectsById(
  token: string,
  id: string,
  queryObj: PaginationQuery = {},
): Promise<PaginatedResponse<Subject>> {
  const query = buildQueryString(queryObj);

  return apiFetch(
    `/api/users/${encodeURIComponent(id)}/subjects${query}`,
    token,
  );
}
