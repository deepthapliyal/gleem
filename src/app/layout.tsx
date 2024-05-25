import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/layout/nav";
import { SessionProvider } from "next-auth/react";
import { BASE_PATH, auth } from "@/auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gleem | Buy high-quality [product category] at affordable prices",
  description: "Discover a wide range of stylish and functional products. Shop now & enjoy free shipping on orders with low prices!",
};

export default  async function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
     <SessionProvider basePath={BASE_PATH} session={session}>

      <body className={`${inter.className} dark `}>
        <Navbar/>
        <div className="mt-[10vh] max-w-7xl  mx-auto">
        {children}
        </div>
      </body>   
       </SessionProvider>

    </html>
  );
}
