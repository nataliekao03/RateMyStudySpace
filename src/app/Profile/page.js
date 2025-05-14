"use client";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/Login"); // Redirect to login page after logout
    } catch (err) {
      console.error("Error logging out: ", err.message);
    }
  };

  const handleSettings = async () => {
    router.push("/Settings");
  };

  return (
    <div className="pt-20">
      <ProtectedRoute>
        <h1 className="text-4xl font-bold text-center mt-10">User Profile</h1>
        {/* Profile pic */}

        {/* Name */}

        {/* Set Display Username */}
        {/* Previously Reviewed Spots - Carousel */}
        {/* Favorited Spots - Carousel */}
        {/* Settings Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full"
          >
            More Settings
          </button>
        </div>
        {/* Logout Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full"
          >
            Logout
          </button>
        </div>
      </ProtectedRoute>
    </div>
  );
}
