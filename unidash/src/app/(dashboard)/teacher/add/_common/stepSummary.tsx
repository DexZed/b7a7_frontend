import { useFormContext } from "react-hook-form";
import { MultiFormInput } from "./multiStepTypes";

function StepSummary() {
  const { getValues } = useFormContext<MultiFormInput>();

  const values = getValues();
  console.log(values);
  return <div>StepSummary</div>;
}

export default StepSummary;
