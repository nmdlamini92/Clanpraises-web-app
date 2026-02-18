"use client"

import { FaGoogle, FaFacebook } from "react-icons/fa";
//import { useParams } from "next/navigation"
import { useEffect } from "react";
import { useRouter } from "next/navigation";



export default function SocialAuthButtons(params) {

  useEffect(() => {
    //console.log(window.localStorage)
    console.log(window.location.pathname === "/auth/signup" || window.location.pathname === "/auth/signin");
  }, []);


  const handleGoogleSignup = () => {

    //useEffect(() => {

      if (window.location.pathname === "/auth/signup" || window.location.pathname === "/auth/signin") {
        localStorage.setItem('currentURL', JSON.stringify("https://clanpraises.com"));
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
      }
      else{
        localStorage.setItem('currentURL', JSON.stringify(window.location.href));
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
      }
    //}, []);
  };

  const handleFacebookSignup = () => {

    //useEffect(() => {
      if (window.location.pathname === "/auth/signup" || window.location.pathname === "/auth/signin") {
        localStorage.setItem('currentURL', JSON.stringify("https://clanpraises.com"));
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;
      }
      else{
        localStorage.setItem('currentURL', JSON.stringify(window.location.href));
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;
      }
      //}, []);
  };

  return (
    <div className="flex flex-col gap-2 mt-3">
      <button
        onClick={handleGoogleSignup}
        className="flex items-center justify-center text-gray-500 gap-2 border-solid border-[0.3px] border-amber-400 bg-white p-2 rounded hover:bg-stone-300"
      >
        {/*<FaGoogle className="" />
        Continue with Google*/}
        <svg width="20" height="20" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.59 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.21-.43-4.73H24v9.46h12.69c-.55 2.97-2.21 5.49-4.69 7.19l7.23 5.6c4.23-3.9 6.27-9.65 6.27-15.52z"/>
          <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.23-5.6c-2.01 1.35-4.58 2.15-8.68 2.15-6.26 0-11.57-4.09-13.46-9.69l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>

        <span className="text-gray-700 normal-case">Continue with Google</span>
            </button>

      {/*<button
        onClick={handleFacebookSignup}
        className="flex items-center justify-center text-gray-500 gap-2 border-solid border-[0.3px] border-amber-400 bg-white p-2 rounded hover:bg-stone-300"
      >
        <FaFacebook className="text-blue-500 lowercase" size={22}/>
        <p className="text-gray-700 normal-case">Continue with Facebook</p>
      </button>*/}
    </div>
  );
}
