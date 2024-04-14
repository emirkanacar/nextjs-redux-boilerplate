"use client"

import {Raleway} from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";

const raleway = Raleway({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <StoreProvider>
      <body className={raleway.className}>{children}</body>
    </StoreProvider>
    </html>
  );
}
