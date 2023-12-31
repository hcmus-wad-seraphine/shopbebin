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
      } text-base font-semibold px-4 py-2 rounded-xl`}
      to={to}
    >
      {label}
    </Link>
  );
};

const navItems: NavItemProps[] = [
  {
    to: "/admin",
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
    to: "/admin/categories",
    label: "Categories management",
  },
  {
    to: "/admin/orders",
    label: "Orders management",
  },
  {
    to: "/admin/profile",
    label: "Profile",
  },
];

const AdminRoot = () => {
  return (
    <div className="w-screen">
      <div className="flex-col bg-primary px-4 py-2 w-[280px] gap-8 fixed top-0 left-0 h-full">
        {navItems.map((navItem) => (
          <NavItem
            key={navItem.to}
            to={navItem.to}
            label={navItem.label}
          />
        ))}
      </div>

      <div className="ml-[280px] w-full px-12 py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoot;
