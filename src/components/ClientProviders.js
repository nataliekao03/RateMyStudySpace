'use client';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function ClientProviders({ children }) {
  return (
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
  );
}
