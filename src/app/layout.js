import { Nunito, Poppins } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/common/Header";
import BottomNav from "../components/common/BottomNav";
import MobileDebugLogger from "../components/debug/MobileDebugLogger";
import { ShopProvider } from "@/context/ShopContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});
export const metadata = {
  title: "myundiyal",
  description: "Mobile-first eCommerce experience",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${poppins.variable} ${nunito.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            <ShopProvider>
              <Header />
              {children}
              <MobileDebugLogger />
              <BottomNav />
            </ShopProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
