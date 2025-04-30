import Header1 from "../../components/Header1"
import SearchBarWithSuggestions from "../../components/SearchBar"
import Link from "next/link"
import AddClanPraise from "../../components/AddClanPraise"
import HeaderSmallScrn from "../../components/HeaderSmallScrn"

  export async function generateMetadata({ params }) {

    const {tribe} = await params
    console.log(tribe)
    
    const clanNames1 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clanNames/${tribe}`).then((res) => res.json())
    
    console.log(clanNames1)

    const clanNames = new Set(clanNames1.map(obj => obj.title));

    const TribeClanNames = [...clanNames].map(clanName => `${clanName}`).join(' • ');

    console.log(clanNames);

    return {
        title: `${tribe}-ClanPraises`,
        description: TribeClanNames,
        themecolor: '#000000',
    }
  }

  export default async function ClanPraisePage({params}) {

    const {tribe} = await params
    console.log(tribe)
    
    const clanNames1 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clanNames/${tribe}`).then((res) => res.json())
    console.log(clanNames1)


    function removeDuplicates(array, property) {
      const seen = new Set();
      return array.filter(item => {
        const propValueLower = item[property].toLowerCase();
        if (seen.has(propValueLower)) {
          return false;
        }
        seen.add(propValueLower);
        return true;
      });
    }
    const clanNames = removeDuplicates(clanNames1, 'title');

    console.log(clanNames);

    function capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const colors = ['text-yellow-600','text-stone-500','text-amber-900','text-gray-600','text-amber-600'];
    
    return (
        <>
        <div className="hidden md:block">
      <Header1/>
      </div>
      <div className="md:hidden">
      <HeaderSmallScrn/>
      </div>
        <div className="flex flex-col mt-8">
          <div className="">
          <SearchBarWithSuggestions/>
          </div>
          <div className="w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] mx-auto mt-12 md:mt-14">
          <AddClanPraise />
          </div>
          <div className="flex justify-center mt-12">
          {clanNames1.length == 0? <h1>No {tribe} Clan praises found [ADD CLAN PRAISE] </h1>: <h1 className="text-stone-600 text-[22px] md:text-[28px] underline font-serif">{capitalizeFirstLetter(tribe)}-ClanPraises </h1>}
          </div>
          <div className="flex justify-center flex-wrap mt-4 gap-1 md:gap-2 max-w-2xl mx-auto bg-white/60 p-0"> 
            {clanNames.map((clanNameObj, index) => (     
            <Link key={index} href={((clanNames1.filter(item => item.title === clanNameObj.title).length) > 1)?
              `/${tribe}/${clanNameObj.title}`: `/${tribe}/${clanNameObj.title}/${clanNameObj.id}`}
              className={`font-serif text-md md:text-lg mr-4 hover:underline ${colors[index % colors.length]}`}>
            • {capitalizeFirstLetter(clanNameObj.title)}</Link>
          ))
          }
          </div>
        </div>
        </>
    )
}