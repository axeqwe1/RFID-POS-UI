import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  Navbar  from "./components/ui/navbar";
import { NavProvider } from "./contexts/NavContext";
import { PageTransition } from "./components/layout/PageTransition";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import localFont from 'next/font/local';
import { AlertProvider } from "./contexts/AlertContext";
import { CashierCalculatorProvider } from "./contexts/CashierCalculatorContext";
import { ModalLayout } from "./components/layout/ModalLayout";
import { OrderProvider } from "./contexts/OrderDetailsContext";
import { SignalRProvider } from "./contexts/SignalRContext";
// เพิ่มชุดไอคอนที่ต้องการใช้งาน
library.add(fas);
const kanitFont = localFont({
  src:"../public/fonts/Kanit-Regular.ttf"
})

export const metadata: Metadata = {
  title: "RFID Pos",
  description: "RFID SCANING POS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${kanitFont.className} antialiased m-0`}
      >
        <div className="w-full h-full">
          <SignalRProvider>
            <NavProvider>
                <OrderProvider>
                    <div className=" w-full h-[calc(100vh)] bg-gray-50">
                        <ModalLayout>
                          <PageTransition>
                              {children}
                          </PageTransition>
                        </ModalLayout>
                    </div>
                </OrderProvider>
            </NavProvider>
        </SignalRProvider>
        </div>
      </body>
    </html>
  );
}
