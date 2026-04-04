import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="w-96 relative">
      <form action="">
        <input
          type="text"
          className="bg-gray-200  focus:outline-none py-2 ps-10 text-black text-sm w-full rounded-full"
        />
        <Search size={20} className="absolute top-2 left-2 text-black" />
      </form>
    </div>
  );
};

export default SearchBox;
