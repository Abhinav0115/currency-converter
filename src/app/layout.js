import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Currency Converter",
    description:
        "A simple currency converter built with Next.js and Tailwind CSS.",
    // url: "https://currency-converter-ten.vercel.app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
