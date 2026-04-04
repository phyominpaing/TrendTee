import CartDrawer from "../components/cart/CartDrawer";
import SecondaryBar from "../components/SecondaryBar"
import Topbar from "../components/Topbar"
import { useState } from "react";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <nav>
        <Topbar isCartOpen={isCartOpen} toggleCart={toggleCart} />
        <SecondaryBar/>
        <CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart}/>
    </nav>
  )
}

export default Navbar