import { useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Navigator from "../components/Navigator";

interface Props {
  isLogIn: boolean;
}

const Header = ({ isLogIn }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const search = searchParams.get("search") ?? "";

  const handleSearch = () => {
    if (inputRef.current != null) {
      const search = inputRef.current.value;
      if (search !== "") {
        navigate(`/?search=${search}`);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-primary justify-between items-center px-10 py-4">
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
          className="flex-1 border-none outline-none"
          defaultValue={search}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>
          <i className="fas fa-search text-black"></i>
        </button>
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
