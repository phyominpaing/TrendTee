import type { RootState } from "@/store";
import type React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const IsLogin = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);
  return <div>{children}</div>;
};

export default IsLogin;
