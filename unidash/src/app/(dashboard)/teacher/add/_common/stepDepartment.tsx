"use Client";
import { useFormContext } from "react-hook-form";
import { MultiFormInput } from "./multiStepTypes";
import {
  FormErrors,
  FormFieldset,
  FormInput,
  FormTextArea,
} from "@/components/form";

function StepDepartment() {
  const {
    register,
    formState: { errors },
  } = useFormContext<MultiFormInput>();

  return (
    <FormFieldset legend="Department Form" legendClassname="text-sm mb-5">
      <FormInput
        register={register}
        name="Name"
        placeholder="Department Name"
        label="Department Name"
        type="text"
        className="glass-morphism"
      />
      <FormErrors errors={errors?.department?.name?.message} />
      <FormInput
        register={register}
        name="Code"
        placeholder="Department Code"
        label="Department Code"
        type="text"
        className="glass-morphism"
      />
      <FormErrors errors={errors?.department?.code?.message} />
      <FormTextArea
        register={register}
        name="Description"
        placeholder="Department Description"
        label="Department Description"
        className="glass-morphism w-full resize-none"
        rows={4}
        maxLength={150}
      />
      <FormErrors errors={errors?.department?.description?.message} />
    </FormFieldset>
  );
}

export default StepDepartment;
