import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IMDB Clone",
  description: "By Neerav",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className>
        <Providers>
        <Header/> 
        <Navbar/>
        <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
