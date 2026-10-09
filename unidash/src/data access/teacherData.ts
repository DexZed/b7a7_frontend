"use server";
import { apiFetch } from "@/lib/api-fetch";
import {
  Class,
  ClassesFullSchema,
  Department,
  PaginatedResponse,
  Response,
  Subject,
  User,
} from "@/lib/types";
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

export async function getDepartmentSubjectsById(
  token: string,
  id: string,
): Promise<Response<Subject[]>> {
  const endpoint = `/api/departments/${id}/subjects`;

  const result = await apiFetch<Response<Subject[]>>(endpoint, token);
  return result;
}

export async function getDepartmentClassesById(
  token: string,
  id: string,
): Promise<Response<ClassesFullSchema[]>> {
  const endpoint = `/api/departments/${id}/classes`;

  const result = await apiFetch<Response<ClassesFullSchema[]>>(endpoint, token);
  return result;
}
export async function getDepartmentUsersById(
  token: string,
  id: string,
): Promise<Response<User[]>> {
  const endpoint = `/api/departments/${id}/users?role=teacher`;

  const result = await apiFetch<Response<User[]>>(endpoint, token);
  return result;
}
