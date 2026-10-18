"use Client";

import FormBody, {
  FormErrors,
  FormFieldset,
  FormInput,
  FormTextArea,
} from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DepartmentInput, departmentSchema } from "./multiStepTypes";

function StepDepartment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  });
  const onSubmit = (data: DepartmentInput) => {
    console.log(data);
  };
  const onInvalid = (error: typeof errors) => {
    console.log("Validation errors:", error);
  };

  return (
    <>
      <FormBody onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <FormFieldset legend="Department Form" legendClassname="text-sm mb-5">
          <FormInput
            register={register}
            name="name"
            placeholder="Department Name"
            label="Department Name"
            type="text"
            className="glass-morphism"
          />
          <FormErrors errors={errors?.name?.message} />
          <FormInput
            register={register}
            name="code"
            placeholder="Department Code"
            label="Department Code"
            type="text"
            className="glass-morphism"
          />
          <FormErrors errors={errors?.code?.message} />
          <FormTextArea
            register={register}
            name="description"
            placeholder="Department Description"
            label="Department Description"
            className="glass-morphism w-full resize-none"
            rows={4}
            maxLength={150}
          />
          <FormErrors errors={errors?.description?.message} />
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
    </>
  );
}

export default StepDepartment;
