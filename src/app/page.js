"use client";

import Link from "next/link";
import Image from "next/image";
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
import { useEffect, useState } from "react";
import MapComponent from "@/components/Map";
import { useRouter } from "next/navigation";
import { getBasicListings } from "@/lib/firestore";
import Stars from "@/components/ui/Stars";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [spaces, setSpaces] = useState([]);

  const mapSpots = spaces
  .filter(space => space.location) // ensure location exists
  .map(space => ({
    id: space.id,
    name: space.name,
    lat: space.location.lat || space.location.latitude,
    lng: space.location.lng || space.location.longitude,
  }));


  //retireve listings from DB
  useEffect(() => {
    getBasicListings()
      .then((spaces) => {
        console.log("Fetched data:", spaces);
        setSpaces(spaces);
      })
      .catch(console.error);
  }, []);

  //navigate to directory of listings
  const handleSpaceClick = () => {
    router.push(`/directory`);
  };

  

  //dummy data
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
    <main className="min-h-screen bg-gray-100 text-black pt-20 mb-8">
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
            <Button className="bg-white-600 hover:bg-blue-700 text-sm border">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto px-4 pb-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            onClick={handleSpaceClick}
            className="rounded-2xl shadow hover:shadow-lg transition"
          >
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
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 dark:text-blue-100 mt-16 px-4 sm:px-8 lg:px-36 text-center lg:text-left">
        Explore Study Spaces
      </h2>
      <section className="mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Map */}
          <div className="w-full lg:w-[49%] rounded-2xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
            <MapComponent spots={mapSpots}/>
          </div>

          {/* Carousel */}
          <div className="w-full lg:w-[49%] max-h-[500px] overflow-x-auto space-y-4">
            {spaces.map((space) => (
              <Link
                key={space.id}
                href={`/spaces/${space.id}`}
                className="block"
              >
                <Card className="flex min-w-[300px] bg-white backdrop-blur hover:shadow-lg transition-shadow">
                  <Image
                    src={`/images/${space.id}.png`}
                    width={400}
                    height={50}
                    className="w-40 h-full object-cover rounded-l"
                    alt={space.id}
                  />
                  <div className="flex flex-col justify-between p-4 flex-grow h-full">
                    <CardHeader>
                      <CardTitle>{space.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        {/* <MapPin className="w-4 h-4" />
                      {space.location} */}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* <p className="mb-4">{space.description}</p> */}
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{space.avgRating}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
            {/* {featuredSpaces.map((space, index) => (
              <Link key={index} href={`/spaces/${space.id}`} className="block">
                <Card className="min-w-[300px] bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-lg transition-shadow">
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
            ))} */}
          </div>
        </div>
      </section>

      {/* Chatbot Icon */}
      {/* <div className="fixed bottom-20 right-20 z-50 group"> */}
      <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 md:bottom-20 md:right-20 z-50 group">
        <div className="hidden sm:block absolute bottom-full mb-2 right-4 transform translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white text-black text-sm rounded-lg px-4 py-2 shadow-lg border border-gray-200 min-w-[150px] text-center">
            Hey there, I'm <span className="font-bold text-blue-600">Nook</span>
            ! Ask me about different study spaces near you!
          </div>
        </div>

        <Link href="/Chatbot">
          <BotMessageSquare className="w-16 h-16 text-blue-600 cursor-pointer hover:scale-110 transition-transform" />
        </Link>
      </div>
    </main>
  );
}
