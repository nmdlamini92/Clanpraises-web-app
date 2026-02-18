'use client';
import React from 'react';
import { FaEdit, FaHeart, FaRegHeart, FaComment, FaScroll, FaTrash, FaEye, FaRegEye } from "react-icons/fa"
import StarRating from './FiveStarRating';
import { IconBtn } from "./IconBtn"
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import FormattedParagraph from './FormattedParagrahOnCard';
import FormattedPoemOnCard from './FormattedPoemOnCard';
import FormattedParagraphOnCard from './FormattedParagrahOnCard';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium"
})

type CardProps = {
  title: string;
  imageUrl: string;
  description: string;
  createdAt: string;
  username: string;
  rating: {
    average: number;
  };
  views: number;
  definitions: number;
  reviews: number;
  comments: number;
  onClick?: () => void;
  linkUrl: string;
};


export default function CardHistory ({ title, imageUrl, description, createdAt, username, rating, views, definitions, reviews, comments, onClick, linkUrl }: CardProps) {

  
  return (
    <>
    <div className="border border-[#ccc] rounded-lg shadow-md overflow-hidden m-4 cursor-pointer
      transition-transform duration-300 ease-in-out hover:bg-white/30 hover:opacity-75 hover:scale-105
     w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[260px] md:h-[260px] lg:w-[290px] lg:h-[290px]"
         >
     <div className="flex justify-between">
                   <span className="username">
                   <IconBtn 
                   Icon={props => <FaUser {...props} //size={12} 
                   className="text-[10px] sm:text-xs text-amber-900"/>} 
                   style={{ marginBottom: 0, marginLeft: 2, marginTop: 2 }}
                   >
                   <p className="text-amber-900 text-[10px] sm:text-xs lowercase"><strong>{username}</strong></p>
                   </IconBtn> 
                   </span>
                   <span className="text-gray-500/50 text-[8px] sm:text-[10px] mt-2 mr-2" >
                   <strong>{dateFormatter.format(Date.parse(createdAt))}</strong>
                   </span>
                 </div>
      <div className="flex justify-center items-baseline gap-1">
        <h2 className="text-[18px] sm:text-[1.5rem] m-0">{title} </h2> 
      </div>
      <div className="flex flex-row justify-around mt-1"> 
        <div className="flex flex-row justify-between">
           <IconBtn
              Icon={props => <FaRegEye {...props} //size={15} 
              className="text-[9px] sm:text-[10px] text-gray-500/60"/>}
              style={{ marginLeft: 6 }}               >
              <p className="text-[9px] sm:text-[10px] text-gray-500/60">{views}</p>
          </IconBtn>
        </div>
        <IconBtn
              Icon={props => <FaScroll {...props} //size={15} 
              className="text-[9px] sm:text-[10px] text-amber-700/30"/>}
              style={{ marginLeft: 6 }}
              >
              <p className="text-[9px] sm:text-[10px] text-gray-500/70">{definitions}</p>
        </IconBtn>
        {/*<div className="flex flex-col justify-center items-center mr-1">
        <StarRating rating={rating.average} /> 
        <p className="text-[8px] sm:text-[9px] text-stone-600/80">({reviews} Reviews)</p>
        </div>*/}
        </div>
        <div className='w-[180px] h-[92px] sm:w-[240px] sm:h-[123px] md:w-[240px] md:h-[140px] lg:w-[270px] lg:h-[170px] ml-2'>
      {/*<p className="my-2 text-[12px] sm:text-[14px]">{description}</p>*/}
      <div className='my-2'>
      <FormattedParagraphOnCard text={description}/>
      </div>
      </div>
      <div className="flex justify-around">
        <IconBtn
              Icon={props => <FaComment {...props} //size={15} 
              className="text-[9px] sm:text-[10px] text-gray-400"/>}
              style={{ marginLeft: 6 }}
              >
              <p className="text-[9px] sm:text-[10px] text-gray-500">{comments}</p>
        </IconBtn>
        {/*<IconBtn
              Icon={props => <FaScroll {...props} //size={15} 
              className="text-[10px] sm:text-xs text-amber-700/30"/>}
              style={{ marginLeft: 6 }}
              >
              <p className="text-[10px] sm:text-xs text-gray-500/70">{definitions}</p>
        </IconBtn>*/}
      </div>
    </div>
    </>
  );
};