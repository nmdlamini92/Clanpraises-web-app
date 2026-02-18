import { FaTwitter } from "react-icons/fa";
import { SiX } from "react-icons/si";

const TwitterShareButton = ({ text, url }) => {
  const shareOnTwitter = () => {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    // Twitter/X does not support deep linking reliably anymore,
    // so web intent is the safest option
    const twitterWebUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

    window.open(twitterWebUrl, "_blank");
  };

  return (
    <button
      onClick={shareOnTwitter}
      className="flex items-center gap-1 px-2 py-1 bg-stone-800 text-white rounded-sm hover:bg-sky-600 transition"
      aria-label="Share on Twitter"
    >
      {/*<FaTwitter size={20} />*/}
      <SiX size={20} />
    </button>
  );
};

export default TwitterShareButton;
