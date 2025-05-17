import ProtectedRoute from "@/components/ProtectedRoute";

export default function page() {
  return (
    <div>
      <ProtectedRoute>
        <h1 className="text-4xl font-bold text-center mt-10 py-20">Settings</h1>
        <h1 className="text-3xl font-bold text-center mt-10 py-20">
          To be made...
        </h1>
        {/* Notification settings  */}
        {/* Change appearance    */}
        {/* Delete account Button */}
      </ProtectedRoute>
    </div>
  );
}
