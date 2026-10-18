import { z } from "zod";

export const departmentSchema = z.object({
  name: z.string().min(1, "Invalid name"),
  description: z.string().min(8, "Description must be at least 8 characters"),
  code: z.string().min(3, "Code must be at least 3 characters"),
});

export const subjectSchema = z.object({
  name: z.string().min(3, "Invalid name"),
  description: z.string().min(8, "Description must be at least 8 characters"),
  code: z.string().min(3, "Code must be at least 3 characters"),
  departmentId: z.coerce.number(),
});

export const classSchema = z.object({
  subjectId: z.coerce.number(),
  teacherId: z.string().min(1, "Teacher is required"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.coerce.number().min(0, "Price must be positive"),
  currency: z.enum(["BDT", "USD"]),
  capacity: z.coerce.number().min(10, "Capacity must be at least 10"),
  description: z.string().min(8, "Description must be at least 8 characters"),
  status: z.enum(["active", "archived", "inactive"]),
  schedules: z.array(
    z.object({
      day: z.string().min(1, "Day is required"),
      endTime: z.string().min(1, "End time is required"),
      startTime: z.string().min(1, "Start time is required"),
      onlineMeetLink: z.string().url("Must be a valid URL"),
    }),
  ),
});

// Master schema combining all steps
export const multiStepFormSchema = z.object({
  department: departmentSchema,
  subject: subjectSchema,
  class: classSchema,
});

export type MultiFormInput = z.input<typeof multiStepFormSchema>;
export type MultiFormValues = z.output<typeof multiStepFormSchema>;
