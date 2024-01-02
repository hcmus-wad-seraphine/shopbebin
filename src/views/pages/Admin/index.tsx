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
    label: "Profile",
  },
  {
    to: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    to: "/admin/accounts",
    label: "Accounts management",
  },
  {
    to: "/admin/products",
    label: "Products management",
  },
  {
    to: "/admin/orders",
    label: "Orders management",
  },
];

const AdminRoot = () => {
  return (
    <div className="w-full lg:max-w-4xl xl:max-w-6xl mx-auto">
      <div className="flex-col bg-primary  px-4 py-2 gap-8  absolute left-0 h-full">
        {navItems.map((navItem) => (
          <NavItem
            key={navItem.to}
            to={navItem.to}
            label={navItem.label}
          />
        ))}
      </div>

      <div className="ml-[180px] w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoot;
