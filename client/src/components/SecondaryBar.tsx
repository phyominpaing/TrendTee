import { Menu } from "lucide-react";

const categories = ["T-shirts", "Hoodies", "Shirt", "Gym", "Shorts", "Jeans"];
const SecondaryBar = () => {
  return (
    <main className="text-black bg-gray-200 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Menu size={20} />
          <p className="text-lg font-medium">Categories</p>
        </div>

        <div className="flex items-center gap-6 text-base">
          {categories.map((category, index) => (
            <p key={index}>{category}</p>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SecondaryBar;
