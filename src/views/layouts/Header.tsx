import { Link } from "react-router-dom";
import type { FC } from "react";
import Navigator from "../components/Navigator";

interface Props {
  isAdmin?: boolean;
}

const Header: FC<Props> = ({ isAdmin }) => {
  return (
    <div className="bg-primary flex justify-between items-center px-10 py-4">
      <a href="/" className="flex gap-2 items-center">
        <img className="w-10 rounded-full" src="/favicon.ico" alt="logo" />
        <span className="text-white text-2xl font-semibold">Shopbebin</span>
      </a>

      <div className="bg-white rounded-full px-5 h-8 items-center justify-between w-[600px]">
        <input type="text" placeholder="Search" className="flex-1" />
        <i className="fas fa-search text-black"></i>
      </div>

      <div>
        {!isAdmin && (
          <div>
            <Navigator href="/register" title="Register" />
          </div>
        )}
        <div>
          <Navigator href="/login" title="Log in" />
        </div>
      </div>
    </div>
  );
};

export default Header;
