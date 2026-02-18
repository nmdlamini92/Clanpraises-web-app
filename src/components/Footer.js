import Link from "next/link";
import SendFeedback from "./SendFeedbackmini";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer border border-t-1 border-gray-300 bg-stone-300/50">
            <div className="flex justify-around items-center gap-2 my-8 mx-14 text-gray-600">
            
                <div className="flex justify-center items-center gap-14">
                    <SendFeedback/>
                </div>
                <Link href={"https://www.facebook.com/people/Clan-praises/61587423537078/"}>
                    <div className="bg-white/60 rounded border border-gray-300 p-0.5">
                    <FaFacebook className="text-gray-500/80" size={20}/>
                    </div>
                </Link>
                <div className="flex justify-center items-center">
                    <p className="text-xs">&copy; 2026 clanpraises.com  All rights reserved.</p>
                </div>
                <div className="flex gap-5 text-sm">
                    <Link href="/about" className="hover:underline">About</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                    <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                    {/*<Link href="/terms">Terms of Service</Link>*/}
                </div>
                
            </div>
        </footer>
    );
}