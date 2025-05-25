import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Object Detector",
  description: "This serves as a thief detection Alarm also.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
