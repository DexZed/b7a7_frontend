"use Client";

import FormBody, {
  FormErrors,
  FormFieldset,
  FormInput,
  FormSelect,
  FormTextArea,
} from "@/components/form";
import { ClassOutput, classSchema } from "./multiStepTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "@/lib/authClient";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";
import { useCreateClass, useSubjects } from "@/hooks/uses-teacher-hooks";
function StepClass() {
  const { data: session } = useSession();
  const token = session?.session?.token as string;
  const { data: subjects } = useSubjects(token);
  const { mutateAsync, isPending } = useCreateClass();
  const {
    register,
    handleSubmit,
    formState: { errors: FormError },
    reset,
  } = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      teacherId: session?.user.id,
      name: "",
      description: "",
      price: 0,
      currency: "BDT",
      capacity: 0,
      status: "active",
      schedules: [
        {
          day: "Sunday",
          startTime: "09:00",
          endTime: "11:00",
          onlineMeetLink: "https://zoom.us//0123456789",
        },
      ],
    },
  });
  const onSubmit = async (data: ClassOutput) => {
    const mutationData = {
      ...data,
      subjectId: Number(data.subjectId),
    };
    try {
      await mutateAsync({ classData: mutationData, token });
      showSuccessAlert("Success", "Class added successfully");
      reset();
    } catch (error) {
      showErrorAlert("Error", `Error occured: ${error}`);
    }
  };

  const onInvalid = (errors: typeof FormError) => {
    console.log("Validation errors:", errors);
  };

  return (
    <FormBody onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <FormFieldset legend="Class Form" legendClassname="text-sm mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <FormSelect
              register={register}
              name="subjectId"
              label="Subject"
              options={subjects?.data?.map((subject) => ({
                value: subject.id.toString(),
                label: subject.name,
              }))}
              placeholder="Select Subject"
              className="glass-morphism"
            />
            <FormErrors errors={FormError?.subjectId?.message} />
          </div>
          <div>
            <FormInput
              register={register}
              name="teacherId"
              placeholder="Teacher ID"
              label="Teacher ID"
              type="text"
              className="glass-morphism"
            />
            <FormErrors errors={FormError?.teacherId?.message} />
          </div>
          <div>
            <FormInput
              register={register}
              name="name"
              placeholder="Class Name"
              label="Class Name"
              type="text"
              className="glass-morphism"
            />
            <FormErrors errors={FormError?.name?.message} />
          </div>
          <div>
            <FormTextArea
              register={register}
              name="description"
              placeholder="Class Description"
              label="Class Description"
              className="glass-morphism w-full resize-none"
              rows={4}
              maxLength={150}
            />
            <FormErrors errors={FormError?.description?.message} />
          </div>
          <div>
            <FormInput
              register={register}
              name="price"
              placeholder="Class Price"
              label="Class Price"
              type="number"
              className="glass-morphism"
            />
            <FormErrors errors={FormError?.price?.message} />
          </div>
          <div>
            <FormSelect
              register={register}
              name="currency"
              label="Currency"
              placeholder="Select Currency"
              options={[
                { value: "BDT", label: "BDT" },
                { value: "USD", label: "USD" },
              ]}
            />
            <FormErrors errors={FormError?.currency?.message} />
          </div>
          <div>
            <FormInput
              register={register}
              name="capacity"
              placeholder="Class Capacity"
              label="Class Capacity"
              type="number"
              className="glass-morphism"
            />
            <FormErrors errors={FormError?.capacity?.message} />
          </div>

          <div>
            <FormSelect
              register={register}
              name="status"
              label="Status"
              placeholder="Select Status"
              options={[
                { value: "active", label: "Active" },
                { value: "archived", label: "Archived" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
            <FormErrors errors={FormError?.status?.message} />
          </div>
        </div>
      </FormFieldset>

      <div className="flex justify-end mt-5 gap-2">
        <button
          type="button"
          onClick={() => reset()}
          className="glass-morphism btn btn-ghost btn-outline"
          disabled={isPending}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="glass-morphism btn btn-ghost btn-outline"
        >
          {isPending ? (
            <span className="loading loading-dots loading-xl"></span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </FormBody>
  );
}

export default StepClass;
