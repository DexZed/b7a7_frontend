"use client";
import PageHeading from "@/components/pageHeading";
import { useState, useEffect } from "react";
import {
  useForm,
  FormProvider,
  FieldPath,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  multiStepFormSchema,
  MultiFormValues,
  MultiFormInput,
} from "./_common/multiStepTypes";
import Progress from "./_common/progress";
import StepDepartment from "./_common/stepDepartment";
import StepClass from "./_common/stepClass";
import StepSubject from "./_common/stepSubject";
import StepSummary from "./_common/stepSummary";
import { AnimatePresence, motion } from "motion/react";

// Constants
const STORAGE_KEY = "msf-data";
const TOTAL_STEPS = 4;
const getDefaultValues = (): DefaultValues<MultiFormInput> => {
  if (typeof window === "undefined") return {};

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};
function MultiForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  // Initialize RHF with Zod resolver & localStorage hydration
  const methods = useForm<MultiFormInput, unknown, MultiFormValues>({
    resolver: zodResolver(multiStepFormSchema),
    mode: "onBlur",
    defaultValues: getDefaultValues(),
  });

  const { handleSubmit, watch, trigger, reset } = methods;

  // Persist form state to localStorage on change
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Validate only the fields belonging to the current step before proceeding
  const fieldsForStep: Record<number, FieldPath<MultiFormInput>[]> = {
    1: ["department.name", "department.description", "department.code"],
    2: [
      "subject.name",
      "subject.description",
      "subject.code",
      "subject.departmentId",
    ],
    3: [
      "class.subjectId",
      "class.teacherId",
      "class.name",
      "class.price",
      "class.currency",
      "class.capacity",
      "class.description",
      "class.status",
      "class.schedules",
    ],
  };

  const handleNext = async () => {
    const fields = fieldsForStep[step];

    if (!fields) return;

    const isValid = await trigger(fields);

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async (data: MultiFormValues) => {
    try {
      setSubmitting(true);
      console.log("Submitting payload:", data);
      // TODO: Add your TanStack Query mutation here

      setComplete(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    reset(getDefaultValues());
    localStorage.removeItem(STORAGE_KEY);
    setStep(1);
    setComplete(false);
  };

  const stepCoponents = [
    {
      id: 1,
      title: "Department",
      component: <StepDepartment />,
    },
    {
      id: 2,
      title: "Subject",
      component: <StepSubject />,
    },
    {
      id: 3,
      title: "Class",
      component: <StepClass />,
    },
    {
      id: 4,
      title: "Summary",
      component: <StepSummary />,
    },
  ];
  return (
    <>
      <section className="min-h-screen flex flex-col">
        <PageHeading
          title="Add A Department, Class and Subject"
          className="capitalize"
        />
        <div className="flex items-center justify-center ">
          <div className="card glass-morphism shadow-2xl m-5 w-full">
            <div className="card-body">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                Create
              </h2>
              <p className="font-light mt-2">
                Create a Department, Subject and a Class, all in one place.
              </p>
            </div>
            <Progress step={step} />

            <FormProvider {...methods}>
              <div className="relative min-h-80 w-full p-4 md:p-6 lg:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stepCoponents[step - 1].id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      x: { type: "spring" },
                    }}
                  >
                    {stepCoponents[step - 1].component}
                  </motion.div>
                </AnimatePresence>
              </div>
            </FormProvider>
            <div className="flex items-center justify-end p-4 md:p-6 lg:p-8 gap-4">
              <button
                onClick={resetForm}
                disabled={step === 1}
                className="glass-morphism btn"
              >
                Reset
              </button>
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className="glass-morphism btn"
              >
                Previous
              </button>
              {step === TOTAL_STEPS ? (
                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={submitting}
                  className="glass-morphism btn"
                >
                  Submit
                </button>
              ) : (
                <button onClick={handleNext} className="glass-morphism btn">
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MultiForm;
