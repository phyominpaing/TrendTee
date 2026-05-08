import { Outlet } from "react-router";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const Main = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-6xl mx-auto w-full flex-1 flex flex-col py-6">
        <Outlet />
      </main>
      <Footer/>
    </section>
  );
};

export default Main;
