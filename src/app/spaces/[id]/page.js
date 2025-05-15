// app/spaces/[id]/page.js
"use client";

import { useParams } from "next/navigation";
import { Router } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SpaceDetailPage() {
  const { id } = useParams();

  return (
    <div className="container px-4 py-16">
      {/* Back Button */}
      <p className="text-left mt-4">
        <a href="/" className="text-blue-400">
          Back to Home
        </a>
      </p>
      <h1 className="text-3xl font-bold">Study Space Details</h1>
      <p className="mt-4">You are viewing details for space ID: {id}</p>
      {/* In a real app, fetch data from Firebase using this ID */}
      <Link href="/WriteReview">
        <Button variant="outline" className="text-black">
          Write a Review
        </Button>
      </Link>
    </div>
  );
}
