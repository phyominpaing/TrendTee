import { Outlet } from "react-router";
import Navbar from "../common/Navbar";

const Main = () => {
  return (
    <section>
      <Navbar />
      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>
    </section>
  );
};

export default Main;
