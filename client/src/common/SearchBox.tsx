import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SearchBox = () => {
  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initialKeyword);
  const navigate = useNavigate();

  const handleSearchInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("keyword", keyword.trim());

      navigate(
        `/products/filter?${newParams.toString()}`,
      );
    }
  };

  return (
    <div className="w-96 relative">
      <form onSubmit={handleSearchInput}>
        <input
          type="text"
          className="bg-gray-200  focus:outline-none py-2 ps-10 text-black text-sm w-full rounded-full"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Search size={20} className="absolute top-2 left-2 text-black" />
      </form>
    </div>
  );
};

export default SearchBox;
