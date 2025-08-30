"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Card from './CardClanPraise_HomePage'; // adjust if path differs


export default function MostPopularAllposts({ postList }) {

  const [isCardClicked, setIsCardClicked] = useState(false);


  const scrollRef = useRef(null);

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

  useEffect(() => {
    const marquee = document.querySelector('.animate-marquee');

    if (!marquee) return;

    const pause = () => {
      marquee.style.animationPlayState = 'paused';
    };

    const resume = () => {
      marquee.style.animationPlayState = 'running';
    };

    marquee.addEventListener('touchstart', pause);
    marquee.addEventListener('touchend', resume);

    return () => {
      marquee.removeEventListener('touchstart', pause);
      marquee.removeEventListener('touchend', resume);
    };
  }, []);
                  
  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto mt-1">
      {/* Left arrow */}
      <button
        onClick={() => scrollByAmount(-300)}
        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/30 bg-opacity-70 
        rounded-full p-2 shadow-md hover:bg-opacity-100 "
      >
        ◀
      </button>
    <div ref={scrollRef} className="overflow-x-auto touch-auto scrollbar lg:scrollbar-hide relative w-[320px] sm:w-[640px] md:w-[768px] lg:w-[1024px] mt-1 max-w-5xl mx-auto">
      <div className="animate-marquee flex gap-0.5 sm:gap-2 min-w-max" 
        style={{ animationPlayState: isCardClicked ? 'paused' : 'running' }}>
        {postList.map((post, index) => (
          <div key={index} className="flex flex-row flex-wrap">
            <Link onClick={() => setIsCardClicked(true)} href={`/${post.tribe}/${post.title}/${post.id}`}>
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
                onTouchStart={() => setIsCardClicked(true)}
                onTouchEnd={() => setIsCardClicked(false)}
                onTouchCancel={() => setIsCardClicked(false)}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
    {/* Right arrow */}
      <button
        onClick={() => scrollByAmount(300)}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/30 bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-100"
      >
        ▶
      </button>
    </div>
  );
}
