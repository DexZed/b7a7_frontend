"use server";
import { apiFetch } from "@/lib/api-fetch";
import { Department, PaginatedResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function getAllDepartments(
  token: string,
  queryObj?: { page?: number; limit?: number; search?: string },
): Promise<PaginatedResponse<Department>> {
  const dynamicQueryString = new URLSearchParams();
  if (queryObj) {
    const { page, limit, search } = queryObj;
    if (page) dynamicQueryString.append("page", page.toString());
    if (limit) dynamicQueryString.append("limit", limit.toString());
    if (search) dynamicQueryString.append("search", search);
  }
  const queryString = dynamicQueryString.toString();
  const endpoint = queryString
    ? `/api/departments?${queryString}`
    : `/api/departments`;

  const result = await apiFetch<PaginatedResponse<Department>>(endpoint, token);
  return result;
}

export async function createDepartment(
  token: string,
  department: { name: string; description: string; code: string },
): Promise<void> {
  const endpoint = `/api/departments`;
  await apiFetch<Department>(endpoint, token, {
    method: "POST",
    body: JSON.stringify(department),
  });
  revalidatePath("/teacher/departments");
}
