import { FaFacebook } from "react-icons/fa";
import Image from "next/image";

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
    

    <Image src="/share-on-facebook.svg" alt="My Logo" width={60} height={30}
            onClick={shareOnFacebook}
            className="cursor-pointer transition duration-200 opacity-75 hover:brightness-75
                       w-[42px] h-[26px] sm:w-[52px] sm:h-[26px] md:w-[55px] md:h-[27px] lg:w-[60px] lg:h-[30px]"
          />
  );
      
     
};

export default FacebookShareButton;


