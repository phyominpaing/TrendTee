import { PackagePlus, Settings } from "lucide-react";
import type React from "react";
import { Link } from "react-router";

interface Page {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const pages: Page[] = [
  {
    name: "Product Management",
    path: "/admin/manage-products",
    icon: <Settings size={20} />,
  },
  {
    name: "Create New Product",
    path: "/admin/create-product",
    icon: <PackagePlus size={20} />,
  },
];
const SideBar = () => {
  return (
    <div className="flex flex-col gap-4">
      {pages.map((page, index) => (
        <div key={index} className="flex items-center gap-2">
          {page.icon}
          <Link to={page.path} className="font-medium">
            {page.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
