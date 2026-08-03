import './styles.css';
import React from 'react';
import Script from 'next/script';
import Analytics from './analytics';
import AdsterraApp from '../components/AdsterraMob';

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
        {/* Google Analytics */}
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


        <meta name="google-adsense-account" content="ca-pub-9270162293112331" />

        <meta name='admaven-placement' content="BqTrEpjUF" />

         {/**Hiltop adds */}
        <meta name="85a185e8c46d9b4c48d1dce546bc6e8885367332" content="85a185e8c46d9b4c48d1dce546bc6e8885367332" />

        {/**Hiltop adds */}
        <meta name="referrer" content="no-referrer-when-downgrade" />

        {/**Admaven pop up adds */}
        {/*<Script data-cfasync="false" src="//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1399035"/>*/}

        {/**Admaven in-page push */}
        <Script data-cfasync="false" src="//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1399166"/>

        {/**Admaven push notifications */}
        {/*<Script data-cfasync="false" src="/sw.js"/>*/}


        {/* ✅ CSS for Addsterra mobile vs desktop banners */} 
        <style>{`

            .topBanner {
              
              text-align: center;
              display: flex;              
              justify-content: center;    
              align-items: center;
              top: 0;
              z-index: 9999;
              background-color: rgba(255, 255, 255, 0.2);
          }

          .bottomBanner {
              
              text-align: center;
              display: flex;              
              justify-content: center;    
              align-items: center;
              bottom: 0;
              z-index: 9999;
              background-color: rgba(214, 211, 209, 0.5);
          }

          .withinContentBanner {
              width: 100%;
              text-align: center;
              display: flex;              
              justify-content: center;    
              align-items: center;
              z-index: 9999;
          }
          
        `}</style>

      </head>

      <body>
        <>
        {/* TOP BANNER */}
        <div className="flex justify-center bg-white/20" id="adsterra-desktop-top">
          <Script id="desktop-banner-top" strategy="afterInteractive">
            {`
              

                var atOptions = {
                  key: '07b67ee0c5ed62b6038cd054fa5633a8',
                  format: 'iframe',
                  height: 90,
                  width: 728,
                  params: {}
                };

                var s = document.createElement('script');
                s.src = 'https://www.highperformanceformat.com/07b67ee0c5ed62b6038cd054fa5633a8/invoke.js';
                document.getElementById('adsterra-desktop-top')?.appendChild(s);
              
            `}
          </Script>
          </div>
        
        

        {/* Rest of your app */}
        <Analytics />
        <>{children}</>

        {/*BOTTOM BANNER*/}
        <div className="flex justify-center bg-stone-300/50" id="adsterra-desktop-bottom">
          <Script id="desktop-banner-bottom" strategy="lazyOnload">
            {`

                var atOptions = {
                  key: '07b67ee0c5ed62b6038cd054fa5633a8',
                  format: 'iframe',
                  height: 90,
                  width: 728,
                  params: {}
                };

                var s = document.createElement('script');
                s.src = 'https://www.highperformanceformat.com/07b67ee0c5ed62b6038cd054fa5633a8/invoke.js';
                document.getElementById('adsterra-desktop-bottom')?.appendChild(s);
              
            `}
          </Script>
          </div>
        </>
      </body>
    </html>
  );
}      
     
