//import PostListClient from "./client-postslists"
import Header1 from "../../../components/Header1"
import HeaderSmallScrn from "../../../components/HeaderSmallScrn"
import SearchBarWithSuggestions from "../../../components/SearchBar"
import AddClanPraise from "../../../components/AddClanPraise"
import Card from "../../../components/CardClanPraise"
import Link from "next/link"

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

    return (
      <>
      <div className="hidden md:block">
      <Header1/>
      </div>
      <div className="md:hidden">
      <HeaderSmallScrn/>
      </div>
      <div className="flex flex-col mt-8">
      <div>
      <SearchBarWithSuggestions/>
      </div>
      <div className="w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] mx-auto mt-12 md:mt-14">
      <AddClanPraise />
    </div>
      <div className="flex flex-col justify-center items-center mt-6">
      {/*<div className="flex mt-16 gap-1">*/}
      <p className="">{postList.length} results for {posts} ({tribe})</p>
      {/*</div>*/}
      <div className="flex flex-wrap">
        {postList.map((post, index) => (
        <div key={index} className="flex flex-row flex-wrap">
        <Link key={index} href={`/${post.tribe}/${post.title}/${post.id}`}>
          <Card
            title={post.title}
            username={post.user.username}
            rating={sumAndAverage(post.reviews, "rating")}
            views={post._count.views}
            reviews={post._count.reviews}
            comments={post._count.comments}
            description={post.body}
            createdAt={post.createdAt}
            //{/*onClick={handleCardClick}*/}
          />
        </Link>
      </div>
        ))
      }
      </div>
      </div>
      </div>
      </>
    )
}
  