import Link from "next/link";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Rate My Study Space
        </Link>
        <div className="space-x-4">
          <Link href="/Profile">
            <Button variant="outline" className="text-white">
              Profile
            </Button>
          </Link>
          <Link href="/Search">
            <Button variant="outline" className="text-white">
              Search Study Spaces
            </Button>
          </Link>
          <Link href="/WriteReview">
            <Button variant="outline" className="text-white">
              Write a Review
            </Button>
          </Link>
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
