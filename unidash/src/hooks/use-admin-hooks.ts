"use client";

import {
  getDashboardStats,
  getChartData,
  getlatest,
  getAllUsers,
  getUserDepartmentsById,
  getUserSubjectsById,
} from "@/data access/adminData";
import { useQuery } from "@tanstack/react-query";

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

// Dashboard overview
export function useDashboardStats(token: string) {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => getDashboardStats(token),
    enabled: Boolean(token),
  });
}

// Dashboard charts
export function useChartData(token: string) {
  return useQuery({
    queryKey: ["dashboard", "charts"],
    queryFn: () => getChartData(token),
    enabled: Boolean(token),
  });
}

// Latest dashboard data
export function useLatestData(token: string) {
  return useQuery({
    queryKey: ["dashboard", "latest"],
    queryFn: () => getlatest(token),
    enabled: Boolean(token),
  });
}

// Paginated, searchable, filterable users
export function useUsers(token: string, queryObj: UserQuery = {}) {
  const { page, limit, search, role } = queryObj;

  return useQuery({
    queryKey: ["users", { page, limit, search, role }],
    queryFn: () => getAllUsers(token, { page, limit, search, role }),
    enabled: Boolean(token),
    placeholderData: (previousData) => previousData,
  });
}

// Departments belonging to a user
export function useUserDepartments(
  token: string,
  id: string,
  queryObj: PaginationQuery = {},
) {
  const { page, limit } = queryObj;

  return useQuery({
    queryKey: ["users", id, "departments", { page, limit }],
    queryFn: () => getUserDepartmentsById(token, id, { page, limit }),
    enabled: Boolean(token) && Boolean(id),
    placeholderData: (previousData) => previousData,
  });
}

// Subjects belonging to a user
export function useUserSubjects(
  token: string,
  id: string,
  queryObj: PaginationQuery = {},
) {
  const { page, limit } = queryObj;

  return useQuery({
    queryKey: ["users", id, "subjects", { page, limit }],
    queryFn: () => getUserSubjectsById(token, id, { page, limit }),
    enabled: Boolean(token) && Boolean(id),
    placeholderData: (previousData) => previousData,
  });
}
