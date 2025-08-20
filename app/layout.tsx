import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarLayoutWrapper from "./components/SidebarLayoutWrapper";
import RootProvider from "./providers/RootProvider";
import Drawer from "./components/Drawer";
import ConfirmationDialogue from "./components/ConfirmationDialogue";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CX Research Prototype",
  description: "A work in progress next application with the intention of facilitating customer research",
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
        <RootProvider>
          <SidebarLayoutWrapper>
            {children}
            <Drawer />
            <ConfirmationDialogue />
          </SidebarLayoutWrapper>
        </RootProvider>
      </body>
    </html>
  );
} 
