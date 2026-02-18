import { useState } from "react";
import FacebookShareButton from "./ShareOnFacebook";

export default function ShareButton({url, text}) {

  console.log(url)
  console.log(text)
  
  const [open, setOpen] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const shareLinks = {
    //facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,

    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
  };

  return (
    <div className="relative inline-block">
      {/* Share Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Share
      </button>

      {/* Share Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-semibold text-gray-700">
              Share clan praise
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              ✕
            </button>
          </div>

          {/* Options */}
          <div className="p-3 space-y-2">

            <FacebookShareButton text="" url=""></FacebookShareButton>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              Share on Facebook
            </a>

            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
            >
              Share on WhatsApp
            </a>

            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-3 py-2 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200"
            >
              Share on Twitter
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
