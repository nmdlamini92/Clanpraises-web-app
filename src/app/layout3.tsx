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

        {/* ✅ Popunder FIXED */}
        <Script id="popunder-script" strategy="afterInteractive">
          {`
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
          `}
        </Script>

        {/* CSS */}
        <style>{`
          .mobileShow { display: none; }
          .mobileHide { display: block; }

          @media only screen and (max-width: 480px) {
            .mobileShow { display: block; }
            .mobileHide { display: none; }
          }

          .topBanner, .bottomBanner {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }

          .topBanner {
            background-color: rgba(255,255,255,0.2);
          }

          .bottomBanner {
            background-color: rgba(214,211,209,0.5);
          }

          .withinContentBanner {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </head>

      <body>
        {/* TOP BANNER */}
        <div className="topBanner">
          <div className="mobileShow" id="adsterra-mobile-top"></div>
          <div className="mobileHide" id="adsterra-desktop-top"></div>
        </div>

        {/* Load TOP banners */}
        <Script id="top-banners" strategy="afterInteractive">
          {`
            function loadAd(containerId, key, width, height) {
              if (!document.getElementById(containerId)) return;

              var atOptions = {
                key: key,
                format: 'iframe',
                height: height,
                width: width,
                params: {}
              };

              var s = document.createElement('script');
              s.src = 'https://www.highperformanceformat.com/' + key + '/invoke.js';

              setTimeout(() => {
                var container = document.getElementById(containerId);
                if (container && !container.hasChildNodes()) {
                  container.appendChild(s);
                }
              }, 100);
            }

            if (!window.topAdsLoaded) {
              window.topAdsLoaded = true;

              loadAd('adsterra-mobile-top', 'ae9e7079a496fce88c4006f3946e3079', 320, 50);
              loadAd('adsterra-desktop-top', '07b67ee0c5ed62b6038cd054fa5633a8', 728, 90);
            }
          `}
        </Script>

        {/* App */}
        <Analytics />
        <div id="root">{children}</div>

        {/* BOTTOM BANNER */}
        <div className="bottomBanner">
          <div className="mobileShow" id="adsterra-mobile-bottom"></div>
          <div className="mobileHide" id="adsterra-desktop-bottom"></div>
        </div>

        {/* Load BOTTOM banners */}
        <Script id="bottom-banners" strategy="lazyOnload">
          {`
            if (!window.bottomAdsLoaded) {
              window.bottomAdsLoaded = true;

              loadAd('adsterra-mobile-bottom', 'ae9e7079a496fce88c4006f3946e3079', 320, 50);
              loadAd('adsterra-desktop-bottom', '07b67ee0c5ed62b6038cd054fa5633a8', 728, 90);
            }
          `}
        </Script>

        {/* Social Bar */}
        <Script
          data-cfasync="false"
          src="https://pl28975027.profitablecpmratenetwork.com/7d/72/ca/7d72cac07f0e550c2c3a7b9c1ea16604.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}