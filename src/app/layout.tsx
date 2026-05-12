import { ArticleProvider } from "@/context/ArticleContext";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INGN Nyheder",
  description: "Dansk nyhedsside",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ArticleProvider>
          <Navigation />
          {children}
          <Footer />
        </ArticleProvider>
      </body>
    </html>
  );
}
