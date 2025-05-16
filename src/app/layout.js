// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import ClientProviders from '../components/ClientProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rate My Study Space',
  description: 'Find and rate the best study spots near you',
  icons: { icon: '/rmss_logo_crop.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Only this single client‐side wrapper */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
