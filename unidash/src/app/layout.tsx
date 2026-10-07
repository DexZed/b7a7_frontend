import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

import Footer from "@/components/footer";
import "./custom.css";
export const metadata: Metadata = {
  title: "University Dashboard",
  description: "University Dashboard Management System",
};
const libreBaskerville = localFont({
  src: [
    {
      path: "../fonts/variable/libre-baskerville-latin-ext-wght-normal.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "../fonts/variable/libre-baskerville-latin-ext-wght-italic.woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
  variable: "--font-libreBaskerville",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.className} h-full antialiased`}
    >
      <body>
        <main
          className="min-h-screen overlay"
          style={{
            backgroundImage: "url(/bg-2.jpg)",
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        >
          <div>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
