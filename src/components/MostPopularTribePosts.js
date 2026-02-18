"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
//import Card from './CardClanPraise_HomePage'; // adjust if path differs
import Card from './CardClanPraise_HomePage';


export default function MostPopularTribePosts({ postList, tribeSingular }) {

  const [isCardClicked, setIsCardClicked] = useState(false);

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

  return (
    <div className="overflow-x-auto scrollbar-hide touch-auto relative w-[320px] sm:w-[640px] md:w-[768px] lg:w-[1024px] mt-1 max-w-5xl mx-auto">
      <div className="animate-marquee flex gap-0.5 sm:gap-2 min-w-max"
        style={{ animationPlayState: isCardClicked ? 'paused' : 'running' }}>
        {postList.map((post, index) => (
          <div key={index} className="flex flex-row flex-wrap">
            <Link onClick={() => setIsCardClicked(true)}
              href={`/${post.tribe}/${post.title}/${post.id}`}>
              <Card
                title={capitalizeFirstLetter(post.title)}
                tribe={post.tribe}
                location={post.location}
                tribeSingular={""}
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
  );
}