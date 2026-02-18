import { FaFacebook } from "react-icons/fa";

const FacebookShareButton = ({ text, url }) => {

  const shareOnFacebook = () => {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    const fbAppUrl = `fb://facewebmodal/f?href=https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
    const fbWebUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;

    
    console.log(encodedText);
    console.log(encodedUrl)

    // Attempt to open the Facebook app first
    window.location.href = fbAppUrl;

    // Fallback to web after a short delay
    setTimeout(() => {
      window.open(fbWebUrl, "_blank");
    }, 500);
  };

  return (
    <button
      onClick={shareOnFacebook}
      className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-700 transition"
    >
      <FaFacebook size={20} />
    </button>
  );
};

export default FacebookShareButton;


