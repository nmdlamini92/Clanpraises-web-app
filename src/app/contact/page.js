import Header1 from "../../components/Header1";
import HeaderSmallScrn from "../../components/HeaderSmallScrn";
import Footer from "../../components/Footer";
import FooterMobile from "../../components/FooterMobile";
import Link from "next/link";
import { FaFacebook, FaRegEnvelope, FaEnvelope } from "react-icons/fa";

export async function generateMetadata({}) {  

    return {
        title: 'Contact clanpraises.com',
        description: "Contact Us on \n Email: admin@clanpraises.com \n Facebook: https://www.facebook.com/people/Clan-praises/61587423537078/",
        themecolor: '#000000',
    }
  }

export default function ContactPage() {
  return (
    <>
    <div className="min-h-screen">
        {/* Header */}
              <div className="hidden md:block">
                <Header1 />
              </div>
              <div className="md:hidden">
                <HeaderSmallScrn />
              </div>
    
    <div className="flex justify-center mt-8">
        <main className="flex flex-col justify-center mt-8 ml-5">
        <h1 className="text-2xl font-bold mb-10">Contact Us</h1>
        <div className="flex gap-4">
          <FaEnvelope className="text-black/60" size={22}/>
          <p></p>
          <p className=""><a>admin@clanpraises.com</a> </p>
        </div>
        <div className="flex gap-3 mt-7">
          {/*<div className="bg-white/70 rounded border border-gray-300 p-0.5 pb-0">*/}
            <FaFacebook className="text-blue-400" size={23}/>
          <p></p>
          <p className="ml-2"><Link className="text-blue-600/90 text-sm sm:text-md underline" href={'https://www.facebook.com/people/Clan-praises/61587423537078/'}> 
          https://www.facebook.com/people/Clan-praises/61587423537078/ </Link> </p>
        </div>
        
        </main>
    </div>
    </div>
    <div className="hidden md:block mt-8 md:mt-12">
      <Footer />
    </div>
    <div className="md:hidden mt-8 md:mt-12">
      <FooterMobile />
    </div>
    </>
  );
}
