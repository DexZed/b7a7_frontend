"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createDepartment } from "@/data access/teacherData";
import { useSession } from "@/lib/authClient";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";

const departmentSchema = z.object({
  name: z.string("Invalid name"),
  description: z.string().min(8, "Description must be at least 8 characters"),
  code: z.string().min(3, "Code must be at least 3 characters"),
});
type DepartmentSchema = z.infer<typeof departmentSchema>;

function DepartmentForm() {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentSchema>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      description: "",
      code: "",
    },
  });

  const submitHandler = async (data: DepartmentSchema) => {
    setSubmitting(true);
    try {
      if (!session?.session?.token) return;
      await createDepartment(session.session.token, data);
      showSuccessAlert("Success", "Department created successfully");
    } catch (error) {
      showErrorAlert("Error", "Failed to create department");
      console.error("Department creation error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="w-full">
      <div className="w-full">
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend capitalize ">name</legend>
          <input
            {...register("name")}
            name="name"
            type="text"
            className="input"
            placeholder="Enter Department Name"
          />
          {errors.name && (
            <span className="label text-red-500">
              {String(errors.name?.message)}
            </span>
          )}
        </fieldset>
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend capitalize ">Description</legend>
          <input
            {...register("description")}
            name="description"
            type="text"
            className="input"
            placeholder="Enter Department Description"
          />
          {errors.description && (
            <span className="label text-red-500">
              {String(errors.description?.message)}
            </span>
          )}
        </fieldset>
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend capitalize ">code</legend>
          <input
            {...register("code")}
            name="code"
            type="text"
            className="input"
            placeholder="Enter Department Code"
          />
          {errors.code && (
            <span className="label text-red-500">
              {String(errors.code?.message)}
            </span>
          )}
        </fieldset>
        <button
          type="submit"
          className="w-80 btn btn-info btn-outline my-5"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default DepartmentForm;
