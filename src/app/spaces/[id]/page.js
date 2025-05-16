"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Star, House } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Stars from "@/components/ui/Stars";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function SpaceDetailPage() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [reviews, setReviews] = useState([]);
  const MapComponent = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const docRef = doc(db, "study_spaces", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSpace(docSnap.data());
        }

        const reviewsRef = collection(db, "study_spaces", id, "reviews");
        const q = query(reviewsRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        const reviewList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewList);
      } catch (err) {
        console.error("Error loading space details:", err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container px-4 py-24">
      {/* Back Button */}
      {/* <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </div> */}

      {/* Header */}
      <div className="w-full relative mb-8 h-64 rounded-xl overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <Image
          src={`/images/${id}.png`}
          alt={id}
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10" />

        {/* Text Content */}
        <div className="absolute bottom-4 left-6 z-20 text-white">
          <h1 className="text-3xl font-bold">{space?.name || "Study Space"}</h1>
          {reviews.length > 0 && (
            <div className="mt-2 flex items-center gap-2 text-amber-300">
              {/* <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" /> */}
              <Stars rating={space?.avgRating?.toFixed(1)} />
              {/* <span className="text-lg font-semibold">
                {space?.avgRating?.toFixed(1)}
              </span> */}
              {/* <span className="text-sm text-gray-300">
                ({reviews.length} review{reviews.length > 1 ? "s" : ""})
              </span> */}
            </div>
          )}
        </div>
        {/* Write Review Button */}
        <div className="absolute bottom-0 right-6 z-10">
          <div className="text-center mb-8">
            <Link href={`/WriteReview?id=${id}`}>
              <Button className=" bg-sky-400 text-white hover:bg-sky-800">
                Write a Review
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-2xl font-semibold m-5">
        <House />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="font-bold text-decoration-line: underline">
              <BreadcrumbPage>{space?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Reviews + Map Side-by-Side */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Reviews Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">
            Browse {reviews.length} Review{reviews.length > 1 ? "s" : ""}
          </h2>
          {reviews.length === 0 && (
            <p className="text-gray-500 italic">
              No reviews yet. Be the first!
            </p>
          )}

          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1 my-4 text-yellow-500">
                    {/* <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{review.rating}/5</span> */}
                    <Stars rating={review.rating} />
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(
                      review.timestamp?.seconds * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-800 mb-2">{review.comment}</p>
                <div className="text-sm text-gray-600">
                  <p>Wifi: {review.wifi}</p>
                  <p>Noise: {review.noise}</p>
                  <p>Rush: {review.rush}</p>
                  <p>Hours Spent: {review.hoursSpent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full lg:w-[500px]">
          {space?.location ? (
            <MapComponent
              spots={[{ id, name: space.name, ...space.location }]}
            />
          ) : (
            <div className="text-center text-gray-500">
              No location data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
