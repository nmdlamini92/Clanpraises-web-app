import './styles.css';
import React from 'react';
import Script from 'next/script';
import Analytics from './analytics'; // 👈 Import from separate file
//import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Clan praises',
  description: 'Clan praises',
   themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NM1PSFGVTF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NM1PSFGVTF');
          `}
        </Script>
        <meta 
          name="google-adsense-account" 
          content="ca-pub-9270162293112331">
        </meta>
      </head>
      <body>
        <Analytics />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
