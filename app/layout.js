import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://acme.com'),
  title: "CSS Gradient Generator | Create Stunning Backgrounds with Ease",
  description:
    "CSS Gradient Generator is a tool that allows users to create beautiful color gradients for their website backgrounds. With the help of a simple and intuitive interface, users can choose colors, direction, and gradient types to create unique and visually appealing designs. The tool provides options for linear and radial gradients, as well as support for multiple color stops. Users can easily copy and paste the generated CSS code into their projects and customize it to their liking. CSS Gradient Generator is a handy tool for web designers and developers who want to add a touch of style and creativity to their website designs.",
  openGraph: {
    title: "CSS Gradient Generator | Create Stunning Backgrounds with Ease",
    description: "CSS Gradient Generator is a tool that allows users to create beautiful color gradients for their website backgrounds. With the help of a simple and intuitive interface, users can choose colors, direction, and gradient types to create unique and visually appealing designs. The tool provides options for linear and radial gradients, as well as support for multiple color stops. Users can easily copy and paste the generated CSS code into their projects and customize it to their liking. CSS Gradient Generator is a handy tool for web designers and developers who want to add a touch of style and creativity to their website designs.",
    url: "https://nextjs.org",
    siteName: "CSS Gradient Generator | Create Stunning Backgrounds with Ease",
    images: [
      {
        url: "/images/CSS-Gradient-Generator-Create-Stunning-Backgrounds-with-Ease.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "/images/CSS-Gradient-Generator-Create-Stunning-Backgrounds-with-Ease.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "CSS Gradient Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
