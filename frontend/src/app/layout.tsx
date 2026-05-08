import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Roamora | AI Travel Operating System",
  description: "Plan, book, and manage complete travel experiences with AI. Hotels, vehicles, itineraries — all in one intelligent platform.",
  keywords: "AI travel, hotel booking, trip planning, travel itinerary, vehicle rental",
  openGraph: {
    title: "Roamora | AI Travel Operating System",
    description: "Your intelligent AI travel companion. Book hotels, rent vehicles, plan itineraries.",
    type: "website",
  },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
