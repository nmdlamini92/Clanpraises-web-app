"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";


export default function SwiperSlideComp() {

    return(
        <>
        <Swiper
        modules={[Autoplay]}
        direction="vertical"
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-10 items-center"
      >
        <SwiperSlide>
            <p className="text-purple-700 sm:text-md font-hand ml-3 sm:ml-0">An interactive library of Bantu clans' praises and their meanings</p> 
        </SwiperSlide>
        <SwiperSlide>
          <p className="text-lime-700 sm:text-md font-hand ml-3 sm:ml-0">Find, add, review or discuss clan praises & their meanings</p>
        </SwiperSlide>
        {/*<SwiperSlide>
          <p className="text-indigo-400 text-md font-semibold ml-2">Review/Discuss Clan Praises and Meanings added</p>
        </SwiperSlide>*/}
      </Swiper>
        </>
    )

}