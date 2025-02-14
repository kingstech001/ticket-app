import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Event Ticket Booking",
  description: "Book your event tickets easily!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col sm:px-[20px]">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
