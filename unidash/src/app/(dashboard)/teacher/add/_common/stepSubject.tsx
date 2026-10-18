"use Client";
import FormBody, {
  FormErrors,
  FormFieldset,
  FormInput,
  FormTextArea,
} from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { subjectSchema, SubjectValues } from "./multiStepTypes";

function StepSubject() {
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
  const onSubmit = (data: SubjectValues) => {
    console.log(data);
  };
  const onInvalid = (error: typeof errors) => {
    console.log("Validation errors:", error);
  };
  return (
    <FormBody onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <FormFieldset legend="Subject Form" legendClassname="text-sm mb-5">
        <FormInput
          register={register}
          name="departmentId"
          placeholder="Department ID"
          label="Department ID"
          type="number"
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
        >
          Reset
        </button>
        <button
          type="submit"
          className="glass-morphism btn btn-ghost btn-outline"
        >
          Submit
        </button>
      </div>
    </FormBody>
  );
}

export default StepSubject;
