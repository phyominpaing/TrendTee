import { ShoppingCart, User } from "lucide-react";
import SearchBox from "../common/SearchBox";

const Topbar = () => {
  return (
    <main className="text-white bg-black py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h2 className="text-2xl font-medium">TrendTee</h2>
        <SearchBox />
        <div className="flex items-center gap-4">
          <ShoppingCart size={24} />
          <User size={24} />
        </div>
      </div>
    </main>
  );
};

export default Topbar;
