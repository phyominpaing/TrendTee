import { Menu } from "lucide-react";
import { useNavigate } from "react-router";

const categories = ["T-shirt", "Hoodie", "Short", "Jeans", "Shoe"];
const SecondaryBar = () => {
  const navigate = useNavigate();

  const handleClick = (category: string) => {
    navigate(
      `/products/filter?category=${encodeURIComponent(category.trim()).toLowerCase()}`,
    );
  };

  return (
    <main className="text-black bg-gray-200 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Menu size={20} />
          <p className="text-lg font-medium">Categories</p>
        </div>

        <div className="flex items-center gap-6 text-base cursor-pointer">
          {categories.map((category, index) => (
            <p
              className=" cursor-pointer"
              onClick={() => handleClick(category)}
              key={index}
            >
              {category}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SecondaryBar;
