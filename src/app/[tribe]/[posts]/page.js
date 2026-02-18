//import PostListClient from "./client-postslists"
import Header1 from "../../../components/Header1"
import HeaderSmallScrn from "../../../components/HeaderSmallScrn"
//import Card from "../../../components/CardClanPraise"
import Card from "../../../components/CardClanPraise_HomePage"
import CardHistory from "../../../components/CardHistory"
import Link from "next/link"
import Footer from "../../../components/Footer"
import FooterMobile from "../../../components/FooterMobile"
import AddNsearchBar from "../../../components/AddClanNsearchBar"
import { redirect, notFound } from "next/navigation";
import { getAllPosts } from "../../../lib/posts"


export const revalidate = 60;
export const dynamicParams = true; 


  export async function generateMetadata({ params }) {

    const { tribe, posts } = await params
   
    console.log(tribe)
    console.log(posts)

    //const postList = await fetch(`${process.env.API_URL}/posts/${tribe}/${posts}`).then((res) => res.json())
    const res = await fetch(`${process.env.API_URL}/posts/${tribe}/${posts}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      notFound();
    }

    const postList = await res.json();


    if (postList.length === 0) {
    
        notFound()
    }
    else {

      return {
          title: `${posts} (${tribe})`,
          keywords: ['clan-praise', 'clanpraise'],
          //description: 'nkhosi Dlamini, wena wekunene, wena weluhlanga',
          themecolor: '#000000',
      }
    }
  }

  export default async function ClanPraisePage({params}) {

    const { tribe } = await params
    const { posts } = await params

    //const postList = await fetch(`${process.env.API_URL}/posts/${tribe}/${posts}`).then((res) => res.json())

    const res = await fetch(`${process.env.API_URL}/posts/${tribe}/${posts}`, {
      next: { revalidate: 60 }
    })

    if (!res.ok) {
      redirect(`/${tribe}`);
    }

    const postList = await res.json();


    console.log(postList)

    if (postList.length === 0) {
    
        redirect(`/${tribe}`)
    }


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
      <p className="mt-8 text-sm text-gray-600/90">{postList.length} results for <strong>{capitalizeFirstLetter(posts)}</strong> clan praise</p>
      <div className="flex flex-wrap justify-center items-center">
        {postList.map((post, index) => (
        <div key={index} className="flex flex-row flex-wrap">
        <Link key={index} href={`/${post.tribe}/${post.title}/${post.id}`}>
          {/*{(post.tribe === "tinanatelo" &&*/}
          <Card
            title={capitalizeFirstLetter(post.title)}
                tribe={post.tribe}
                location={post.location}
                username={post.user.username}
                tribeSingular={""}
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
      {/*<div className="hidden sm:flex justify-center gap-6">
        
        <SendFeedback/>
      </div>*/}

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

    function getUniqueObjectsWithDuplicates(arr, key) {
      const countMap = {}
      const firstSeenMap = {}

      for (const obj of arr) {
        const value = obj[key]

        if (typeof value !== "string") continue

        countMap[value] = (countMap[value] || 0) + 1

        // store first occurrence only
        if (!firstSeenMap[value]) {
          firstSeenMap[value] = obj
        }
      }

      return Object.keys(countMap)
        .filter(value => countMap[value] > 1)
        .map(value => firstSeenMap[value])
    }

    const similarClans_praises = getUniqueObjectsWithDuplicates(allposts, 'title')

    /*function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/\|/g, '-')
      .trim();
  }*/

  return similarClans_praises.map(post => ({
    tribe: post.tribe,
    posts: post.title,
  }));
}