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
