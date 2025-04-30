import SearchBarWithSuggestions from "./SearchBar";
import React from "react";
import Header1 from "./Header1"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import Link from "next/link";



export default function Homepage(){


  
    return (
      <>
       <div>
     <Header1/>
      <div className="relative z-50">
      <SearchBarWithSuggestions/>
      </div>
      <br></br> <br></br><br></br>
     </div>
      <Swiper
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{
        delay: 5000, // Delay between slides in milliseconds (e.g., 3 seconds)
        disableOnInteraction: false, // Prevent autoplay from pausing on user interactions
      }}
      loop={true} // Loop through slides
      className="h-64"
    >
      <SwiperSlide>
        <div>
          <p>Find or Add your Clan Praise</p>
        <img
          className="h-full w-full object-cover"
          src="https://via.placeholder.com/800x400"
          alt="Slide 1"
        />
        </div>
      </SwiperSlide>

      <SwiperSlide>
      <p>Discover or Define Meaning behind your clan Praise</p>
        <img
          className="h-full w-full object-cover"
          src="https://via.placeholder.com/800x400"
          alt="Slide 2"
        />
      </SwiperSlide>

      <SwiperSlide>
      <p>Review clan praise posts <br></br> Review Meanings posted by others</p>
        <img
          className="h-full w-full object-cover"
          src="https://via.placeholder.com/800x400"
          alt="Slide 3"
        />
      </SwiperSlide>
    </Swiper>
    <div>
      <p>fok</p>
    <Link onClick={handleClickOnTribe} href={''} className="flex flex-row"><p className="text-blue-500 ml-1">Swati (Tnanatelo)</p></Link>
    </div>
    
    </>
    );
  }
 