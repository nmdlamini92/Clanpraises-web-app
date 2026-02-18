import ClanPraiseClient from "./client-clanpraise";
import SendFeedback from "../../../../components/SendFeedback";
import { redirect, notFound } from "next/navigation";
import { getAllPosts } from "../../../../lib/posts";


export const revalidate = 60;
export const dynamicParams = true;

  export async function generateMetadata({ params }) {

    const { slug, id, tribe, posts } = await params;

    console.log(id)

    //const clanpraise = await fetch(`${process.env.API_URL}/headers/${id}`).then((res) => res.json())
    const res = await fetch(`${process.env.API_URL}/headers/${id}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      notFound();
    }

    const clanpraise = await res.json();

    console.log(clanpraise)

    if (clanpraise === undefined || clanpraise === null) {

      notFound()
    }
    else {

      return {
        title: `${clanpraise.title} clan praise`,
        description: clanpraise.body,
        keywords: ['clan praise', 'clan history', 'sinanatelo', 'tinanatelo', 'umlandvo'],
        
        openGraph: {
          title: `${clanpraise.title} clan praise`,
          description: clanpraise.body,
          url: `${process.env.OPENGRAPH_SITE_URL}/${clanpraise.tribe}/${clanpraise.title}/${clanpraise.id}`,
          images: [
            {
              url: `${process.env.OPENGRAPH_SITE_URL}/og/${id}`,
              width: 1200,
              height: 630,
            },
          ],
          type: 'article',
        },
        
        twitter: {
          card: 'summary_large_image',
          title: `${clanpraise.title} clan praise`,
          description: clanpraise.body,
          images: [`${process.env.OPENGRAPH_SITE_URL}/og/${id}`],
        },
      };
    }
  }


  export default async function ClanPraisePage({params}) {

    const { id, tribe, posts } = await params;

    //const clanpraise = await fetch(`${process.env.API_URL}/headers/${id}`).then((res) => res.json())

    const res = await fetch(`${process.env.API_URL}/headers/${id}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      redirect(`/${tribe}/${posts}`);
    }

    const clanpraise = await res.json();

    console.log(clanpraise)

    if (clanpraise === undefined || clanpraise === null) {

         redirect(`/${tribe}/${posts}`);
    }
    else {

      return (
          <div>
          <ClanPraiseClient />
          </div>
      )
    }
    
}


export async function generateStaticParams() {


   const allposts = await fetch(`${process.env.API_URL}/posts`).then((res) => res.json())

   //const allposts = getAllPosts()

    console.log(allposts)

    /*function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/\|/g, '-')
      .trim();
  }*/

  return allposts.map(post => ({
    tribe: post.tribe,
    posts: post.title,
    id: post.id.toString()
  }));
}

        