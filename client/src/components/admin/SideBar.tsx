import { Database, LayoutDashboard, PackagePlus, Settings, User2, UserCog } from "lucide-react";
import type React from "react";
import { Link, NavLink } from "react-router";

interface Page {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const pages: Page[] = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Product Management",
    path: "/admin/manage-products",
    icon: <Settings size={20} />,
  },
  {
    name: "User Management",
    path: "/admin/manage-users",
    icon: <UserCog size={20} />,
  },
];
const SideBar = () => {
  return (
    <nav className="h-full border-r border-r-slate-200 pr-4">
      <div className="flex flex-col items-center gap-2">
        {pages.map((page, index) => (
          <NavLink
            key={index}
            to={page.path}
            className={({ isActive }) =>
              `flex items-center gap-2 font-medium rounded-lg p-2 text-sm w-full transistion duration-300 ${isActive ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted hover:text-foreground "}`
            }
          >
            {page.icon}
            {page.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default SideBar;
