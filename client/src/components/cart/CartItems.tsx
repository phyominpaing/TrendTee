import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemsProps {
  name: string;
  size: string;
  color: string;
  image: string;
  price: number;
}
const CartItems = ({ name, size, color, image, price }: CartItemsProps) => {
  return (
    <div className="flex justify-between border-b border-b-gray-300 pb-4">
      <div className="flex items-center gap-2">
        <img src={image} alt={name} className="w-24 h-24 rounded-md" />
        <div className="flex flex-col ">
          <span className="text-base font-semibold">{name}</span>
          <span className="text-xs font-medium text-gray-500">
            Size - {size}
          </span>
          <span className="text-xs font-medium text-gray-500">
            Color - {color}
          </span>
          <span className="font-semibold mt-1 text-lg">${price}</span>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end ">
        <Trash2 className="w-6 h-6 text-red-600" />
        <div className=" flex items-center gap-3">
          <button className="bg-black p-2 rounded-full text-white">
            <Plus size={14} />
          </button>
          <span className="font-medium">1</span>
          <button className="bg-black p-2 rounded-full text-white">
            <Minus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
