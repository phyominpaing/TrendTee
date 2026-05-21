import type { RootState } from "@/store";
import { clearUserInfo } from "@/store/slices/auth";
import { useCurrentUserQuery } from "@/store/slices/userApi";
import type React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const IsLogin = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  const { isError } = useCurrentUserQuery(undefined, {
    skip: !userInfo,
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo || isError) {
      navigate("/login");
      dispatch(clearUserInfo());
    }
  }, [dispatch, navigate, userInfo, isError]);
  if (!userInfo || isError) return null;
  return <div>{children}</div>;
};

export default IsLogin;
