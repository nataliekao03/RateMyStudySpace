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


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredSpaces = [
    {
      title: "University Library",
      description: "Quiet study environment with individual desks",
      rating: 4.5,
      location: "Main Campus",
    },
    {
      title: "Coffee House Study Lounge",
      description: "Cozy atmosphere with free WiFi",
      rating: 4.2,
      location: "Downtown",
    },
    {
      title: "Student Center",
      description: "Group study rooms and collaborative spaces",
      rating: 4.0,
      location: "North Campus",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-blue-100">
            Rate My Study Space
          </h1>
          <p className="text-xl text-blue-700 dark:text-blue-300 max-w-2xl mx-auto">
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
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="text-blue-600" />
                Find Spaces
              </CardTitle>
              <CardDescription>
                Discover study spots near you with detailed information and
                reviews
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
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

          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
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

      {/* Featured Spaces Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-8">
          Featured Study Spaces
        </h2>
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
      </section>

      {/* Chatbot Icon */}
      <div className="fixed bottom-20 right-20 z-70">
        <Link href="/chatbot">
            <BotMessageSquare className="w-16 h-16 text-blue-600 cursor-pointer hover:scale-110 transition-transform" />
        </Link>
      </div>


 

      
    </main>
  );
}
