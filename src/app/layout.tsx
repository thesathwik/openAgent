import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenAgents | A Living Workspace for AI Agents",
  description: "The platform where ideas become agents—and agents transform industries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
