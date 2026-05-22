import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

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
    <Image src="/share-on-whatsapp.svg" alt="My Logo" width={60} height={30}
                onClick={shareOnWhatsApp}
                className="cursor-pointer transition duration-200 opacity-75 hover:brightness-75
                 w-[42px] h-[26px] sm:w-[52px] sm:h-[26px] md:w-[56px] md:h-[28px] lg:w-[60px] lg:h-[30px]"
              />
  );
};

export default WhatsAppShareButton;
