import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Modern Blog CMS",
  description: "A modern blog CMS built with Next.js and MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        <Providers>
          <Navbar />
          <main className="pt-16">
            <Container className="py-8 px-4 sm:px-6 lg:px-8">
              {children}
            </Container>
          </main>
        </Providers>
      </body>
    </html>
  );
}
