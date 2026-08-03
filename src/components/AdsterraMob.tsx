'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    atAsyncOptions?: any[];
  }
}

export default function AdsterraApp() {
  useEffect(() => {
    window.atAsyncOptions = window.atAsyncOptions || [];

    window.atAsyncOptions.push({
      key: 'ae9e7079a496fce88c4006f3946e3079',
      format: 'js',
      async: true,
      container: 'atContainer-ae9e7079a496fce88c4006f3946e3079',
      params: {},
    });
  }, []);

  return (
    <>
      <Script
        data-cfasync="false"
        id="adsterra-app-ae9e7079a496fce88c4006f3946e3079"
        src="https://considerableinsanityaside.com/ae9e7079a496fce88c4006f3946e3079/invoke.js"
        strategy="afterInteractive"
      />

      <div id="atContainer-ae9e7079a496fce88c4006f3946e3079" />
    </>
  );
}