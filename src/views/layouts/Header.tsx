import { Link } from "react-router-dom";
import Navigator from "../components/Navigator";

const Header = () => {
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

      <div>
        <div>
          <Navigator
            href="/register"
            title="Register"
          />
        </div>
        <div>
          <Navigator
            href="/login"
            title="Login"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
