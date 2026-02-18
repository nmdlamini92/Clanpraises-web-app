import Header1 from "../../components/Header1";
import HeaderSmallScrn from "../../components/HeaderSmallScrn";
import Footer from "../../components/Footer";
import FooterMobile from "../../components/FooterMobile";


 export async function generateMetadata({}) {  

    return {
        title: 'About clanpraises.com',
        description: "commonizing the knowledge of clan praises and their meaning/context",
        themecolor: '#000000',
    }
  }

export default function AboutPage() {
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
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="sm">
        clanpraises.com is commonizing the knowledge of clan praises and their meaning/context. <br></br><br></br>
        Share your insights/notes on featured clan praises, or add a clan praise to be featured. <br></br><br></br>
        We also feature clan history, clan customs and more. <br></br><br></br>
        {/*Our passion is story telling and context preservation.<br></br><br></br>*/}
      </p>
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
