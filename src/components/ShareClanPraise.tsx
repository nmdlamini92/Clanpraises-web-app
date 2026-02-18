"use client";

import { useState } from "react";
import { FaFacebookF, FaWhatsapp, FaTwitter, FaTimes } from "react-icons/fa";

export default function ShareClanPraise({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(`${title} clan praise`);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Share
      </button>

      {open && (
        <div className="absolute top-10 right-0 w-48 bg-white border shadow-lg rounded p-2 z-50">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-800"
          >
            <FaTimes />
          </button>

          <ul className="flex flex-col gap-2 mt-4">
            <li>
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-700 hover:underline"
              >
                <FaFacebookF /> Facebook
              </a>
            </li>
            <li>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:underline"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:underline"
              >
                <FaTwitter /> Twitter
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
