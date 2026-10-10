export interface Response<T> {
  success: string;
  message: string;
  data: T;
  timestamp: string;
  status: number;
}
export interface DashboardStats {
  users: number;
  teachers: number;
  admins: number;
  subjects: number;
  departments: number;
  classes: number;
}

export interface ChartData {
  usersByRole: UsersByRole[];
  subjectsByDepartment: SubjectsByDepartment[];
  classesBySubject: ClassesBySubject[];
}

export interface UsersByRole {
  role: string;
  total: number;
}

export interface SubjectsByDepartment {
  departmentId: number;
  departmentName: string;
  totalSubjects: number;
}

export interface ClassesBySubject {
  subjectId: number;
  subjectName: string;
  totalClasses: number;
}

export interface LatestData {
  latestClasses: Class[];
  latestTeachers: User[];
}

export interface Class {
  id: number;
  name: string;
  subjectId: number;
  teacherId: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: any;
  createdAt: string;
  updatedAt: string;
  role: string;
  imageCldPubId: any;
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface PaginatedResponse<T> extends Response<T> {
  data: T[];
  pagination: Pagination;
}

export interface Subject {
  id: number;
  departmentId: number;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  department: Department;
}

export interface Department {
  id: number;
  code: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  totalSubjects: number;
}

export interface ClassesFullSchema {
  id: number;
  subjectId: number;
  teacherId: string;
  inviteCode: string;
  name: string;
  price: string;
  currency: string;
  bannerCldPubId: string | null;
  bannerUrl: string | null;
  capacity: number;
  description: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  subject: Subject;
  teacher: User;
  schedules: Schedules[] | null | undefined;
}

export interface Schedules {
  day: string;
  startTime: string;
  endTime: string;
  onlineMeetLink: string;
}

export interface SubjectResponse {
  subject: Subject;
}
