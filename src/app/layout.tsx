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
  title: "Lourdes Matha Ayurvedic Hospital - Authentic Ayurvedic Treatment in Wayanad, Kerala",
  description: "Lourdes Matha Ayurvedic Hospital offers authentic Panchakarma therapies, traditional Ayurvedic treatments, and holistic wellness programs in Wayanad, Kerala. Expert doctors, personalized care, and natural healing in a serene environment.",
  keywords: ["Ayurvedic hospital Wayanad", "Panchakarma treatment Kerala", "Ayurvedic therapy Wayanad", "traditional Ayurveda Kerala", "Ayurvedic wellness center", "holistic healing Wayanad", "Ayurvedic doctors Kerala", "Lourdes Matha Ayurveda"],
  authors: [{ name: "Lourdes Matha Ayurvedic Hospital" }],
  creator: "Lourdes Matha Ayurvedic Hospital",
  publisher: "Lourdes Matha Ayurvedic Hospital",
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
      { url: '/icon.jpg' },
    ],
    apple: [
      { url: '/icon.jpg' },
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
    url: 'https://lourdesmatha.com',
    title: 'Lourdes Matha Ayurvedic Hospital - Authentic Ayurvedic Treatment',
    description: 'Authentic Panchakarma therapies and traditional Ayurvedic treatments in Wayanad, Kerala.',
    siteName: 'Lourdes Matha Ayurvedic Hospital',
    images: [
      {
        url: 'https://lourdesmatha.com/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Lourdes Matha Ayurvedic Hospital Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lourdes Matha Ayurvedic Hospital - Wayanad',
    description: 'Authentic Panchakarma therapies and traditional Ayurvedic treatments in Wayanad, Kerala.',
    images: ['https://lourdesmatha.com/images/logo.jpeg'],
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
