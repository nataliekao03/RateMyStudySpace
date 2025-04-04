"use client";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
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

  return (
    <div>
      <ProtectedRoute>
        <h1 className="text-4xl font-bold text-center mt-10">Profile</h1>
        {/* Profile pic */}
        {/* Username */}
        {/* Previously Reviewed Spots - Carousel */}
        {/* Favorited Spots - Carousel */}
        {/* Settings Button */}

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
