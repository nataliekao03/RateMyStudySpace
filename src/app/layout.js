import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic";
//import { AuthProvider } from "@/lib/AuthContext";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const AuthProvider = dynamic(
  () => import("@/lib/AuthContext").then((mod) => mod.AuthProvider),
  { ssr: false }
);

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rate My Study Space",
  description: "Find and rate the best study spots near you",
  icons: {
    icon: "/rmss_logo_crop.ico", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="min-h-screen flex flex-col justify-between">
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
