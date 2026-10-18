"use Client";
import { useFormContext } from "react-hook-form";
import { MultiFormInput } from "./multiStepTypes";
import { FormFieldset, FormInput } from "@/components/form";

function StepSubject() {
  const {
    register,
    formState: { errors },
  } = useFormContext<MultiFormInput>();
  return (
    <FormFieldset legend="Subject Form" legendClassname="text-sm mb-5">
      <FormInput
        register={register}
        name="Department ID"
        placeholder="Department ID"
        label="Department ID"
        type="text"
        className="glass-morphism"
      />
      <FormInput
        register={register}
        name="Name"
        placeholder="Subject Name"
        label="Subject Name"
        type="text"
        className="glass-morphism"
      />
      <FormInput
        register={register}
        name="Description"
        placeholder="Subject Description"
        label="Subject Description"
        type="text"
        className="glass-morphism"
      />
      <FormInput
        register={register}
        name="Code"
        placeholder="Subject Code"
        label="Subject Code"
        type="text"
        className="glass-morphism"
      />
    </FormFieldset>
  );
}

export default StepSubject;
