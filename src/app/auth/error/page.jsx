"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function AuthError() {
  const router = useRouter();
  const [, , removeCookie] = useCookies(["VipUserId"]);
  const [message, setMessage] = useState("Authentication failed.");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      setMessage(decodeURIComponent(error));
    }

    // Clean up any partial auth state
    removeCookie("VipUserId", { path: "/" });
    localStorage.removeItem("isUserSignedIn");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 text-center">
        <h1 className="text-xl font-semibold text-red-600 mb-2">
          Sign-in Error
        </h1>

        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex gap-3 justify-center">
          {/*<button
            onClick={() => router.push("/signin")}
            className="px-4 py-2 bg-black text-white rounded-md hover:opacity-90"
          >
            Try again
          </button>*/}

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}
