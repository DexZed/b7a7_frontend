"use client";

import {
  getAllDepartments,
  createDepartment,
  getDepartmentSubjectsById,
  getDepartmentClassesById,
  getDepartmentUsersById,
  getAllClasses,
  createClass,
  getClassStudentsById,
  getClassById,
  getAllSubjects,
  getsubjectById,
  getClassesBySubjectId,
  getTeachersBySubjectId,
  createSubject,
} from "@/data access/teacherData";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

//  Query Hooks

export const queryKeys = {
  departments: {
    all: (queryObj?: any) => ["departments", queryObj] as const,
    subjects: (id: string) => ["departments", id, "subjects"] as const,
    classes: (id: string) => ["departments", id, "classes"] as const,
    users: (id: string) => ["departments", id, "users"] as const,
  },
  classes: {
    all: (queryObj?: any) => ["classes", queryObj] as const,
    detail: (id: string) => ["classes", id] as const,
    students: (id: string) => ["classes", id, "students"] as const,
  },
  subjects: {
    all: (queryObj?: any) => ["subjects", queryObj] as const,
    detail: (id: string) => ["subjects", id] as const,
    classes: (id: string) => ["subjects", id, "classes"] as const,
    teachers: (id: string) => ["subjects", id, "teachers"] as const,
  },
};

//  Department Hooks

export function useDepartments(
  token: string,
  queryObj?: { page?: number; limit?: number; search?: string },
) {
  return useQuery({
    queryKey: queryKeys.departments.all(queryObj),
    queryFn: () => getAllDepartments(token, queryObj),
    enabled: !!token,
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      token,
      department,
    }: {
      token: string;
      department: { name: string; description: string; code: string };
    }) => createDepartment(token, department),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}

export function useDepartmentSubjects(token: string, id: string) {
  return useQuery({
    queryKey: queryKeys.departments.subjects(id),
    queryFn: () => getDepartmentSubjectsById(token, id),
    enabled: !!token && !!id,
  });
}

export function useDepartmentClasses(token: string, id: string) {
  return useQuery({
    queryKey: queryKeys.departments.classes(id),
    queryFn: () => getDepartmentClassesById(token, id),
    enabled: !!token && !!id,
  });
}

export function useDepartmentUsers(token: string, id: string) {
  return useQuery({
    queryKey: queryKeys.departments.users(id),
    queryFn: () => getDepartmentUsersById(token, id),
    enabled: !!token && !!id,
  });
}

//  Class Hooks

export function useClasses(
  token: string,
  queryObj?: {
    page?: number;
    limit?: number;
    search?: string;
    teacherName?: string;
    subjectName?: string;
  },
) {
  return useQuery({
    queryKey: queryKeys.classes.all(queryObj),
    queryFn: () => getAllClasses(token, queryObj),
    enabled: !!token,
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      token,
      classData,
    }: {
      token: string;
      classData: {
        subjectId: number;
        teacherId: string;
        name: string;
        price: number;
        currency: string;
        capacity: number;
        description: string;
      };
    }) => createClass(token, classData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
}

export function useClassStudents(token: string, id: string) {
  return useQuery({
    queryKey: queryKeys.classes.students(id),
    queryFn: () => getClassStudentsById(token, id),
    enabled: !!token && !!id,
  });
}

export function useClassById(token: string, id: string) {
  return useQuery({
    queryKey: queryKeys.classes.detail(id),
    queryFn: () => getClassById(token, id),
    enabled: !!token && !!id,
  });
}

//  Subjects Hooks

export function useSubjects(
  token: string,
  queryObj?: {
    page?: number;
    limit?: number;
    search?: string;
    departmentName?: string;
  },
) {
  return useQuery({
    queryKey: queryKeys.subjects.all(queryObj),
    queryFn: () => getAllSubjects(token, queryObj),
    enabled: !!token,
  });
}

export function useSubjectById(token: string, id: string) {
  return useQuery({
    queryKey: queryKeys.subjects.detail(id),
    queryFn: () => getsubjectById(token, id),
    enabled: !!token && !!id,
  });
}

export function useClassesBySubjectId(token: string, id: string) {
  return useQuery({
    queryKey: queryKeys.subjects.classes(id),
    queryFn: () => getClassesBySubjectId(token, id),
    enabled: !!token && !!id,
  });
}

export function useTeachersBySubjectId(token: string, id: string) {
  return useQuery({
    queryKey: queryKeys.subjects.teachers(id),
    queryFn: () => getTeachersBySubjectId(token, id),
    enabled: !!token && !!id,
  });
}

export function useCreateSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      token,
      subjectData,
    }: {
      token: string;
      subjectData: {
        name: string;
        code: string;
        description: string;
        departmentId: number;
      };
    }) => createSubject(token, subjectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
}
