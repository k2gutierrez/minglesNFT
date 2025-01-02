import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// NOTE: I like to put font in public/fonts, however technically font files can be colocated inside of `pages`
const pressura = localFont({ 
  src: '../../public/assets/GT-Pressura-Mono.otf',
  variable: '--font-pressura',
})
const hogfish = localFont({ 
  src: '../../public/assets/Hogfish DEMO.otf',
  variable: '--font-hogfish'
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mingles",
  description: "What's your Mingle",
  icons: {
    icon: '/favicon.ico', // /public path
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${hogfish.variable} ${hogfish.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
