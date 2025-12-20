import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import FloatingContactButtons from "@/components/FloatingContactButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grace Garden - Professional Elder Care & Assisted Living in Wayanad, Kerala",
  description: "Grace Garden offers compassionate assisted living and home care services for seniors in Wayanad, Kerala. 24/7 medical care, nutritious meals, cultural activities, and comfortable accommodation options in a serene environment.",
  keywords: ["elder care Wayanad", "assisted living Kerala", "senior care Wayanad", "old age home Kerala", "home care services Wayanad", "elderly care facility", "retirement home Kerala", "Grace Garden"],
  authors: [{ name: "Grace Garden" }],
  creator: "Grace Garden",
  publisher: "Grace Garden",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual code
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/site-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  openGraph: {
    type: 'website',
    url: 'https://gracegarden.co.in',
    title: 'Grace Garden - Professional Elder Care & Assisted Living',
    description: 'Compassionate assisted living and home care services for seniors in Wayanad, Kerala.',
    siteName: 'Grace Garden',
    images: [
      {
        url: 'https://gracegarden.co.in/images/Logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Grace Garden Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grace Garden - Elder Care Wayanad',
    description: 'Compassionate assisted living and home care services for seniors in Wayanad, Kerala.',
    images: ['https://gracegarden.co.in/images/Logo.jpg'],
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        {children}
        <Footer />
        <FloatingContactButtons />
      </body>
    </html>
  );
}
