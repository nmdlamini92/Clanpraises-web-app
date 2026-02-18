//import Header1 from "../../../components/Header1";
import HeaderSmallScrn from "../../../components/HeaderSmallScrn";
import SignUpComp from "../../../components/SignUpComp";
import Header1 from "../../../components/Header1";
import Footer from "../../../components/Footer";
import FooterMobile from "../../../components/FooterMobile";


 export async function generateMetadata({}) {  

    return {
        title: 'Sign up to clanpraises',
        description: "Sign up to clanpraises",
        themecolor: '#000000',
    }
  }

export default function SignUpPage() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
    {/* Header */}
          <div className="hidden md:block">
            <Header1 />
          </div>
          <div className="md:hidden">
            <HeaderSmallScrn />
          </div>

    <div className="flex flex-col justify-center items-center">
    <main className="flex flex-col p-6 max-w-2xl mt-8">
      <SignUpComp/>
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