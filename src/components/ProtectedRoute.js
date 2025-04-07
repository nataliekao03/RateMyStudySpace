"use client";
import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/Login");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;

  return user ? children : null;
};

export default ProtectedRoute;
