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
