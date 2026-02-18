import Header1 from "../../components/Header1";
import HeaderSmallScrn from "../../components/HeaderSmallScrn";
import Footer from "../../components/Footer";
import FooterMobile from "../../components/FooterMobile";

export async function generateMetadata({}) {  

    return {
        title: 'Privacy Policy of clanpraises.com',
        description: "We respect your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use clanpraises.com. We may collect minimal data for analytics and user experience. We do not sell your data to third parties.",
        themecolor: '#000000',
    }
  }

export default function PrivacyPolicyPage() {
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

    <div className="flex flex-col justify-center items-center mt-8">
    <main className="flex flex-col p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>
        We respect your privacy. This Privacy Policy explains how we collect,
        use, and protect your personal information when you use clanpraises.com.
      </p>
      <p>
        We may collect minimal data for analytics and user experience. We do not
        sell your data to third parties.
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
