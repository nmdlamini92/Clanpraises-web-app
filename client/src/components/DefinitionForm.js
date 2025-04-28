import { useState } from "react"
import StarRatingInterActive from "./FiveStarRatingInterActive"
import Validations from "./Validations";

export function DefinitionForm({loading, error, onSubmit, popLoginModal, index, autoFocus = false, initialValue = "",}) {
  
  const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
  
  const [message, setMessage] = useState(initialValue)
  const [rating, setRating] = useState(0);
  const [index1, setIndex] = useState(index);
  const [errorComment, setErrorComment] = useState("");
  const [errorRating, setErrorRating] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (isUserSignedIn.isUserSignedIn===false){
      popLoginModal()
    }
    else{
      if (message === "") {
        //const validationError = Validations.addReviewValidations({comment: message, rating: rating});
        setErrorComment("*required* enter meaning/context");
        //setErrorRating(validationError.errorRating);
      }
      else{
        setErrorComment("");
        //setErrorRating("");
        try{
        onSubmit([message, rating, index1]).then(() => setMessage("")).catch(error => {return Promise.reject(error)})
        }
        catch(error){
        console.log(error);
        }
      }
    }
  }

    const handleRating = (rate) => {
      setRating(rate);
      console.log("User rated:", rate);
    };


  return (
    <div>
      <div className="p-5">
      <h2 className="text-xl font-bold mb-2">Rate this product:</h2>
      <StarRatingInterActive onRate={handleRating} />
      <p className="error-msg">{errorRating}</p>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
      <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="message-input "
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Loading" : "Posti"}
        </button>
      </div>
      <div className="error-msg">{error}{errorComment}</div>
    </form>
    </div>
  )
}
