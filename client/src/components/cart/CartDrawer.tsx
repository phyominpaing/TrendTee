import { X } from "lucide-react";
import CartItems from "./CartItems";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Button } from "../ui/button";
import { clearCart } from "@/store/slices/cart";
import { useCreateCheckOutSessionMutation } from "@/store/slices/orderApi";

interface CartDrawerProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartDrawer = ({ isCartOpen, toggleCart }: CartDrawerProps) => {
  const products = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const productInCart = useSelector(
    (state: RootState) => state.cart.items.length,
  );

  const [createCheckOutSession, { isLoading }] =
    useCreateCheckOutSessionMutation();

  const bill = products.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );

  const checkoutHandler = async () => {
    try {
      const {url} = await createCheckOutSession({
        items: products,
        bill: bill,
      }).unwrap();

      window.location.href = url;

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`bg-white fixed top-0 right-0 w-1/4 h-full transform transition-transform duration-300 z-50 p-4 flex flex-col border-l-2  border-l-gray-200 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end cursor-pointer">
        <X size={24} onClick={toggleCart} />
      </div>

      <div className="my-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold  uppercase">Your Cart</h2>
        {productInCart > 0 && (
          <Button
            onClick={() => dispatch(clearCart())}
            className="text-xs cursor-pointer"
            variant={"destructive"}
          >
            Clear All{" "}
          </Button>
        )}
      </div>

      <div className="space-y-4 flex-1  overflow-y-auto  scrollbar-hide">
        {products.map((product) => (
          <CartItems
            key={product.key}
            productKey={product.key!}
            name={product.name}
            size={product.size}
            color={product.color}
            image={product.image}
            price={Number(product.price)}
            quantity={product.quantity}
          />
        ))}
        {products.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <span className="text-gray-500 text-lg">Your cart is empty</span>
          </div>
        )}
      </div>

      {products.length > 0 && (
        <button
          onClick={checkoutHandler}
          disabled={isLoading}
          className="bg-black w-full py-4 text-white rounded-md cursor-pointer"
        >
          Go to Checkout
        </button>
      )}
    </div>
  );
};

export default CartDrawer;
