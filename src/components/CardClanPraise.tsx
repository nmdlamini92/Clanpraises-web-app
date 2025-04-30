//'use client';
import React from 'react';
import { FaEdit, FaHeart, FaRegHeart, FaComment, FaTrash, FaEye, FaRegEye } from "react-icons/fa"
import StarRating from './FiveStarRating';
import { IconBtn } from "./IconBtn"
import { FaUser } from 'react-icons/fa';

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
  reviews: number;
  comments: number;
  onClick?: () => void;
  linkUrl: string;
};

//const Card: React.FC<CardProps> = ({ title, imageUrl, description, etc.. }) => {
export default function Card ({ title, imageUrl, description, createdAt, username, rating, views, reviews, comments, onClick, linkUrl }: CardProps) {
  return (
    <>
    {/*<a href={linkUrl} className="card-link">*/}
    <div className="card" onClick={onClick}>
     <div className="flex justify-between bg-amber-100 border border-[#ccc]">
                   <span className="username">
                   <IconBtn 
                   Icon={props => <FaUser {...props} size={12} className="text-amber-900"/>} 
                   style={{ marginBottom: 0, marginLeft: 2, marginTop: 2 }}
                   >
                   <p className="text-amber-900 text-xs"><strong>{username}</strong></p>
                   </IconBtn> 
                   </span>
                   <span className="text-gray-400 text-[10px] mt-2 mr-2" >
                   <strong>{dateFormatter.format(Date.parse(createdAt))}</strong>
                   </span>
                 </div>
      <div className="card-title-container">
        <h2 className="card-title">{title}</h2>
      </div>
      <div className="card-interactions"> 
        <div className="flex flex-row justify-between">
           <IconBtn
              Icon={props => <FaRegEye {...props} size={15} />}
              style={{ marginLeft: 6 }}               >
              {views}
          </IconBtn>
        </div>
        <div className="flex flex-col justify-center items-center mr-1">
        <StarRating rating={rating.average} /> 
        <p className="text-[9px]">({reviews} Reviews)</p>
        </div>
        </div>
        <div className='card-description-container ml-2'>
      <p className="card-description text-sm">{description}</p>
      </div>
      <div className="flex justify-center">
      <IconBtn
              Icon={props => <FaComment {...props} size={15} />}
              style={{ marginLeft: 6 }}
              >
              {comments}
          </IconBtn>
          </div>
    </div>
    {/*</a>*/}
    </>
  );
};

//export default Card;