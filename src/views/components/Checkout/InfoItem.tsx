interface Props {
  title: string;
  value: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
}

const InfoItem = ({ title, value, isDisabled = true, onChange }: Props) => {
  return (
    <div className="justify-between w-full">
      <label className="text-gray-500 text-base">{title}</label>

      {isDisabled ? (
        <p>{value}</p>
      ) : (
        <input
          type="text"
          className="w-fit font-medium text-lg"
          value={value}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
        />
      )}
    </div>
  );
};

export default InfoItem;
