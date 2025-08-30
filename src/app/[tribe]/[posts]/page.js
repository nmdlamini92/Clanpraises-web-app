//import PostListClient from "./client-postslists"
import Header1 from "../../../components/Header1"
import HeaderSmallScrn from "../../../components/HeaderSmallScrn"
import SearchBarWithSuggestions from "../../../components/SearchBar"
import AddClanPraise from "../../../components/AddClanPraise"
import Card from "../../../components/CardClanPraise"
//import Card from "../../../components/CardClanPraise_HomePage"
import Link from "next/link"
import SendFeedback from "../../../components/SendFeedback"
import BeStakeholderUser from "../../../components/BeStakeholderUser"
import Footer from "../../../components/Footer"
import AddNsearchBar from "../../../components/AddClanNsearchBar"

  export async function generateMetadata({ params }) {

    const { id } = await params
    const { tribe } = await params
    const { posts } = await params
    console.log(id)
    console.log(tribe)
    console.log(posts)
    return {
        title: `${posts} (${tribe})`,
        keywords: ['clan-praise', 'clanpraise'],
        //description: 'nkhosi Dlamini, wena wekunene, wena weluhlanga',
        themecolor: '#000000',
    }
  }

  export default async function ClanPraisePage({params}) {

    const { tribe } = await params
    const { posts } = await params

    const postList = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${tribe}/${posts}`).then((res) => res.json())

    console.log(postList)


    const sumAndAverage = (arr, key) => {
      if (!arr.length) return { sum: 0, average: 0 };
  
      const sum = arr.reduce((acc, obj) => acc + (obj[key] || 0), 0);
      const average = sum / arr.length;
  
      return { sum, average };
    }

    function capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
    <>
    <div className="flex flex-col min-h-screen">
      <div className="hidden md:block">
      <Header1/>
      </div>
      <div className="md:hidden">
      <HeaderSmallScrn/>
      </div>
      <div className="flex flex-col mt-8 flex-grow">
        <AddNsearchBar/>
      <div className="flex flex-col justify-center items-center mt-6">
      <p className="mt-8 text-sm text-gray-600/90">{postList.length} results for {posts} ({tribe})</p>
      <div className="flex flex-wrap justify-center items-center">
        {postList.map((post, index) => (
        <div key={index} className="flex flex-row flex-wrap">
        <Link key={index} href={`/${post.tribe}/${post.title}/${post.id}`}>
          <Card
            title={capitalizeFirstLetter(post.title)}
                tribe={post.tribe}
                username={post.user.username}
                rating={sumAndAverage(post.reviews, "rating")}
                views={post._count.views}
                definitions={post._count.definitions}
                reviews={post.reviews.length}
                comments={post.comments.length}
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
      </div>
      <div className="hidden sm:flex justify-center gap-6 mt-4">
         {/*<BeStakeholderUser/>*/}
        <SendFeedback/>
      </div>
       <div className="sm:hidden mt-4 m-2">
          {/*<BeStakeholderUser/>*/}
       </div>
       <div className="sm:hidden mt-4 m-2">
       </div>
       <div className="mt-8 md:mt-12 lg:mt-8">
         <Footer/>
       </div>
    </div>
</>
    )
}
  