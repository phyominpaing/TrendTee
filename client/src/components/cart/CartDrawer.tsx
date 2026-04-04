import { X } from "lucide-react";
import CartItems from "./CartItems";

interface CartDrawerProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}

const products = [
  {
    id: 1,
    name: "Black T-shirt",
    price: 200,
    category: "T-shirts",
    size: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    rating: 4,
    images: [
      {
        url: "https://iili.io/FCGxQTv.png",
      },
      {
        url: "https://iili.io/FCGxQTv.png",
      },
    ],
  },
  {
    id: 2,
    name: "Black Hoodie",
    price: 300,
    category: "Hoodies",
    size: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    rating: 5,
    images: [
      {
        url: "https://iili.io/FCGxQTv.png",
      },
      {
        url: "https://iili.io/FCGxQTv.png",
      },
    ],
  },
  {
    id: 3,
    name: "Taiwan Jeans",
    price: 200,
    category: "Jeans",
    size: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    rating: 3,
    images: [
      {
        url: "https://iili.io/FCGxQTv.png",
      },
      {
        url: "https://iili.io/FCGxQTv.png",
      },
    ],
  },
  {
    id: 4,
    name: "Shorts",
    price: 100,
    category: "Shorts",
    size: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    rating: 4,
    images: [
      {
        url: "https://iili.io/FCGxQTv.png",
      },
      {
        url: "https://iili.io/FCGxQTv.png",
      },
    ],
  },
  {
    id: 5,
    name: "Black Shirt",
    price: 150,
    category: "Shirt",
    size: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    rating: 5,
    images: [
      {
        url: "https://iili.io/FCGxQTv.png",
      },
      {
        url: "https://iili.io/FCGxQTv.png0",
      },
    ],
  },
];

const CartDrawer = ({ isCartOpen, toggleCart }: CartDrawerProps) => {
  return (
    <div
      className={`bg-white fixed top-0 right-0 w-1/4 h-full transform transition-transform duration-300 z-50 p-4 flex flex-col ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end">
        <X size={24} onClick={toggleCart} className="cursor-pointer " />
      </div>

      <h2 className="text-xl font-semibold my-4 uppercase">Your Cart</h2>

      <div className="space-y-4 flex-1  overflow-y-auto  scrollbar-hide">
        {products.map((product) => (
          <CartItems
            key={product.id}
            name={product.name}
            size={product.size[0]}
            color={product.colors[0]}
            image={product.images[0].url}
            price={product.price}
          />
        ))}
      </div>
      <button className="bg-black w-full py-4 text-white rounded-md fixed bottom-1 left-0 ">
        Go to Checkout
      </button>
    </div>
  );
};

export default CartDrawer;
