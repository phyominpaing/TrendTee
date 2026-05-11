import SideBar from "@/components/admin/SideBar";
import { Outlet } from "react-router";

const Panel = () => {
  return (
    <section className="grid grid-cols-10">
      <div className="col-span-2">
        {/* Sidebar */}
        <SideBar />
      </div>
      <div className="col-span-8">
        {/* Dashboard Content */}
        <Outlet />
      </div>
    </section>
  );
};

export default Panel;
