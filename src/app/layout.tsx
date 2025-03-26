import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });
export const metadata: Metadata = {
  title: "RS-DECOR | Best 3D Wallpapers Design in Bangladesh",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Navbar />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
