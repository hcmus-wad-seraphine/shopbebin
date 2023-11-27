import { type ReactNode, useState } from "react";

interface DropdownProps {
  style?: string;
  title: ReactNode;
  items: ReactNode[];
  currentId?: number;
  onSelected?: () => void;
}

const Dropdown = ({ title, items, currentId, onSelected }: DropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex-col w-full max-w-[600px]">
      <div className="flex justify-between px-5 py-3 bg-primary rounded-full">
        <div>{title}</div>
        <button
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <i className="fa-solid fa-chevron-down text-white"></i>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="flex-col gap-2 px-3">
          {items.map((item, index) => (
            <button
              className="w-full px-5 py-3 rounded-full"
              key={index}
              onClick={() => {
                if (currentId !== null && onSelected !== undefined && currentId === index) {
                  onSelected();
                }
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
