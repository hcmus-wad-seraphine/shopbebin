import { Link, Outlet, useLocation } from "react-router-dom";

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem = ({ to, label }: NavItemProps) => {
  const location = useLocation();

  return (
    <Link
      className={`${
        location.pathname === to ? "text-sky-200" : "text-white"
      } text-lg font-semibold px-4 py-2 rounded-xl`}
      to={to}
    >
      {label}
    </Link>
  );
};

const navItems: NavItemProps[] = [
  {
    to: "/admin/profile",
    label: "Thiết lập hồ sơ",
  },
  {
    to: "/admin/accounts",
    label: "Quản lý tài khoản",
  },
  {
    to: "/admin/products",
    label: "Quản lý sản phẩm",
  },
  {
    to: "/admin/orders",
    label: "Quản lý đơn hàng",
  },
];

const AdminRoot = () => {
  return (
    <div className="w-full lg:max-w-4xl xl:max-w-6xl mx-auto flex-col">
      <Link
        className="mx-auto my-4 text-4xl font-bold"
        to="/admin"
      >
        Admin Dashboard
      </Link>

      <div className="flex-col gap-6">
        <div className="bg-primary justify-center px-4 py-2 rounded-xl gap-8 items-center">
          {navItems.map((navItem) => (
            <NavItem
              key={navItem.to}
              to={navItem.to}
              label={navItem.label}
            />
          ))}
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminRoot;
