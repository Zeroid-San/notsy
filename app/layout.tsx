import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notsy — Your notes, organized.",
  description: "A clean, fast workspace for your notes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}