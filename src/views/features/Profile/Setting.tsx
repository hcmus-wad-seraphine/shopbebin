interface SettingItemProps {
  title: string;
  icon: string;
}

export const SettingItem = ({ title, icon }: SettingItemProps) => {
  return (
    <button className="flex w-full justify-between">
      <div className="flex items-center gap-2">
        <i className={`fa-solid fa-${icon}`}></i>
        <h3 className=" text-base font-medium">{title}</h3>
      </div>

      <i className="fa-solid fa-chevron-right"></i>
    </button>
  );
};

const SettingTitle = () => {
  return (
    <div className="justify-center items-center gap-2">
      <i className="fa-solid fa-gear text-white"></i>
      <h2 className="text-white text-lg font-medium">Settings</h2>
    </div>
  );
};

export default SettingTitle;
