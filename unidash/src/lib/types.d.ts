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
  latestClasses: LatestClass[];
  latestTeachers: LatestTeacher[];
}

export interface LatestClass {
  id: number;
  subjectId: number;
  teacherId: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface LatestTeacher {
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
