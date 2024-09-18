import type { Metadata } from "next";
import "./globals.css";
import { SessionAuthorize } from "@/components/SessionAuthorize";

export const metadata: Metadata = {
  title: "Encantada"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`text-black antialiased bg-violet-100	`}
      >
        <SessionAuthorize>
          {children}
        </SessionAuthorize>
      </body>
    </html>
  );
}
