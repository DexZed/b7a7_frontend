"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createClass } from "@/data access/teacherData";
import { useSession } from "@/lib/authClient";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";

const classSchema = z.object({
  subjectId: z.number(),
  teacherId: z.string(),

  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.number(),
  currency: z.enum(["BDT", "USD"]),

  capacity: z.number().min(10, "Capacity must be at least 10"),
  description: z.string().min(8, "Description must be at least 8 characters"),
  status: z.enum(["active", "archived", "inactive"]),
  schedules: z.array(
    z.object({
      day: z.string(),
      endTime: z.string(),
      startTime: z.string(),
      onlineMeetLink: z.string(),
    }),
  ),
});
type ClassSchema = z.infer<typeof classSchema>;

function ClassForm() {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      subjectId: 1,
      teacherId: session?.user?.id || "",
      name: "",
      description: "",
      price: 1000,
      currency: "BDT",
      capacity: 10,
      status: "active",
      schedules: [
        {
          day: "sunday",
          endTime: "10:00",
          startTime: "09:00",
          onlineMeetLink: "https://impolite-solvency.com/",
        },
      ],
    },
  });

  const submitHandler = async (data: ClassSchema) => {
    setSubmitting(true);
    try {
      if (!session?.session?.token) return;
      await createClass(session.session.token, data);
      showSuccessAlert("Success", "Class created successfully");
    } catch (error) {
      showErrorAlert("Error", "Failed to create class");
      console.error("Class creation error:", error);
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
            placeholder="Enter Class Name"
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
            placeholder="Enter Class Description"
          />
          {errors.description && (
            <span className="label text-red-500">
              {String(errors.description?.message)}
            </span>
          )}
        </fieldset>
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend capitalize ">Teacher Id</legend>
          <input
            {...register("teacherId")}
            name="teacherId"
            type="text"
            className="input"
            placeholder="Enter A Valid Teacher Id, must be hex string"
          />
          {errors.teacherId && (
            <span className="label text-red-500">
              {String(errors.teacherId?.message)}
            </span>
          )}
        </fieldset>
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend capitalize ">Subject Id</legend>
          <input
            {...register("subjectId")}
            name="subjectId"
            type="number"
            className="input"
            placeholder="Enter Valid Subject Id"
          />
          {errors.subjectId && (
            <span className="label text-red-500">
              {String(errors.subjectId?.message)}
            </span>
          )}
        </fieldset>
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend capitalize ">capacity</legend>
          <input
            {...register("capacity")}
            name="capacity"
            type="number"
            className="input"
            placeholder="Enter Class Capacity"
          />
          {errors.capacity && (
            <span className="label text-red-500">
              {String(errors.capacity?.message)}
            </span>
          )}
        </fieldset>
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend capitalize ">price</legend>
          <input
            {...register("price")}
            name="price"
            type="number"
            className="input"
            placeholder="Enter Class Price"
          />
          {errors.price && (
            <span className="label text-red-500">
              {String(errors.price?.message)}
            </span>
          )}
        </fieldset>
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend capitalize ">currency</legend>
          <select {...register("currency")} name="currency" className="input">
            <option disabled>Select Currency</option>
            <option value="BDT" defaultChecked>
              BDT
            </option>
            <option value="USD">USD</option>
          </select>
          {errors.currency && (
            <span className="label text-red-500">
              {String(errors.currency?.message)}
            </span>
          )}
        </fieldset>
        <fieldset className="fieldset w-96">
          <legend className="fieldset-legend capitalize ">status</legend>
          <select {...register("status")} name="status" className="input">
            <option disabled defaultChecked>
              Select Status
            </option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
          {errors.status && (
            <span className="label text-red-500">
              {String(errors.status?.message)}
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

export default ClassForm;
