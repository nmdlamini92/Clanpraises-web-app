import './styles.css'
import React from 'react';
import { ToastContainer } from 'react-toastify';

/** @type {import('next').Metadata} */
export const metadata = {
    title: 'React App',
    description: 'Web site created with Next.js.',
    themecolor: '#000000',
  };


/**
 * @param {{ children: React.ReactNode }} props - The component props.
 * @returns {JSX.Element} The root layout element.
 */
export default function RootLayout({ children }) {
    return (
        <html lang="en">
  <head>
    {/*<meta name="theme-color" content="#000000" />*/}
    {/*<link href="./styles.css" rel="stylesheet" />*/}
  </head>
  <body>
    {/*<p>Root Layout - skeleton</p>*/}
  <div id="root">{children}</div>
  </body>
</html>

    )
}