
import SearchBarWithSuggestions from "../components/SearchBar";
import Header1 from "../components/Header1"
import HeaderSmallScrn from "../components/HeaderSmallScrn"
import SwiperSlideComp from "../components/SwiperSlide";
import Link from "next/link";
import AddClanPraise from "../components/AddClanPraise";
import Card from "../components/CardClanPraise_HomePage";
import Footer from "../components/Footer";
import SendFeedback from "../components/SendFeedback";
import BeStakeholderUser from "../components/BeStakeholderUser"
import ClanPraisesFolder from "../components/ClanPraisesFolder";
import MostPopularAllposts from "../components/MostPopularAllposts";
import AddNsearchBar from "../components/AddClanNsearchBar";

export const dynamic = 'force-dynamic';


  export async function generateMetadata({}) {  //process.env.NEXT_PUBLIC_SERVER_URL 'localhost:3001'

    const TribesList = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tribes`).then((res) => res.json())

    console.log(TribesList)

    function capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    //const TribesList = [{ id: "73gx7w7e-yes1-938n-jsy2-i2393883292j", tribe: "swati", praises_Plural: "Tinanatelo", _count: { clanpraises: 11 }}]

    const BantuClanPraisesList = TribesList.map(tribe => `•${capitalizeFirstLetter(tribe.tribe)} (${tribe.praises_Plural})`).join(', ');

    console.log(BantuClanPraisesList)

    return {
        title: 'Clanpraises',
        description: BantuClanPraisesList,
        themecolor: '#000000',
    }
  }


  export default async function HomePage() {


    const postList1 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mostPopularposts`, {cache: 'no-store'}).then((res) => res.json())

    const postList = postList1.slice(0, 5);

    console.log(postList)


    const sumAndAverage = (arr, key) => {
      if (!arr.length) return { sum: 0, average: 0 };
  
      const sum = arr.reduce((acc, obj) => acc + (obj[key] || 0), 0);
      const average = sum / arr.length;
  
      return { sum, average };
    }

    const TribesList = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tribes`).then((res) => res.json())
    //const TribesList = [{ id: "73gx7w7e-yes1-938n-jsy2-i2393883292j", tribe: "swati", praises_Plural: "Tinanatelo", _count: { clanpraises: 11 }}]

    console.log(TribesList)

    function capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const colors = [/*'text-yellow-600','text-stone-500',*/ 'text-amber-800' /*,'text-amber-500', 'text-gray-700'*/];
  
  return (
      <>
      <div className="hidden md:block">
      <Header1/>
      </div>
      <div className="md:hidden">
      <HeaderSmallScrn/>
      </div>
      <div className="flex flex-col mt-8 items-center"> {/**bg-orange-200/50 */ /*bg-amber-600/10*/}
        <AddNsearchBar />
          <div>
            <h1 className="mt-8 text-sm text-gray-500">Recent engagement</h1>
            <MostPopularAllposts postList={postList} />
          </div>
          <div className="flex justify-center">
            <p className="text-stone-800 mt-8 underline text-[22px] md:text-[30px] lg:pr-60 lg:mr-8 font-serif">{'\u{1F4C1}'}Literature Collections</p>
          </div>
          <div className="flex">
            <div className="flex justify-center flex-wrap mt-4 gap-1 sm:gap-3 md:gap-4 max-w-2xl mx-auto p-1"> {/**bg-white/60 bg-amber-600/10*/}
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
                   {/*<BeStakeholderUser/>*/}
                </div>
                <SendFeedback/>
              </div>
            </div>
          </div>
            <div className="sm:hidden mt-4">
              {/*<BeStakeholderUser/>*/}
            </div>
            <div className="sm:hidden mt-4">
              <SendFeedback/>
            </div>
          <div className="hidden sm:flex lg:hidden gap-5 mt-6 md:mt-8 lg:mt-6">
            {/*<BeStakeholderUser/>*/}
            <SendFeedback/>
          </div>
      </div>
      <div className="mt-8 md:mt-12 lg:mt-8">
        <Footer/>
      </div>
      </>
  );
}