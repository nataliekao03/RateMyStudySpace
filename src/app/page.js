"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, MapPin, Search, Star, BotMessageSquare } from "lucide-react";
import { useState } from "react";
import MapComponent from "@/components/Map";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredSpaces = [
    {
      id: "library",
      title: "University Library",
      description: "Quiet study environment with individual desks",
      rating: 4.5,
      location: "Main Campus",
    },
    {
      id: "coffee-lounge",
      title: "Coffee House Study Lounge",
      description: "Cozy atmosphere with free WiFi",
      rating: 4.2,
      location: "Downtown",
    },
    {
      id: "student-center",
      title: "Student Center",
      description: "Group study rooms and collaborative spaces",
      rating: 4.0,
      location: "North Campus",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Rate My Study Space</h1>
          <p className="text-lg  mb-8">
            Find the perfect spot to study, work, or collaborate. Read reviews
            from fellow students and share your experiences.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for study spaces..."
                className="pl-12 pr-4 py-3 text-base rounded-xl shadow-sml"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-white-600 hover:bg-blue-700 text-sm">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto px-4 pb-20  lg:grid-cols-3 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="rounded-2xl shadow hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-xl">
                <MapPin className="inline w-4 h-4 mr-1" />
                Find Spaces
              </CardTitle>
              <CardDescription>
                Discover study spots near you with detailed information and
                reviews
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="rounded-2xl shadow hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="text-blue-600" />
                Rate & Review
              </CardTitle>
              <CardDescription>
                Share your experiences and help others find the best study
                spaces
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="rounded-2xl shadow hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="text-blue-600" />
                Study Better
              </CardTitle>
              <CardDescription>
                Find the perfect environment that matches your study style
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* mapview component Section */}

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-8">
          Browse Study Spaces
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map */}

          <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
            <MapComponent />
          </div>

          {/* Carousel */}

          <div className="flex-1 max-h-[500px] overflow-x-auto space-y-4">
            {featuredSpaces.map((space, index) => (
              <Link key={index} href={`/spaces/${space.id}`} className="block">
                <Card
                  key={index}
                  className="min-w-[300px] bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle>{space.title}</CardTitle>

                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />

                      {space.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="mb-4">{space.description}</p>

                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />

                      <span className="font-semibold">{space.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      {/* <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold  mb-8">Featured Study Spaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSpaces.map((space, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{space.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {space.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{space.description}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{space.rating}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Chatbot Icon */}
      <div className="fixed bottom-20 right-20 z-70">
        <Link href="/chatbot">
          <BotMessageSquare className="w-16 h-16 text-blue-600 cursor-pointer hover:scale-110 transition-transform" />
        </Link>
      </div>
    </main>
  );
}
