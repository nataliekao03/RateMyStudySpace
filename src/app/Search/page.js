import ProtectedRoute from "@/components/ProtectedRoute";
export default function page() {
  return (
    <div>
      <ProtectedRoute>
        <h1 className="text-4xl font-bold text-center mt-10">Search</h1>
        {/* Search bar w/dropdown? */}
        {/* Sort Button */}
        {/* Filter Button */}
        {/* List of study spaces */}
      </ProtectedRoute>
    </div>
  );
}
