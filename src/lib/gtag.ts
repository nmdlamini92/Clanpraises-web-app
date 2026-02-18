// lib/gtag.ts
export const GA_MEASUREMENT_ID = 'G-NM1PSFGVTF'; // Replace this

export const pageview = (url: string) => {
  (window as any).gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
