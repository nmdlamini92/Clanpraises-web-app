import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  
  return (
    <div className="flex text-yellow-600/50 text-xs"> 
      {[...Array(totalStars)].map((_, index) => {         //text-yellow-500
        const starValue = index + 1;

        return (
          <span key={index} className="">
            {rating >= starValue ? (
              <FaStar />
            ) : rating >= starValue - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
