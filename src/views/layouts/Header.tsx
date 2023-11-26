import { Link } from "react-router-dom";

import Navigator from "../components/Navigator";

interface Props {
  isLogIn: boolean;
}

const Header = ({ isLogIn }: Props) => {
  return (
    <div className="bg-primary flex justify-between items-center px-10 py-4">
      <Link
        className="flex gap-2 items-center"
        to="/"
      >
        <img
          className="min-h-[40px] w-10 rounded-full"
          src="/favicon.ico"
          alt="logo"
        />
        <span className="text-white text-2xl font-semibold">Shopbebin</span>
      </Link>

      <div className="bg-white rounded-full px-5 h-8 items-center justify-between w-[600px]">
        <input
          type="text"
          placeholder="Search"
          className="flex-1"
        />
        <i className="fas fa-search text-black"></i>
      </div>

      {isLogIn ? (
        <div className="gap-5">
          <Navigator
            icon={<i className="fas fa-shopping-cart"></i>}
            href="/cart"
            title="Your cart"
          />
          <Navigator
            icon={<i className="fas fa-clipboard"></i>}
            href="/orders"
            title="Your orders"
          />
          <Navigator
            icon={<i className="fas fa-user"></i>}
            href="/profile"
            title="Profile"
          />
        </div>
      ) : (
        <div className="gap-5">
          <Navigator
            icon={<i className="fa-regular fa-id-card"></i>}
            href="/register"
            title="Register"
          />

          <Navigator
            icon={<i className="fa-solid fa-arrow-right-to-bracket"></i>}
            href="/login"
            title="Login"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
