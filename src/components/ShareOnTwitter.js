import { FaTwitter } from "react-icons/fa";
import { SiX } from "react-icons/si";
import Image from "next/image";

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
    <Image src="/share-on-x.svg" alt="My Logo" width={60} height={30}
            onClick={shareOnTwitter}
            className="cursor-pointer transition duration-200 opacity-75 hover:brightness-75
                       w-[42px] h-[26px] sm:w-[52px] sm:h-[26px] md:w-[55px] md:h-[27px] lg:w-[60px] lg:h-[30px]"
          />
  );
};

export default TwitterShareButton;
