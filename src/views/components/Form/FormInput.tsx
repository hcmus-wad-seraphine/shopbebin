interface FormInputProps {
  className?: string;
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  className,
  label,
  name,
  defaultValue,
  type = "text",
  required = true,
  onChange,
}: FormInputProps) => {
  return (
    <div className={`flex-col ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className={`flex-1 border-black border px-2 py-1 ${className}`}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
