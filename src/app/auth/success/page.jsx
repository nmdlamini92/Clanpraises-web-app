"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function AuthSuccess() {
  
  const router = useRouter();
  const [, setCookie] = useCookies([]);

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");

    console.log(user)

    if (user) {

        const currentURL = JSON.parse(localStorage.getItem('currentURL'));
      
        localStorage.setItem('isUserSignedIn', JSON.stringify({isUserSignedIn: true}));
        localStorage.setItem('VipUserId', JSON.stringify({VipUserName: user.userId}));
        localStorage.setItem('VipUserName', JSON.stringify({VipUserName: user.username}));
          //onDataChange(['SignInSuccess', data.userName]);

      window.location.href = `${currentURL}`;
      //router.push("/");
    }
  }, []);

  return (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-600 text-lg">
      Signing you in...
    </p>
  </div>
  )
}
