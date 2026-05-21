import type { RootState } from "@/store";
import { useCurrentUserQuery } from "@/store/slices/userApi";
import type React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const IsAdmin = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  const {
    data: user,
    isError,
    isLoading,
    isFetching,
  } = useCurrentUserQuery(undefined, {
    skip: !userInfo,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isLoading || isFetching) return;
    if (!userInfo || isError || user?.role !== "admin") {
      navigate("/");
    }
  }, [userInfo, isError, isLoading, isFetching, user, navigate]);
  if (isLoading || isFetching) return null;
  if (!userInfo || isError || user?.role !== "admin") return null;
  return <div>{children}</div>;
};

export default IsAdmin;
