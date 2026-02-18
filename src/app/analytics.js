'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { pageview } from '../lib/gtag';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    pageview(pathname);
  }, [pathname]);

  return null;
}
