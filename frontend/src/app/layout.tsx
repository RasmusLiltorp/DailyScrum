import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DailyScrum",
    template: "%s | DailyScrum"
  },
  description: "Manage your team's daily standup meetings efficiently with DailyScrum",
  keywords: ["daily standup", "scrum", "team management", "meetings", "agile"],
  authors: [{ name: "Rasmus Liltorp" }],
  creator: "Rasmus Liltorp",
  publisher: "Rasmus Liltorp",
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
        {children}
      </body>
    </html>
  );
}
