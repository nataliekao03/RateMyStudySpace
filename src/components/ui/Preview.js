// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-600">
        StudySpaceFinder
      </Link>

      <nav className="space-x-6">
        <Link href="/directory" className="text-gray-700 hover:text-blue-600">
          Directory
        </Link>
      </nav>
    </header>
  );
}



// const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
//   <p
//     ref={ref}
//     className={cn("text-sm text-muted-foreground", className)}
//     {...props}
//   />
// ));

// export {
//   Card,
//   CardHeader,
//   CardFooter,
//   CardTitle,
//   CardDescription,
//   CardContent,
// };