import { FaWhatsapp } from "react-icons/fa";

const WhatsAppShareButton = ({ text, url }) => {
  const shareOnWhatsApp = () => {
    const message = `${text} ${url}`;
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp app (mobile)
    const waAppUrl = `whatsapp://send?text=${encodedMessage}`;

    // WhatsApp Web (desktop fallback)
    const waWebUrl = `https://wa.me/?text=${encodedMessage}`;

    // Try opening WhatsApp app
    window.location.href = waAppUrl;

    // Fallback to WhatsApp Web
    setTimeout(() => {
      window.open(waWebUrl, "_blank");
    }, 500);
  };

  return (
    <button
      onClick={shareOnWhatsApp}
      className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded-sm hover:bg-green-600 transition"
      aria-label="Share on WhatsApp"
    >
      <FaWhatsapp size={20} />
    </button>
  );
};

export default WhatsAppShareButton;
