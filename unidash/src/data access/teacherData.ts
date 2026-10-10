"use server";
import { apiFetch } from "@/lib/api-fetch";
import {
  Class,
  ClassesFullSchema,
  Department,
  PaginatedResponse,
  Response,
  Subject,
  SubjectResponse,
  User,
} from "@/lib/types";
import { revalidatePath } from "next/cache";

// Department Data Access

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

// Classes Data Access

export async function getAllClasses(
  token: string,
  queryObj?: {
    page?: number;
    limit?: number;
    search?: string;
    teacherName?: string;
    subjectName?: string;
  },
): Promise<PaginatedResponse<Class>> {
  const dynamicQueryString = new URLSearchParams();
  if (queryObj) {
    const { page, limit, search, teacherName, subjectName } = queryObj;
    if (page) dynamicQueryString.append("page", page.toString());
    if (limit) dynamicQueryString.append("limit", limit.toString());
    if (search) dynamicQueryString.append("search", search);
    if (teacherName) dynamicQueryString.append("teacherName", teacherName);
    if (subjectName) dynamicQueryString.append("subjectName", subjectName);
  }
  const queryString = dynamicQueryString.toString();
  const endpoint = queryString ? `/api/classes?${queryString}` : `/api/classes`;

  const result = await apiFetch<PaginatedResponse<Class>>(endpoint, token);
  return result;
}

export async function createClass(
  token: string,
  classData: {
    subjectId: number;
    teacherId: string;
    name: string;
    price: number;
    currency: string;
    capacity: number;
    description: string;
  },
): Promise<void> {
  const endpoint = `/api/classes`;
  await apiFetch<Class>(endpoint, token, {
    method: "POST",
    body: JSON.stringify(classData),
  });
  revalidatePath("/teacher/classes");
}

export async function getClassStudentsById(
  token: string,
  id: string,
): Promise<Response<User[]>> {
  const endpoint = `/api/classes/${id}/users?role=student`;

  const result = await apiFetch<Response<User[]>>(endpoint, token);
  return result;
}
export async function getClassById(
  token: string,
  id: string,
): Promise<Response<ClassesFullSchema>> {
  const endpoint = `/api/classes/${id}`;

  const result = await apiFetch<Response<ClassesFullSchema>>(endpoint, token);
  return result;
}

// Subjects Data Access
export async function getAllSubjects(
  token: string,
  queryObj?: {
    page?: number;
    limit?: number;
    search?: string;
    departmentName?: string;
  },
): Promise<PaginatedResponse<Subject>> {
  const dynamicQueryString = new URLSearchParams();
  if (queryObj) {
    const { page, limit, search, departmentName } = queryObj;
    if (page) dynamicQueryString.append("page", page.toString());
    if (limit) dynamicQueryString.append("limit", limit.toString());
    if (search) dynamicQueryString.append("search", search);
    if (departmentName)
      dynamicQueryString.append("departmentName", departmentName);
  }
  const queryString = dynamicQueryString.toString();
  const endpoint = queryString
    ? `/api/subjects?${queryString}`
    : `/api/subjects`;

  const result = await apiFetch<PaginatedResponse<Subject>>(endpoint, token);
  return result;
}
export async function getsubjectById(
  token: string,
  id: string,
): Promise<Response<SubjectResponse>> {
  const endpoint = `/api/subjects/${id}`;

  const result = await apiFetch<Response<SubjectResponse>>(endpoint, token);
  return result;
}
export async function getClassesBySubjectId(
  token: string,
  id: string,
): Promise<Response<Class[]>> {
  const endpoint = `/api/subjects/${id}/classes`;

  const result = await apiFetch<Response<Class[]>>(endpoint, token);
  return result;
}
export async function getTeachersBySubjectId(
  token: string,
  id: string,
): Promise<Response<User[]>> {
  const endpoint = `/api/subjects/${id}/users?role=teacher`;

  const result = await apiFetch<Response<User[]>>(endpoint, token);
  return result;
}
export async function createSubject(
  token: string,
  subjectData: {
    name: string;
    code: string;
    description: string;
    departmentId: number;
  },
) {
  const endpoint = `/api/subjects`;
  await apiFetch<Subject>(endpoint, token, {
    method: "POST",
    body: JSON.stringify(subjectData),
  });
  revalidatePath("/teacher/subjects");
}
