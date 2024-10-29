import { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./form.css";

const schema = z.object({
  name: z
    .string({ invalid_type_error: "Name field is required." })
    .min(3, { message: "Name must be at least 3 characters." })
    .max(30, { message: "Name must be less than 30 characters." }),
  age: z
    .number({ invalid_type_error: "Age field is required." })
    .min(18, { message: "Age must be at least 18." })
    .max(110, { message: "Age must be less than 100." }),
});

type FormData = z.infer<typeof schema>;

const Form: React.FC<{ onSubmit: (data: FormData) => void }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    onSubmit(data); // Call the passed in onSubmit function with the form data
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="form px-3">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
