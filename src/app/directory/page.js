"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Stars from "@/components/ui/Stars";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getBasicListings } from "@/lib/firestore";

export default function directoryPage() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    getBasicListings()
      .then((spaces) => {
        console.log("Fetched data:", spaces);
        setSpaces(spaces);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* header */}
      <div className="w-full h-96 flex items-center justify-center">
        <h1 className="text-3xl font-bold">Directory</h1>
      </div>
      {/* study space listings */}
      <div className="mx-auto px-4 pb-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spaces.map((space) => (
            <Link key={space.id} href={`/spaces/${space.id}`}>
              <Card className="rounded-2xl shadow hover:shadow-lg transition">
                <Image
                  src={`/images/${space.id}.png`}
                  width={400}
                  height={50}
                  className="w-full h-48 object-cover"
                  alt=""
                />
                <CardHeader>
                  <CardTitle>{space.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1">
                    {/* <Star rating={space.avgRating} />
                    <span className="text-sm text-gray-600 ml-1">
                      {" "}
                      {space.reviews.length} reviews
                    </span> */}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
