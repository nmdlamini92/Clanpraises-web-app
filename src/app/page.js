
import SearchBarWithSuggestions from "../components/SearchBar";
import Header1 from "../components/Header1"
import HeaderSmallScrn from "../components/HeaderSmallScrn"
import SwiperSlideComp from "../components/SwiperSlide";
import Link from "next/link";
import AddClanPraise from "../components/AddClanPraise";

  export async function generateMetadata({}) {  //process.env.NEXT_PUBLIC_SERVER_URL 'localhost:3001'

    const TribesList = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tribes`).then((res) => res.json())

    console.log(TribesList)

    const BantuClanPraisesList = TribesList.map(tribe => `${tribe.tribe} – ${tribe.praises_Plural}`).join(', ');

    console.log(BantuClanPraisesList)

    return {
        title: 'Bantu-ClanPraises',
        description: BantuClanPraisesList,
        themecolor: '#000000',
    }
  }


  export default async function ClanPraisePage() {

    const TribesList = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tribes`).then((res) => res.json())

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
        <SwiperSlideComp/>
          <div className="mt-4 z-50 flex flex-col items-start">
            <SearchBarWithSuggestions/>
              <div className="w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] mx-auto mt-12 md:mt-14"> 
              <AddClanPraise />
              </div>
          </div>
          <div className="flex justify-center">
            <p className="text-stone-800 mt-8 underline text-[22px] md:text-[30px] font-serif">Bantu-ClanPraises </p>
          </div>
          <div className="flex justify-center flex-wrap mt-4 gap-1 md:gap-4 max-w-2xl mx-auto p-0 bg-white/60"> {/** bg-amber-600/10*/}
            {TribesList.map((tribe, index) => (
            <Link key={index} href={`http://${process.env.HOST}:${process.env.PORT}/${tribe.tribe}`} 
            className={`font-serif text-md md:text-lg mr-4 hover:underline ${colors[index % colors.length]}`}>
            •{capitalizeFirstLetter(tribe.tribe)} - {tribe.praises_Plural} ({tribe._count.clanpraises})</Link>
            ))}  
          </div>
      </div>
      </>
  );
}