"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "@/lib/firebase"; // Adjust path to your Firebase config

const Navbar = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="hidden sm:flex items-center gap-2 text-2xl font-bold"
        >
          Rate My Study Space
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Image
              src="/rmss_logo_crop.png"
              width={48}
              height={48}
              alt="logo"
            />
          </Link>
        </div>

        <div className="space-x-4">
          <Link href={user ? "/Profile" : "/Login"}>
            <Button variant="outline" className="text-white">
              {user ? "Profile" : "Login"}
            </Button>
          </Link>
          {/* <Link href="/Search">
            <Button variant="outline" className="text-white">
              Search Study Spaces
            </Button>
          </Link> */}
          {/* <Link href="/WriteReview">
            <Button variant="outline" className="text-white">
              Write a Review
            </Button>
          </Link> */}
          {/* <Link href="/Map">
            <Button variant="outline" className="text-white">
              Map View
            </Button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
