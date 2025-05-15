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
  <div className="bg-gray-100 min-h-screen py-10">
  <ProtectedRoute>
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
      {/* Top Navigation Tabs */}
      <div className="flex justify-around mb-6 text-gray-600 text-sm font-semibold">
        <span>Explore</span>
        <span>Categories</span>
        <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Places</span>
        <span>Profile</span>
      </div>

      {/* Profile Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="/avatar.png" // Replace with actual avatar path
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">Emma Hayes</h2>
            <p className="text-gray-600">@EmmaHayes12</p>
            <p className="text-gray-500 text-sm">emmahayes@gmail.com</p>
          </div>
        </div>
        <button
          onClick={handleSettings}
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100"
        >
          Settings
        </button>
      </div>

      {/* Previously Reviewed */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Previously Reviewed</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium">Five Study</p>
            <p className="text-sm text-gray-500">Oval, New York</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium">OVALSTUDY</p>
            <p className="text-sm text-gray-500">Oval, New York</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium">OVALSTUDY</p>
            <p className="text-sm text-gray-500">Oval, New York</p>
          </div>
        </div>
      </div>

      {/* Favorites */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Your Favourite</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium">Five Study</p>
            <p className="text-sm text-gray-500">Oval, New York</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium">Five Study</p>
            <p className="text-sm text-gray-500">Oval, New York</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium">Five Study</p>
            <p className="text-sm text-gray-500">Oval, New York</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  </ProtectedRoute>
</div>
  );
}
