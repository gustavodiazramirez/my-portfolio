import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gustavo Díaz - Portafolio",
  description: "Portafolio profesional de Gustavo Díaz Ramírez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased relative bg-background`}>
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-blob/10 rounded-full filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-blob/5 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-blob/10 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-blob/10 rounded-full filter blur-3xl animate-blob animation-delay-6000" />
        </div>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
