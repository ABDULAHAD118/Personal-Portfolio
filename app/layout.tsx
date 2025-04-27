import type { Metadata } from "next";
import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const OutfitFont = Outfit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const OvoFont = Ovo({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio || Abdulahad Hussain",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${OutfitFont.className} ${OvoFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
