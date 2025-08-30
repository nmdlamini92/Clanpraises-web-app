import ClanPraiseClient from "./client-clanpraise";
import SendFeedback from "../../../../components/SendFeedback";


  export async function generateMetadata({ params }) {

    const { id, tribe, posts } = await params
    
    console.log(id)

    const clanpraise = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/headers/${id}`).then((res) => res.json())

    console.log(clanpraise)

    return {
        title: `${clanpraise.title} (${tribe})`,
        keywords: ['clan-praise', 'clanpraise'],
        description: clanpraise.body,
        themecolor: '#000000',
    }
  }

  export default function ClanPraisePage() {
    return (
        <div>
        <ClanPraiseClient />
        </div>
    )
}
        