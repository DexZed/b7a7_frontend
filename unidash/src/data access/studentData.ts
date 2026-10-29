"use server";
import { apiFetch } from "@/lib/api-fetch";
import { revalidatePath } from "next/cache";
import { ClassesFullSchema, PaginatedResponse, Response } from "@/lib/types";

export async function getEnrolledClasses(
  token: string,
  queryObj?: { page?: number; limit?: number; search?: string },
): Promise<PaginatedResponse<ClassesFullSchema>> {
  const dynamicQueryString = new URLSearchParams();
  if (queryObj) {
    const { page, limit, search } = queryObj;
    if (page) dynamicQueryString.append("page", page.toString());
    if (limit) dynamicQueryString.append("limit", limit.toString());
    if (search) dynamicQueryString.append("search", search);
  }
  const queryString = dynamicQueryString.toString();
  const endpoint = queryString
    ? `/api/enrolments/enrolled?${queryString}`
    : `/api/enrolments/enrolled`;

  const result = await apiFetch<PaginatedResponse<ClassesFullSchema>>(
    endpoint,
    token,
  );
  return result;
}
export async function getUnenrolledClasses(
  token: string,
  queryObj?: { page?: number; limit?: number; search?: string },
): Promise<PaginatedResponse<ClassesFullSchema>> {
  const dynamicQueryString = new URLSearchParams();
  if (queryObj) {
    const { page, limit, search } = queryObj;
    if (page) dynamicQueryString.append("page", page.toString());
    if (limit) dynamicQueryString.append("limit", limit.toString());
    if (search) dynamicQueryString.append("search", search);
  }
  const queryString = dynamicQueryString.toString();
  const endpoint = queryString
    ? `/api/enrolments/unenrolled?${queryString}`
    : `/api/enrolments/unenrolled`;

  const result = await apiFetch<PaginatedResponse<ClassesFullSchema>>(
    endpoint,
    token,
  );
  return result;
}
