"use client"; 

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/userSlice";
import { RootState, AppDispatch } from "./redux/store";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>❌ {error}</p>;
  
  return <>{children}</>;
}
