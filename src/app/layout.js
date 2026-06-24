import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StoreProvider from "@/store/StoreProvider";
import { Toaster } from "react-hot-toast";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "RS 3D Wallpaper & Floor — Premium Home Decor in Bangladesh",
  description:
    "Transform your space with premium 3D wallpapers, ceiling papers, and epoxy floors. RS 3D Wallpaper & Floor — Bangladesh's trusted home decor brand.",
  keywords: [
    "rs 3d wallpaper",
    "3D wallpaper",
    "ceiling paper",
    "epoxy floor",
    "home decor",
    "Bangladesh",
    "interior design",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-light text-dark font-body antialiased">
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#2C2C2C",
                color: "#FAF7F2",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: {
                style: {
                  background: "#4A7C6F",
                  color: "#FAF7F2",
                },
              },
              error: {
                style: {
                  background: "#C8956C",
                  color: "#FAF7F2",
                },
              },
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
