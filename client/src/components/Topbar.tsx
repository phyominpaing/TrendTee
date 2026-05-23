import { LogIn, ShoppingCart, User } from "lucide-react";
import SearchBox from "../common/SearchBox";
import { Link, useNavigate } from "react-router";
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
import { apiSlice } from "@/store/slices/api";
import { useCurrentUserQuery, useLogoutMutation } from "@/store/slices/userApi";
import { useEffect } from "react";

interface TopbarProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}
const Topbar = ({ isCartOpen, toggleCart }: TopbarProps) => {
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const productsInCart = useSelector(
    (state: RootState) => state.cart.items.length,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: currentUser,
    isError,
    isFetching,
  } = useCurrentUserQuery(undefined, {
    skip: !userInfo,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isError) {
      dispatch(clearUserInfo());
      navigate("/");
    }
  }, [dispatch, isError, navigate]);

  const logoutHandler = async () => {
    try {
      await logoutMutation({}).unwrap();
      dispatch(apiSlice.util.resetApiState());
      dispatch(clearUserInfo());
      toast.success("Logout successful.");
      navigate("/");
    } catch {
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
          <div className="relative">
            <ShoppingCart onClick={toggleCart} size={24} />
            {productsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {productsInCart}
              </span>
            )}
          </div>
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
                  {!isFetching && currentUser?.role === "admin" && (
                    <DropdownMenuItem className=" cursor-pointer">
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
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
