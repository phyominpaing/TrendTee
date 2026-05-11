import { PackagePlus } from "lucide-react";
import { Link } from "react-router";

const pages = [
  {
    name: "Create Product",
    path: "/admin/create-product",
    icon: <PackagePlus size={20} />,
  },
];
const SideBar = () => {
  return (
    <div>
      {pages.map((page, index) => (
        <div key={index} className="flex items-center gap-2">
          {page.icon}
          <Link to={page.path} className="font-medium">{page.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
