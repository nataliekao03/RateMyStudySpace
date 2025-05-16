"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/lib/useUser"; // hypothetical user hook
import ProtectedRoute from "@/components/ProtectedRoute";
import { db } from "@/lib/firebase"; // your firebase config
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { getDocs, updateDoc } from "firebase/firestore";
import { getDoc, query, orderBy } from "firebase/firestore";

export default function WriteReviewPage() {
  const searchParams = useSearchParams();
  //const spaceName = searchParams.get("id") || "Unknown Space";
  const { user } = useUser(); // get current user
  const router = useRouter();
  const id = searchParams.get("id");
  const spaceName = id || "Unknown Space";

  const [space, setSpace] = useState(null);

  const [rating, setRating] = useState(0);
  const [wifi, setWifi] = useState("");
  const [noise, setNoise] = useState("");
  const [hoursSpent, setHoursSpent] = useState("");
  const [rush, setRush] = useState("");
  const [comment, setComment] = useState("");

  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setSubmitStatus("You must be logged in to submit a review.");
      return;
    }

    try {
      if (!db) {
  throw new Error("Firestore db is undefined");
}
      const spaceRef = doc(db, "study_spaces", id);
      const reviewsRef = collection(spaceRef, "reviews");

      // Add new review
      await addDoc(reviewsRef, {
        rating,
        wifi,
        noise,
        hoursSpent,
        rush,
        comment,
        timestamp: serverTimestamp(),
        userId: user.uid,
      });

      // Fetch all reviews to recalculate avgRating
      const reviewsSnapshot = await getDocs(reviewsRef);
      const ratings = reviewsSnapshot.docs.map((doc) => doc.data().rating);
      const newAvgRating =
        ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length;

      // Update avgRating field in study space document
      await updateDoc(spaceRef, {
        avgRating: parseFloat(newAvgRating.toFixed(2)), // round to 2 decimals
      });

      setSubmitStatus("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review or updating avgRating:", error);
      setSubmitStatus("Error submitting review. Try again.");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchSpace = async () => {
      try {
        const docRef = doc(db, "study_spaces", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSpace(docSnap.data());
        } else {
          console.warn("No such study space found!");
        }
      } catch (err) {
        console.error("Error fetching space:", err);
      }
    };

    fetchSpace();
  }, [id]);

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto py-28 px-4">
        <p className="text-left mt-4 mb-4">
          <a onClick={() => router.back()} className="text-blue-400">
            ← Go Back
          </a>
        </p>
        <h1 className="text-4xl font-bold text-center mb-10">
          Writing a Review for {spaceName || "Unknown Space"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Rating */}
          <div>
            <label className="text-xl font-semibold block mb-2">
              Star Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Wifi */}
          <div>
            <label className="text-xl font-semibold block mb-2">
              How was the WiFi?
            </label>
            <select
              className="border border-gray-300 rounded p-2 w-full"
              value={wifi}
              onChange={(e) => setWifi(e.target.value)}
              required
            >
              <option value="">Select one</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
              <option value="did not use it">Did not use it</option>
            </select>
          </div>

          {/* Noise */}
          <div>
            <label className="text-xl font-semibold block mb-2">
              Noise Levels
            </label>
            <select
              className="border border-gray-300 rounded p-2 w-full"
              value={noise}
              onChange={(e) => setNoise(e.target.value)}
              required
            >
              <option value="">Select one</option>
              <option value="quiet">Quiet</option>
              <option value="moderate">Moderate</option>
              <option value="loud">Loud</option>
            </select>
          </div>

          {/* Hours spent */}
          <div>
            <label className="text-xl font-semibold block mb-2">
              Hours Spent
            </label>
            <input
              type="number"
              min="0"
              value={hoursSpent}
              onChange={(e) => setHoursSpent(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>

          {/* Rush */}
          <div>
            <label className="text-xl font-semibold block mb-2">
              Crowd Level
            </label>
            <select
              className="border border-gray-300 rounded p-2 w-full"
              value={rush}
              onChange={(e) => setRush(e.target.value)}
              required
            >
              <option value="">Select one</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Review Comment */}
          <div>
            <label className="text-xl font-semibold block mb-2">
              Write a Review
            </label>
            <textarea
              className="border border-gray-300 rounded p-2 w-full h-32"
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
          >
            Submit Review
          </button>

          {/* Status */}
          {submitStatus && (
            <p className="mt-4 text-center text-green-600">{submitStatus}</p>
          )}
        </form>
      </div>
    </ProtectedRoute>
  );
}
