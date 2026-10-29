import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

/* Body font: clean and highly readable. */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/* Display font: a distinctive grotesk for headlines and big numbers. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

const SITE_TITLE = "VanHaus | Custom Software & AI for Small Businesses | Madison, NJ";
const SITE_DESCRIPTION =
  "VanHaus builds custom software and AI for small businesses. AI receptionists, proposal tools, integrations, dashboards, and fast websites. Based in Madison, NJ. Serving New Jersey and the NYC area. Discovery is always free.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vanhaus.dev"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://vanhaus.dev",
    siteName: "VanHaus",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${bricolage.variable}`}
    >
      <body className="bg-bg font-sans text-text">
        {/* Marks that JS is running so scroll reveals can safely hide content until they fire. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
