interface Props {
  title: string;
  value: string;
  isDisabled?: boolean;
}

const InfoItem = ({ title, value, isDisabled }: Props) => {
  return (
    <div className="justify-between w-full">
      <label className="text-gray-500 text-base">{title}</label>

      <input
        disabled={isDisabled}
        type="text"
        className="font-medium text-lg"
        value={value}
      />
    </div>
  );
};

export default InfoItem;
