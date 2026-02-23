"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";


export default function FeaturedLiterature({ TribesList }) {

     const [isATouched, setIsATouched] = useState(false);
     const [isBTouched, setIsBTouched] = useState(false);

      const handleClickA = () => {
        setIsATouched(prev => !prev); // ← Step 3
        onClick?.(); // call the original onClick if provided
      };

    return (

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Tinanatelo */}
            {/*<div className={`flex flex-col items-center gap-2 bg-white/10 p-2 rounded-sm opacity-90
            hover:bg-white/30 hover:opacity-75 hover:scale-105 `}*/}
            
            <div className={`flex flex-col items-center gap-2 bg-white/30 p-2 rounded-md
                             hover:bg-white/30 hover:scale-105 ${isATouched ? 'scale-105' : 'scale-100'}`}
                 onClick={() => setIsATouched(true)}
                 onTouchStart={() => setIsATouched(true)}
                 onTouchEnd={() => setIsATouched(false)}
                 onTouchCancel={() => setIsATouched(false)}
            >
                <Link href={`/swati`}>
                <p className="text-[15px] underline text-center font-serif">
                <strong>Swati - Tinanatelo</strong> ({TribesList.find(obj => obj.tribe === "swati")?._count.clanpraises} clans)
                </p>
                </Link>
                <div className="relative w-[280px] sm:w-[300px] h-[400px] sm:h-[430px]">
                    <Link href={`/swati`}>
                    <Image
                    src="/TinanateloCoverBrown2.png"
                    alt="Tinanatelo Cover"
                    fill
                    className="rounded-md border-2 border-amber-300/60 shadow-md object-cover"
                    /> 
                    </Link>
                </div>
          </div>
          
           {/*<div className={`flex flex-col items-center gap-2 bg-white/30 p-2 rounded-md
                             hover:bg-white/30 hover:scale-105 ${isBTouched ? 'scale-105': 'scale-100'}`}
                 onClick={() => setIsBTouched(true)}
                 onTouchStart={() => setIsBTouched(true)}
                 onTouchEnd={() => setIsBTouched(false)}
                 onTouchCancel={() => setIsBTouched(false)}
            >
            <Link href={`/swati`}>
            <p className="text-[15px] underline text-center font-serif">
              <strong>Swati Clans' History</strong> ({TribesList.find(obj => obj.tribe === "clan-history")?._count.clanpraises} clans)
            </p>
            </Link>
            <div className="relative w-[280px] sm:w-[300px] h-[400px] sm:h-[430px]">
              <Link href={`/clan-history`}>
                <Image
                  src="/ClanHistory8.png"
                  alt="Swazi Clans History Cover"
                  fill
                  className="rounded-md border-2 border-amber-300/60 shadow-md object-cover"
                />
              </Link>
            </div>
          </div>*/}
        </div>

    )
}