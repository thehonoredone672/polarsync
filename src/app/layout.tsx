import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "PolarSync — India's Polar Science Portal",
  description: "Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal. Explore research, datasets, media and stories from India's polar missions.",
  keywords: "polar science, Antarctica, Arctic, Himalayas, NCPOR, research, datasets, expeditions, India",
  openGraph: {
    title: "PolarSync — India's Polar Science Portal",
    description: "One portal to share and preserve India's polar science",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(6,22,40,0.95)',
              border: '1px solid rgba(0,180,216,0.25)',
              color: '#CAF0F8',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}
