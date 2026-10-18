"use Client";
import { useFormContext } from "react-hook-form";
import { MultiFormInput } from "./multiStepTypes";
import {
  FormErrors,
  FormFieldset,
  FormInput,
  FormSelect,
} from "@/components/form";

function StepClass() {
  const {
    register,
    formState: { errors },
  } = useFormContext<MultiFormInput>();

  return (
    <FormFieldset legend="Class Form" legendClassname="text-sm mb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <FormInput
            register={register}
            name="Subject ID"
            placeholder="Subject ID"
            label="Subject ID"
            type="text"
            className="glass-morphism"
          />
          <FormErrors errors={errors?.class?.subjectId?.message} />
        </div>
        <div>
          <FormInput
            register={register}
            name="Teacher ID"
            placeholder="Teacher ID"
            label="Teacher ID"
            type="text"
            className="glass-morphism"
          />
          <FormErrors errors={errors?.class?.teacherId?.message} />
        </div>
        <div>
          <FormInput
            register={register}
            name="Name"
            placeholder="Class Name"
            label="Class Name"
            type="text"
            className="glass-morphism"
          />
          <FormErrors errors={errors?.class?.name?.message} />
        </div>
        <div>
          <FormInput
            register={register}
            name="Description"
            placeholder="Class Description"
            label="Class Description"
            type="text"
            className="glass-morphism"
          />
          <FormErrors errors={errors?.class?.description?.message} />
        </div>
        <div>
          <FormInput
            register={register}
            name="Price"
            placeholder="Class Price"
            label="Class Price"
            type="text"
            className="glass-morphism"
          />
          <FormErrors errors={errors?.class?.price?.message} />
        </div>
        <div>
          <FormInput
            register={register}
            name="Currency"
            placeholder="Class Currency"
            label="Class Currency"
            type="text"
            className="glass-morphism"
          />
          <FormErrors errors={errors?.class?.currency?.message} />
        </div>
        <div>
          <FormInput
            register={register}
            name="Capacity"
            placeholder="Class Capacity"
            label="Class Capacity"
            type="text"
            className="glass-morphism"
          />
          <FormErrors errors={errors?.class?.capacity?.message} />
        </div>

        <div>
          <FormSelect
            register={register}
            name="Status"
            options={[
              { value: "active", label: "Active" },
              { value: "archived", label: "Archived" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
          <FormErrors errors={errors?.class?.status?.message} />
        </div>
      </div>
    </FormFieldset>
  );
}

export default StepClass;
