// app/(main)/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import Header from "@/shared/components/dashboard/Header";
import Sidebar from "@/shared/components/dashboard/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UAGRM",
  description: "Área interna del dashboard",
  icons: {
    icon: "/logo/favicon-16x16.png",
    shortcut: "/logo/favicon-16x16.png", // para accesos directos
    apple: "/logo/favicon-16x16.png",
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-5">{children}</main>
        </div>
      </div>
    </>
  );
}
