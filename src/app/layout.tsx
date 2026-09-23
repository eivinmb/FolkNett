// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bakken som lytter",
  description:
    "Når et kvikkleireskred går, gjør vi fiberkablene under gatene om til kartet og ørene redningsmannskapene mangler. Besvarelse i Your Extreme 2026.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no" className="bg-background text-foreground">
      <body className={`${inter.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
