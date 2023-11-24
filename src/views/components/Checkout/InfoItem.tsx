interface Props {
  title: string;
  value: string;
}

const InfoItem = ({ title, value }: Props) => {
  return (
    <div className="justify-between">
      <label className="text-gray-500 text-base">{title}</label>
      <p className="font-medium text-lg">{value}</p>
    </div>
  );
};

export default InfoItem;
