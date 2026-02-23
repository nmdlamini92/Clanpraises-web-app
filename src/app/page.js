
import SearchBarWithSuggestions from "../components/SearchBar";
import Header1 from "../components/Header1"
import HeaderSmallScrn from "../components/HeaderSmallScrn"
import SwiperSlideComp from "../components/SwiperSlide";
import Link from "next/link";
import AddClanPraise from "../components/AddClanPraise";
import Card from "../components/CardClanPraise_HomePage";
import Footer from "../components/Footer";
import FooterMobile from "../components/FooterMobile";
import SendFeedback from "../components/SendFeedback";
import BeStakeholderUser from "../components/BeStakeholderUser"
import ClanPraisesFolder from "../components/ClanPraisesFolder";
import MostPopularAllposts from "../components/MostPopularAllposts";
import AddNsearchBar from "../components/AddClanNsearchBar";
import FeaturedLiterature from "../components/FeaturedLiterature";
import Image from "next/image";



export const dynamic = 'force-dynamic';


  export async function generateMetadata({}) {  //process.env.NEXT_PUBLIC_API_URL 'localhost:3001'

    const TribesList = await fetch(`${process.env.API_URL}/tribes`).then((res) => res.json())


    console.log(TribesList)

    function capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    //const TribesList = [{ id: "73gx7w7e-yes1-938n-jsy2-i2393883292j", tribe: "swati", praises_Plural: "Tinanatelo", _count: { clanpraises: 11 }}]

    const BantuClanPraisesList = TribesList.map(tribe => `•${capitalizeFirstLetter(tribe.praises_Plural)} (${tribe._count.clanpraises})`).join(', ');

    console.log(BantuClanPraisesList)

    return {
        title: 'clanpraises.com',
        description: BantuClanPraisesList,
        themecolor: '#000000',
    }
  }


  export default async function HomePage() {

    //const postList1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mostPopularposts`, {cache: 'no-store'}).then((res) => res.json())

    const TribesList = await fetch(`${process.env.API_URL}/tribes`).then((res) => res.json())

    console.log('NEXT_PUBLIC_API_URL (page):', process.env.API_URL);

    const TribeList_nonEmpty = TribesList.filter(item => item._count.clanpraises > 0);

    console.log(TribeList_nonEmpty)

    /*const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!NEXT_PUBLIC_API_URL) {
      throw new Error('NEXT_PUBLIC_API_URL is not defined in HomePage');
    }

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/tribes`, { cache: 'no-store' });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Page fetch failed: ${text}`);
    }

    const TribesList = await res.json();*/


    const sumAndAverage = (arr, key) => {
      if (!arr.length) return { sum: 0, average: 0 };
  
      const sum = arr.reduce((acc, obj) => acc + (obj[key] || 0), 0);
      const average = sum / arr.length;
  
      return { sum, average };
    }

    
    //const TribesList = [{ id: "73gx7w7e-yes1-938n-jsy2-i2393883292j", tribe: "swati", praises_Plural: "Tinanatelo", _count: { clanpraises: 11 }}]

    console.log(TribesList)

    function capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const colors = [/*'text-yellow-600','text-stone-500',*/ 'text-amber-800' /*,'text-amber-500', 'text-gray-700'*/];

    //const [isTouched, setIsTouched] = useState(false);

    const allowedTribes = ["swati"];

    return (
    <>
      {/* Header */}
      <div className="hidden md:block">
        <Header1 />
      </div>
      <div className="md:hidden">
        <HeaderSmallScrn />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center min-h-screen">
      <div className="flex flex-col justify-center gap-4 p-2 mt-8 max-w-2xl">
        <AddNsearchBar/>

        <div className="flex">
          <h1 className="mt-8 text-sm text-gray-600 mb-4 font-medium">
            Featured clan praises
          </h1>
        </div>
        {/* Featured Sections */}
        
        {/* when clanpraises database is empty */}
        {(TribeList_nonEmpty.length === 0 && (
          <p>no clan praises found, be the first to add a clanpraise!</p>
        ))}
        {/* if swati clanpraises exist in database */}
        {(TribeList_nonEmpty.filter(item => item.tribe === "swati").length > 0 && (
        <FeaturedLiterature TribesList={TribesList.filter(obj => allowedTribes.includes(obj.tribe))} />
        ))}
        {/* List of tribes and their clanpraises */}
        <div className="flex justify-center flex-wrap mt-4 gap-1 sm:gap-3 md:gap-4 max-w-2xl mx-auto p-1"> 
              {TribeList_nonEmpty.filter(obj => obj.tribe !== "swati").map((tribe, index) => (
              <Link key={index} href={`/${tribe.tribe}`} 
              className={`font-serif text-md md:text-lg mr-4 active:underline hover:underline active:opacity-60 ${colors[index % colors.length]}`}
              >
              •{capitalizeFirstLetter(tribe.tribe)} - {capitalizeFirstLetter(tribe.praises_Singular)} ({tribe._count.clanpraises} clans)</Link>
              ))}  
          </div>
        
        {/* Feedback */}
        {/*<div className="mt-6 flex justify-center">
          <SendFeedback />
        </div>*/}
      </div>
      </div>

      {/* Footer */}
        <div className="hidden md:block mt-8 md:mt-12">
          <Footer />
        </div>
        <div className="md:hidden mt-8 md:mt-12">
          <FooterMobile />
        </div>
    </>
  );
}


  
  /**return (
      <>
      <div className="hidden md:block">
      <Header1/>
      </div>
      <div className="md:hidden">
      <HeaderSmallScrn/>
      </div>
      <div className="flex flex-col justify-center gap-2 p-1 mt-8"> 
        <AddNsearchBar />
          <div>
            <h1 className="mt-8 text-sm text-gray-500 mb-4">Featured Literature</h1>
            
          </div>
         <div className="flex gap-3">
          <div className="flex flex-col items-center gap-1">
            <p className=" text-[15px] underline"> <strong>Tinanatelo</strong> (263 clans)</p>
            <div className="relative w-[300px] h-[430px]">
            <Link href={`/swati`}>
            <Image src="/TinanateloCoverBrown2.png" alt="My Logo" fill
                  className="rounded-md border-2 border-amber-300/60 shadow-md brightness-90 object-cover"/>
            </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className=" text-[15px] underline"> <strong>Swazi Clans' History</strong> (108 clans)</p>
            <div className="relative w-[300px] h-[430px]">
            <Link href={`/history`}>
            <Image src="/ClanHistory2.png" alt="My Logo" fill
                  className="rounded-md border-2 border-amber-300/60 shadow-md brightness-90 object-cover"/>
            </Link>
            </div>
            </div>
          </div>
          {/*<div className="flex justify-center">
            <p className="text-stone-800 mt-8 underline text-[22px] md:text-[30px] lg:pr-60 lg:mr-8 font-serif">{'\u{1F4C1}'}Literature Collections</p>
          </div>
          <div className="flex">
            <div className="flex justify-center flex-wrap mt-4 gap-1 sm:gap-3 md:gap-4 max-w-2xl mx-auto p-1"> {/**bg-white/60 bg-amber-600/10*
              {TribesList.map((tribe, index) => (
              <Link key={index} href={`/${tribe.tribe}`} 
              className={`font-serif text-md md:text-lg mr-4 active:underline hover:underline active:opacity-60 ${colors[index % colors.length]}`}
              >
              •{capitalizeFirstLetter(tribe.tribe)} ({tribe._count.clanpraises})</Link>
              ))}  
            </div>
            <div className="hidden lg:block">
              <div className="flex flex-col items-center mt-2">
                <div className="mb-6">
                   {/*<BeStakeholderUser/>*
                </div>
                <SendFeedback/>
              </div>
            </div>
          </div>
            <div className="sm:hidden mt-4">
              {/*<BeStakeholderUser/>*
            </div>
            <div className="sm:hidden mt-4">
              <SendFeedback/>
            </div>
          <div className="hidden sm:flex lg:hidden gap-5 mt-6 md:mt-8 lg:mt-6">
            {/*<BeStakeholderUser/>*}
            <SendFeedback/>
          </div>
      </div>
      <div className="mt-6">
      <SendFeedback/>
      </div>
      </div>
      <div className="mt-8 md:mt-12 lg:mt-8">
        <Footer/>
      </div>
      
      </>
  );
}**/