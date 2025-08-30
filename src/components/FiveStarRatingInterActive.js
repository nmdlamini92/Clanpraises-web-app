import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

//const labels = ["ukhe eceleni", "akunetisi", "kuya ngakhona", "kuyamukeleka", "ushaye esicongweni"];
const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

const StarRatingInterActive = forwardRef(({ totalStars = 5, onRate}, ref ) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  useImperativeHandle(ref, () => ({
    changeText(newText) {
      setHover(newText);
      setRating(newText);
    }
  }));

  const handleClick = (star) => {
    setRating(star);
    if (onRate) onRate(star);
  };



  return (
    <div className="flex flex-row items-center space-y-2">
      <div className="flex text-yellow-500 text-[19px] sm:text-[22px] lg:text-2xl space-x-1">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;

          return (
            <span
              key={index}
              onClick={() => handleClick(starValue)}
              onTouchEnd={() => handleClick(starValue)}
              onMouseEnter={() => setHover(starValue)}          //onMouseEnter
              onMouseLeave={() => setHover(0)}        //onMouseLeave
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              {starValue <= (hover || rating) ? <FaStar /> : <FaRegStar />}
            </span>
          );
        })}
      </div>

      {/* Tooltip Label */}
      <div className="text-sm font-semibold text-gray-400 ml-1 h-5">
        {hover ? labels[hover - 1] : labels[rating - 1] || ""}
      </div>
    </div>
  );
});

export default StarRatingInterActive;
