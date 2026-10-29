"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEnrolledClasses,
  getUnenrolledClasses,
} from "@/data access/studentData";
//  Query Hooks

export const queryKeys = {
  student: {
    enrolledClasses: (queryObj?: any) => ["enrolledClasses", queryObj] as const,
    unenrolledClasses: (queryObj?: any) =>
      ["unenrolledClasses", queryObj] as const,
  },
};

// Enrolment Hooks
export function useEnrolledClasses(
  token: string,
  queryObj?: {
    page?: number;
    limit?: number;
    search?: string;
  },
) {
  return useQuery({
    queryKey: queryKeys.student.enrolledClasses(queryObj),
    queryFn: () => getEnrolledClasses(token, queryObj),
    enabled: !!token,
  });
}

export function useUnenrolledClasses(
  token: string,
  queryObj?: {
    page?: number;
    limit?: number;
    search?: string;
  },
) {
  return useQuery({
    queryKey: queryKeys.student.unenrolledClasses(queryObj),
    queryFn: () => getUnenrolledClasses(token, queryObj),
    enabled: !!token,
  });
}
