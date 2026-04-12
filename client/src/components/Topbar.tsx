import { LogIn, ShoppingCart, User } from "lucide-react";
import SearchBox from "../common/SearchBox";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { clearUserInfo } from "@/store/slices/auth";
import { useLogoutMutation } from "@/store/slices/userApi";

interface TopbarProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}
const Topbar = ({ isCartOpen, toggleCart }: TopbarProps) => {
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await logoutMutation({}).unwrap();
      dispatch(clearUserInfo());
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <main className="text-white bg-black py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to={"/"} className="text-2xl font-medium">
          TrendTee
        </Link>
        <SearchBox />
        <div className="flex items-center gap-4 cursor-pointer">
          <ShoppingCart onClick={toggleCart} size={24} />
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="p-0 bg-transparent border-0 rounded-none shadow-none ring-0 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
                >
                  <User size={24} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
              // onCloseAutoFocus={(event) => event.preventDefault()}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className=" cursor-pointer">
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className=" cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={logoutHandler}
                  disabled={isLoading}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <LogIn size={24} />
            </Link>
          )}
        </div>
      </div>

      {/* Cart Overlay  */}
      <div
        onClick={toggleCart}
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
    </main>
  );
};

export default Topbar;
