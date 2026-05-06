import { Menu } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

const categories = ["T-shirt", "Hoodie", "Short", "Jeans", "Shoe"];
const SecondaryBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = (category: string) => {
    const newParams = new URLSearchParams(searchParams);

    const categoryLower = category.trim().toLowerCase();
    if (currentCategory === categoryLower) {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryLower);
    }

    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/products/filter?${newSearchQuery}`
      : "/products/filter";

    navigate(path, { replace: true });
  };

  const currentCategory = searchParams.get("category") || "";

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
              className={`cursor-pointer ${currentCategory === category.toLowerCase() ? "underline font-semibold" : ""}`}
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
