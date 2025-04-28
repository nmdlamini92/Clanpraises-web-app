import { useState, useRef } from "react"
import StarRatingInterActive from "./FiveStarRatingInterActive"
import Validations from "./Validations";

export function ReviewForm({loading, error, onSubmit, reviewee, popLoginModal, postId, autoFocus = false, initialValue = "",}) {

  //const [postAuthorName, setPostAuthorName] = useState("");
  //setPostAuthorName(reviewee);
  console.log(postId);
  console.log(reviewee);

  const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));

  const childRef = useRef()

  const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  const [message, setMessage] = useState(initialValue)
  const [rating, setRating] = useState(null);
  const [errorComment, setErrorComment] = useState("");
  const [errorRating, setErrorRating] = useState("");
  const [serverError, setServerError] = useState("");

  const author = reviewee;
  console.log(author);
  
  function handleSubmit(e) {
    e.preventDefault();

    if (isUserSignedIn.isUserSignedIn===false){
      popLoginModal()
    }
    else{
      if (message === "" || rating === null) {
        const validationError = Validations.addReviewValidations({comment: message, rating: rating, author: author});
        setErrorComment(validationError.errorComment);
        setErrorRating(validationError.errorRating);
        setMessage(validationError.comment)
        //setErrorComment("");
      }
      else{
        setErrorComment("");
        setErrorRating("");
        setServerError("");
        childRef.current.changeText(0)
        try{
        onSubmit([message, rating])
        //.then(() => setMessage(""))
        .then(() => {
          setMessage("");
          setErrorComment("");
          setErrorRating("");
          setServerError("");
          setRating(null);
          if (childRef.current) {
              childRef.current.changeText(0);
          }
        })
        .catch(error => {return Promise.reject(error)})
        }
        catch(error){
        console.log(error);
        //setServerError(error);
        }
      }
    }
  }

  const serverError1 = error;
  console.log(serverError1);
  //setServerError(serverError1);

    const handleRating = (rate) => {
      setRating(rate);
      setErrorRating("")
      console.log("User rated:", rate);
    };
    

  return (
    <div className="bg-amber-50/50 ">
      <div className="flex items-center p-1 gap-2">
      <p className="text-xs mb-0 pb-0 pt-2">rate <strong>{author}</strong>'s post</p>
      {<StarRatingInterActive onRate={handleRating} ref={childRef}/>}
      <p className="error-msg text-xs">{errorRating}</p>
    </div>
    <div className="pb-1 pl-1">
    <form onSubmit={handleSubmit} className="mb-2">
      <div className="flex gap-1 mb-1">
      <textarea
          autoFocus={autoFocus}
          placeholder={`review ${author}\'s post...`}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="h-8 w-9/12 border border-gray-300 rounded-md placeholder:text-md placeholder:m-1"
          rows={2}
        />
        <button className="bg-orange-200 text-white text-xs border border-y-orange-600 px-2 py-1 uppercase cursor-pointer rounded-md" 
        type="submit">
          {loading ? "Loading" : "Review"}
        </button>
      </div>
      <div className="error-msg text-xs ml-1">{error}{errorComment}</div>
    </form>
    </div>
    </div>
  )
}
