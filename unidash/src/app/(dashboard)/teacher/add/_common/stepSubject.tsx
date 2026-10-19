"use Client";
import FormBody, {
  FormErrors,
  FormFieldset,
  FormInput,
  FormSelect,
  FormTextArea,
} from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { subjectSchema, SubjectValues } from "./multiStepTypes";
import { useCreateSubject, useDepartments } from "@/hooks/uses-teacher-hooks";
import { useSession } from "@/lib/authClient";
import { showErrorAlert, showSuccessAlert } from "@/lib/utils";

function StepSubject() {
  const { data: session } = useSession();
  const token = session?.session?.token as string;
  const { data: departments } = useDepartments(token);
  const { mutateAsync, isPending } = useCreateSubject();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  });
  const onSubmit = async (data: SubjectValues) => {
    try {
      await mutateAsync({ subjectData: data, token });
      showSuccessAlert("Success", "Subject added successfully");
      reset();
    } catch (error) {
      showErrorAlert("Error", `Error occured: ${error}`);
    }
  };
  const onInvalid = (error: typeof errors) => {
    console.log("Validation errors:", error);
  };
  return (
    <FormBody onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <FormFieldset legend="Subject Form" legendClassname="text-sm mb-5">
        <FormSelect
          register={register}
          name="departmentId"
          placeholder="Select Department"
          label="Department"
          options={
            departments?.data?.map((department) => ({
              value: department.id.toString(),
              label: department.name,
            })) || []
          }
          className="glass-morphism"
        />
        <FormErrors errors={errors?.departmentId?.message} />
        <FormInput
          register={register}
          name="name"
          placeholder="Subject Name"
          label="Subject Name"
          type="text"
          className="glass-morphism"
        />
        <FormTextArea
          register={register}
          name="description"
          placeholder="Subject Description"
          label="Subject Description"
          className="glass-morphism w-full resize-none"
          rows={4}
          maxLength={150}
        />
        <FormErrors errors={errors?.description?.message} />
        <FormInput
          register={register}
          name="code"
          placeholder="Subject Code"
          label="Subject Code"
          type="text"
          className="glass-morphism"
        />
        <FormErrors errors={errors?.code?.message} />
      </FormFieldset>
      <div className="flex justify-end mt-5">
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
          className="glass-morphism btn btn-ghost btn-outline"
          disabled={isPending}
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

export default StepSubject;
