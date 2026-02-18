import Header1 from "../../components/Header1"
import SearchBarWithSuggestions from "../../components/SearchBar"
import Link from "next/link"
import AddClanPraise from "../../components/AddClanPraise"
import HeaderSmallScrn from "../../components/HeaderSmallScrn"
import Card from "../../components/CardClanPraise_HomePage"
//import Card from "../../components/CardClanPraise_HomePage"
import Footer from "../../components/Footer"
import FooterMobile from "../../components/FooterMobile"
import AddNsearchBar from "../../components/AddClanNsearchBar"
import { redirect, notFound } from "next/navigation";
import { getAllPosts } from "../../lib/posts"


export const revalidate = 60;
export const dynamicParams = true;


  export async function generateMetadata({ params }) {

    const {tribe} = await params
    console.log(tribe)

    function capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    //const clanNames1 = await fetch(`${process.env.API_URL}/clanNames/${tribe}`).then((res) => res.json())
    const res = await fetch(`${process.env.API_URL}/clanNames/${tribe}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      notFound();
    }

    const clanNames1 = await res.json();


    console.log(clanNames1)

    if (clanNames1.length === 0) {
        notFound()
     }
    else {

      const clanNames = new Set((clanNames1.post).map(obj => obj.title));

      const TribeClanNames = [...clanNames].map(clanName => `${capitalizeFirstLetter(clanName)}`).join(' • ');

      console.log(clanNames);

      if (tribe === 'tinanatelo'){
        
        return {
          title: "Tinanatelo TemaSwati (Swati Clan-praises)",
          keywords: ['clan praise', 'clan history', 'sinanatelo', 'tinanatelo', 'umlandvo',],
          description: TribeClanNames,
          themecolor: '#000000',
        }
      }

      if (tribe === 'clan-history'){
        
        return {
          title: "Clan-history (Umlandvo wemaSwati)",
          keywords: ['clan praise', 'clan history', 'sinanatelo', 'tinanatelo', 'umlandvo',],
          description: TribeClanNames,
          themecolor: '#000000',
        }
      }

      return {
          title: `${capitalizeFirstLetter(tribe)}`,
          description: TribeClanNames,
          themecolor: '#000000',
      }
    }
  }

  export default async function TribePage({params}) {


    const {tribe} = await params
    console.log(tribe)
    
    //const clanNames1 = await fetch(`${process.env.API_URL}/clanNames/${tribe}`).then((res) => res.json())
    
    const res = await fetch(`${process.env.API_URL}/clanNames/${tribe}`, {
      next: { revalidate: 60 }
    })

    if (!res.ok) {
      redirect("/");
    }

    const clanNames1 = await res.json();

    console.log(clanNames1)

     if (clanNames1.length === 0) {
        redirect("/");
     }

    //const clanNamesPosts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${tribe}/mostPopularTribePosts`).then((res) => res.json())
    //console.log(clanNamesPosts)

    //const clanNamesPostsPop = clanNamesPosts.slice(0, 5);
    //console.log(clanNamesPostsPop)


    function removeDuplicates(array, property) {
      const seen = new Set();
      return array.filter(item => {
        const propValueLower = item[property].toLowerCase().trim();
        if (seen.has(propValueLower)) {
          return false;
        }
        seen.add(propValueLower);
        return true;
      });
    }

    const clanNames = removeDuplicates((clanNames1.post), 'title');

    console.log(clanNames);

    function capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const colors = ['text-amber-900'];

    const sumAndAverage = (arr, key) => {
      if (!arr.length) return { sum: 0, average: 0 };
  
      const sum = arr.reduce((acc, obj) => acc + (obj[key] || 0), 0);
      const average = sum / arr.length;
  
      return { sum, average };
    }

    /*const groupedClans = clanNames.reduce((acc, clan) => {
      const firstLetter = clan.title[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(clan);
      return acc;
    }, {});

    const sortedLetters = Object.keys(groupedClans).sort();*/

    const chunkArray = (arr, size = 4) => {
      const chunks = [];
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
      }
      return chunks;
    };

    // ✅ SORT FIRST (A → Z)
    const sortedClans = [...clanNames].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    // ✅ THEN CHUNK INTO MAX 3 PER COLUMN
    const chunkedClans = chunkArray(sortedClans, 4);

    
    return (
        <>
        <div className="flex flex-col min-h-screen">
              <div className="hidden md:block">
              <Header1/>
              </div>
              <div className="md:hidden">
              <HeaderSmallScrn/>
              </div>
              <div className="flex flex-col mt-8 items-center flex-grow"> {/**bg-orange-200/50 */ /*bg-amber-600/10*/}
                <AddNsearchBar/>
                  {/*{(clanNames1.post).length !== 0?<h1 className="mt-10">{capitalizeFirstLetter(tribe)}-ClanPraises ({clanNamesPosts.length})</h1> : ""}*/}
                  {clanNames1.post.length !== 0 && (
                    tribe === 'tinanatelo' ? (
                      <h5 className="mt-6 text-[24px] sm:text-[27px] md:text-[32px] lg:text-[35px] font-bold stroke-black text-amber-500/40">  
                        {capitalizeFirstLetter(tribe)}
                      </h5>
                    ) : (
                      <p className="mt-6 text-[24px] sm:text-[27px] md:text-[32px] lg:text-[35px] font-bold stroke-black text-amber-600/10">
                        {capitalizeFirstLetter(tribe)}
                      </p>
                    )
                  )}

                  {/*<div className="flex justify-center mt-12">
                    {(clanNames1.post).length === 0? <h1>0 results for {capitalizeFirstLetter(tribe)} clan</h1>: <h1 className="text-stone-600 text-[16px] md:text-[20px] lg:pr-60 lg:mr-8 underline font-serif">
                    {capitalizeFirstLetter(clanNames1.tribeId.praises_Plural)} ({clanNames.length})</h1>}
                  </div>*/}
                  <div className="flex-col justify-center items-center">
                    <div className="flex justify-center flex-wrap mt-4 lg:mt-5 lg:max-w-2xl md:max-w-2xl max-auto p-1">
                      {chunkedClans.map((chunk, colIndex) => (
                        <div key={colIndex} className="flex flex-col items-center min-w-[135px] p-1.5">
                          {chunk.map((clan, index) => (
                            <Link
                              key={index}
                              href={
                                clanNames1.post.filter(item => item.title.trim() === clan.title.trim()).length > 1
                                  ? `/${tribe}/${clan.title}`
                                  : `/${tribe}/${clan.title}/${clan.id}`
                              }
                              className={`font-serif text-md md:text-lg hover:underline ${colors[(colIndex + index) % colors.length]}`}
                            >
                              {capitalizeFirstLetter(clan.title)}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div> 
                </div>
                <div className="hidden md:block mt-8 md:mt-12">
                  <Footer />
                </div>
                <div className="md:hidden mt-8 md:mt-12">
                  <FooterMobile />
                </div>
              </div>
              </>
        
    )
}


export async function generateStaticParams() {

  const allposts = await fetch(`${process.env.API_URL}/posts`).then((res) => res.json())

  //const allposts = getAllPosts()

    console.log(allposts)

    const removeDuplicatesBy = (array, key) => {
      return [...new Map(array.map(item => [item[key], item])).values()];
    };


    const tribePages_clansList = removeDuplicatesBy(allposts, 'tribe')

    console.log(tribePages_clansList)

  return tribePages_clansList.map(post => ({
    tribe: post.tribe,
  }));
}