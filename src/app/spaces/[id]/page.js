// app/spaces/[id]/page.js
"use client";

import { useParams } from "next/navigation";

export default function SpaceDetailPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Study Space Details</h1>
      <p className="mt-4">You are viewing details for space ID: {id}</p>
      {/* In a real app, fetch data from Firebase using this ID */}
    </div>
  );
}
