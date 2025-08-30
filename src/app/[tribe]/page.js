import Header1 from "../../components/Header1"
import SearchBarWithSuggestions from "../../components/SearchBar"
import Link from "next/link"
import AddClanPraise from "../../components/AddClanPraise"
import HeaderSmallScrn from "../../components/HeaderSmallScrn"
import Card from "../../components/CardClanPraise"
//import Card from "../../components/CardClanPraise_HomePage"
import Footer from "../../components/Footer"
import SendFeedback from "../../components/SendFeedback"
import BeStakeholderUser from "../../components/BeStakeholderUser"
import MarqueeScroller from "../../components/MostPopularAllposts"
import MostPopularTribePosts from "../../components/MostPopularTribePosts"
import AddNsearchBar from "../../components/AddClanNsearchBar"

  export async function generateMetadata({ params }) {

    const {tribe} = await params
    console.log(tribe)

    function capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    const clanNames1 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clanNames/${tribe}`).then((res) => res.json())
    
    console.log(clanNames1)

    const clanNames = new Set((clanNames1.post).map(obj => obj.title));

    const TribeClanNames = [...clanNames].map(clanName => `${capitalizeFirstLetter(clanName)}`).join(' • ');

    console.log(clanNames);

    if (clanNames1.tribeId.praises_Plural !== 'clanpraises'){
      
      return {
        title: clanNames1.tribeId.praises_Plural,
        description: TribeClanNames,
        themecolor: '#000000',
      }
    }

    return {
        title: `${capitalizeFirstLetter(tribe)}-ClanPraises`,
        description: TribeClanNames,
        themecolor: '#000000',
    }
  }

  export default async function TribePage({params}) {

    const {tribe} = await params
    console.log(tribe)
    
    const clanNames1 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clanNames/${tribe}`).then((res) => res.json())
    console.log(clanNames1)

    const clanNamesPosts = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${tribe}/mostPopularTribePosts`).then((res) => res.json())
    console.log(clanNamesPosts)

    const clanNamesPostsPop = clanNamesPosts.slice(0, 5);
    console.log(clanNamesPostsPop)

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

    if (clanNamesPosts.length > 0 && clanNamesPosts.length < 7) return (
        <>
        <div className="flex flex-col min-h-screen">
        <div className="hidden md:block">
          <Header1/>
        </div>
        <div className="md:hidden">
          <HeaderSmallScrn/>
        </div>
        <div className="flex flex-col items-center mt-8 flex-grow">
          <AddNsearchBar/>
          <div className="flex flex-col justify-center items-center mt-8">
              {(clanNames1.tribeId.praises_Plural !== 'clanpraises' &&
              <h5 className="text-[20px] sm:text-[27px] md:text-[32px] lg:text-[40px] font-bold text-transparent
               stroke-black fill-red-500">{capitalizeFirstLetter(clanNames1.tribeId.praises_Plural)}</h5>
              )}
              {(clanNames1.tribeId.praises_Plural === 'clanpraises' &&
              <p className="text-[20px] sm:text-[27px] md:text-[32px] lg:text-[40px] font-bold text-transparent
               stroke-black fill-red-500">{capitalizeFirstLetter(tribe)}-Clanpraises</p>
              )}
              <div className="flex flex-wrap justify-center items-center">
                {clanNamesPosts.map((post, index) => (
                <div key={index} className="flex flex-row flex-wrap">
                <Link key={index} href={`/${post.tribe}/${post.title}/${post.id}`}>
                  <Card
                     title={capitalizeFirstLetter(post.title)}
                      tribe={post.tribe}
                      username={post.user.username}
                      rating={sumAndAverage(post.numbers.reviews, "rating")}
                      views={post.numbers._count.views}
                      definitions={post.numbers._count.definitions}
                      reviews={post.numbers.reviews.length}
                      comments={post.numbers.comments.length}
                      description={post.body}
                      createdAt={post.createdAt}
                      linkUrl={`/${post.tribe}/${post.title}/${post.id}`}
                  />
                </Link>
                </div>
                ))
                }
              </div>
          </div>
          <div className="hidden sm:flex justify-center gap-5 mt-6">
             {/*<BeStakeholderUser/>*/}
            <SendFeedback/>
          </div>
          <div className="sm:hidden mt-6">
             {/*<BeStakeholderUser/>*/}
            <div className="mt-6">
            <SendFeedback/>
            </div>
          </div>
        </div>
          <div className="mt-6 sm:mt-20 lg:mt-6">
            <Footer/>
          </div>
        </div>
        </>
      )
    
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
                    clanNames1.tribeId.praises_Plural !== 'clanpraises' ? (
                      <h5 className="mt-6 text-[20px] sm:text-[27px] md:text-[32px] lg:text-[40px] font-bold text-transparent stroke-black fill-red-500">
                        {capitalizeFirstLetter(clanNames1.tribeId.praises_Plural)}
                      </h5>
                    ) : (
                      <p className="mt-6 text-[20px] sm:text-[27px] md:text-[32px] lg:text-[40px] font-bold text-transparent stroke-black fill-red-500">
                        {capitalizeFirstLetter(tribe)}-Clanpraises
                      </p>
                    )
                  )}

                  <div>
                    {(clanNames1.post).length !== 0?<h1 className="mt-4 text-sm text-gray-500">Most recent engagement</h1> : ""}
                  <MostPopularTribePosts postList={clanNamesPostsPop} tribe={tribe} />
                  </div>
                  <div className="flex justify-center mt-12">
                    {(clanNames1.post).length == 0? <h1>0 results for {capitalizeFirstLetter(tribe)} clan</h1>: <h1 className="text-stone-600 text-[12px] md:text-[20px] lg:pr-60 lg:mr-8 underline font-serif">
                    Tinanatelo literature collection {capitalizeFirstLetter(tribe)} ({(clanNames1.post).length})</h1>}
                  </div>
                  <div className="flex">
                    <div className="flex justify-center flex-wrap gap-1 mt-4 lg:mt-5 sm:gap-3 md:gap-4 lg:gap-6 max-w-2xl mx-auto p-1"> {/**bg-white/60 bg-amber-600/10*/}
                      {clanNames.map((clanNameObj, index) => (     
                      <Link key={index} href={(((clanNames1.post).filter(item => item.title === clanNameObj.title).length) > 1)?
                        `/${tribe}/${clanNameObj.title}`: `/${tribe}/${clanNameObj.title}/${clanNameObj.id}`}
                        className={`font-serif text-md md:text-lg mr-4 hover:underline ${colors[index % colors.length]}`}>
                        • {capitalizeFirstLetter(clanNameObj.title)}</Link>
                      ))}
                    </div>
                    <div className="hidden lg:block">
                      <div className="flex flex-col items-center">
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
              </div>
              </>
        
    )
}