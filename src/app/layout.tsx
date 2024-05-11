import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/layout/nav";
import { SessionProvider } from "next-auth/react";
import { BASE_PATH, auth } from "@/auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const session = await auth();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <SessionProvider basePath={BASE_PATH} session={session}>

      <body className={`${inter.className} dark `}>
        <Navbar/>
        <div className="mt-[10vh] max-w-screen-xl mx-auto">
        {children}
        </div>
      </body>   
       </SessionProvider>

    </html>
  );
}