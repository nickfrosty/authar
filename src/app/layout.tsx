import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE, TWITTER } from "@/lib/const/general";

const inter = Inter({ subsets: ["latin"] });

/**
 * Set the global default metadata for the entire site.
 * These values will be used unless explicity overridden
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  openGraph: {
    siteName: SITE.name,
    type: "website",
    // images: "/opengraph-image",
  },
  twitter: {
    site: TWITTER.handle,
    creator: TWITTER.handle,
    card: "summary_large_image",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "technology",
  // todo: set robots, when needed
  // robots: {},

  // set a default title and description for every page
  title: `${SITE.name} - home`,
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
