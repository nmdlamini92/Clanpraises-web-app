import './styles.css';
import React from 'react';
import Script from 'next/script';
import Analytics from './analytics';

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

        {/* Adsterra Popunder script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              let popShown = false;
              function showPopunder() {
                if (popShown) return;
                popShown = true;

                var s = document.createElement('script');
                s.src = "https://pl28974908.profitablecpmratenetwork.com/57/9d/fa/579dfad2ba37747966d9ac94ec1f47dc.js";
                s.setAttribute('data-cfasync', 'false');
                document.body.appendChild(s);
              }
                
              document.addEventListener('click', showPopunder, { once: true });
            `,
          }}
        />

        {/* ✅ CSS for mobile vs desktop banners */}
        <style>{`
          .mobileShow { display: none; }
          .mobileHide { display: block; }

          @media only screen and (max-width: 480px) {
            .mobileShow { display: block; }
            .mobileHide { display: none; }
          }

            .topBanner {
              width: 100%;
              text-align: center;
              display: flex;              
              justify-content: center;    
              align-items: center;
              top: 0;
              z-index: 9999;
              background-color: rgba(255, 255, 255, 0.2);
          }

          .bottomBanner {
              width: 100%;
              text-align: center;
              display: flex;              
              justify-content: center;    
              align-items: center;
              top: 0;
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
        {/* TOP BANNER */}
        <div className="topBanner">
        {/* Mobile */}
        <div className="mobileShow" id="adsterra-mobile-top"></div>
          <Script id="mobile-banner-top" strategy="afterInteractive">
            {`
              if (!window.adsterraMobileTopLoaded) {
                window.adsterraMobileTopLoaded = true;

                var atOptions = {
                  key: 'ae9e7079a496fce88c4006f3946e3079',
                  format: 'iframe',
                  height: 50,
                  width: 320,
                  params: {}
                };

                var s = document.createElement('script');
                s.src = 'https://www.highperformanceformat.com/ae9e7079a496fce88c4006f3946e3079/invoke.js';
                
                setTimeout(function () {
                  var container = document.getElementById('adsterra-mobile-top');
                  if (container) {
                    container.appendChild(s);
                  }
                }, 100);

              }
            `}
          </Script>

        {/* Desktop */}
        <div className="mobileHide" id="adsterra-desktop-top"></div>
          <Script id="desktop-banner-top" strategy="afterInteractive">
            {`
              if (!window.adsterraDesktopTopLoaded) {
                window.adsterraDesktopTopLoaded = true;

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
              }
            `}
          </Script>
      </div>

        {/* Rest of your app */}
        <Analytics />
        <div id="root">{children}</div>

        {/*BOTTOM BANNER*/}
        <div className="bottomBanner">
        {/* Mobile */}
        <div className="mobileShow" id="adsterra-mobile-bottom"></div>
          <Script id="mobile-banner-bottom" strategy="lazyOnload">
            {`
              if (!window.adsterraMobileBottomLoaded) {
                window.adsterraMobileBottomLoaded = true;

                var atOptions = {
                  key: 'ae9e7079a496fce88c4006f3946e3079',
                  format: 'iframe',
                  height: 50,
                  width: 320,
                  params: {}
                };
                var s = document.createElement('script');
                s.src = 'https://www.highperformanceformat.com/ae9e7079a496fce88c4006f3946e3079/invoke.js';
                 
                setTimeout(function () {
                  var container = document.getElementById('adsterra-mobile-bottom');
                  if (container) {
                    container.appendChild(s);
                  }
                }, 100);

             }
            `}
          </Script>
        

        {/* Desktop */}
        <div className="mobileHide" id="adsterra-desktop-bottom"></div>
          <Script id="desktop-banner-bottom" strategy="lazyOnload">
            {`
              if (!window.adsterraDesktopBottomLoaded) {
                window.adsterraDesktopBottomLoaded = true;

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
              }
            `}
          </Script>
        
      </div>

        {/* Adsterra Social Bar script */}
        <Script
          data-cfasync="false"
          src="https://pl28975027.profitablecpmratenetwork.com/7d/72/ca/7d72cac07f0e550c2c3a7b9c1ea16604.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}      
