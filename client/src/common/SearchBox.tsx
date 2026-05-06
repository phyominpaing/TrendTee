import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SearchBox = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialKeyword = searchParams.get("keyword") || "";
  const [keyword, setKeyword] = useState(initialKeyword);

  useEffect(() => {
    const urlKeyword = searchParams.get("keyword") || "";
    setKeyword(urlKeyword);
  }, [searchParams]);

  const handleSearchInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateKeywordFromUrl(keyword.trim());
  };

  const updateKeywordFromUrl = (newKeyword: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newKeyword) {
      newParams.set("keyword", newKeyword.trim());
    } else {
      newParams.delete("keyword"); 
    }

    const newSearchQuery = newParams.toString();
    const path = newSearchQuery
      ? `/products/filter?${newSearchQuery}`
      : "/products/filter";
    navigate(path, { replace: true });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.trim() === "" && searchParams.get("keyword")) {
      updateKeywordFromUrl("");
    }
  };

  const handleClear = () => {
    setKeyword("");
    updateKeywordFromUrl("");
  };

  return (
    <div className="w-96 relative">
      <form onSubmit={handleSearchInput}>
        <input
          type="text"
          className="bg-gray-200  focus:outline-none py-2 ps-10 text-black text-sm w-full rounded-full"
          placeholder="Search products..."
          value={keyword}
          onChange={handleInputChange}
        />
        <Search size={20} className="absolute top-2 left-2 text-black" />
        {keyword && (
          <X
            size={20}
            className="absolute top-2 right-3 text-black cursor-pointer" 
            onClick={handleClear}
          />
        )}
      </form>
    </div>
  );
};

export default SearchBox;
