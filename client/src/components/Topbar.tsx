import { LogIn, ShoppingCart, User } from "lucide-react";
import SearchBox from "../common/SearchBox";
import { Link } from "react-router";

interface TopbarProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}
const Topbar = ({ isCartOpen, toggleCart }: TopbarProps) => {
  return (
    <main className="text-white bg-black py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to={"/"} className="text-2xl font-medium">
          TrendTee
        </Link>
        <SearchBox />
        <div className="flex items-center gap-4 cursor-pointer">
          <ShoppingCart onClick={toggleCart} size={24} />
          <Link to="/login">
            <LogIn size={24} />
          </Link>
        </div>
      </div>

      {/* Cart Overlay  */}
      <div
        onClick={toggleCart}
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
    </main>
  );
};

export default Topbar;
