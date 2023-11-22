import { type FormEvent, type ReactNode } from "react";

interface FormContainerProps {
  className?: string;
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

export const FormContainer = ({ className, children, onSubmit }: FormContainerProps) => {
  return (
    <form
      className={`flex flex-col gap-4 px-[50px] sm:px-[150px] lg:px-[200px] xl:px-[300px] py-[50px] ${className}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default FormContainer;
