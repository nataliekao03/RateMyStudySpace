import ProtectedRoute from "@/components/ProtectedRoute";

export default function page() {
  return (
    <div>
      <ProtectedRoute>
        <h1 className="text-4xl font-bold text-center mt-10">Settings</h1>
        {/* Notification settings  */}
        {/* Change appearance    */}
        {/* Delete account Button */}
      </ProtectedRoute>
    </div>
  );
}
