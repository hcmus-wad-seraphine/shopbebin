interface CallOutProps {
  className?: string;
  type: "success" | "warning" | "error";
  title: string;
  description?: string;
}

const successIcon = <i className="fas fa-check-circle"></i>;
const warningIcon = <i className="fas fa-exclamation-circle"></i>;
const errorIcon = <i className="fas fa-times-circle"></i>;

const CallOut = ({ className, type, title, description }: CallOutProps) => {
  const icon = type === "success" ? successIcon : type === "warning" ? warningIcon : errorIcon;

  return (
    <div
      className={`flex-col gap-2 p-4 my-1 shadow-sm rounded-md border border-${type} ${className}`}
    >
      <div className={`flex items-center gap-2 font-semibold text-${type}`}>
        {icon} <p>{title}</p>
      </div>
      {description != null && <p>{description}</p>}
    </div>
  );
};

export default CallOut;
