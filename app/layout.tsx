import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  Navbar  from "./components/ui/navbar";
import { NavProvider } from "./contexts/NavContext";
import { PageTransition } from "./components/layout/PageTransition";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import localFont from 'next/font/local'
// เพิ่มชุดไอคอนที่ต้องการใช้งาน
library.add(fas);
const kanitFont = localFont({
  src:"../public/fonts/Kanit-Regular.ttf"
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanitFont.className} antialiased m-0`}
      >
        <NavProvider>
          <Navbar />
            <div className="w-full h-[calc(100vh)] pt-[85px] bg-gray-50">
              <PageTransition>{children}</PageTransition>
            </div>
        </NavProvider>
      </body>
    </html>
  );
}
