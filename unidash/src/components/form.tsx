import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";

interface Props<T extends FieldValues> {
  type: "Registration" | "Log In";
  description: string;
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

function Form<T extends FieldValues>({
  type,
  description,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) {
  const form = useForm({
    resolver: zodResolver(schema as ZodType<T, any, any>),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log(data);
  };
  return (
    <div className="glass-morphism max-w-md w-3xl p-5 flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold">{type}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="py-4">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>
            {Object.keys(defaultValues).map((key) => (
              <fieldset key={key} className="fieldset">
                <legend className="fieldset-legend capitalize ">{key}</legend>
                <input
                  {...form.register(key)}
                  type={key}
                  className="input"
                  placeholder={
                    key === "role" ? "admin , teacher or student" : key
                  }
                />
              </fieldset>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
