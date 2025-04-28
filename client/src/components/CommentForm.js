import { useState } from "react"

export function CommentForm({loading, error, reviewee, onSubmit, popLoginModal, autoFocus = false, initialValue = "",}) {
  
  const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
  
  const [message, setMessage] = useState(initialValue)
  const [errorMessage, setErrorMessage] = useState()

  function handleSubmit(e) {
    e.preventDefault()

    if (isUserSignedIn.isUserSignedIn===false){
      popLoginModal()
    }
    else{
      if (message ===""){
        setErrorMessage("*required* enter comment")
      }
      else{
        setErrorMessage("")
        try{
        onSubmit(message).then(() => setMessage("")).catch(error => {return Promise.reject(error)})
        }
        catch(error){
        console.log(error);
        }
      }
    }
  }

  const author = reviewee;

  return (
    <div className= "p-1 bg-amber-50/50 ">
    <form onSubmit={handleSubmit}>
      <p className="text-xs mb-0 pb-0 pt-2">comment on <strong>{author}</strong>'s post</p>
      <div className="flex gap-1 mb-2">
      <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="h-8 w-9/12 border border-gray-300 rounded-md"
        />
        <button className="bg-orange-200 text-white text-xs border border-y-orange-600 px-2 py-1 uppercase cursor-pointer rounded-md"  
        type="submit">
          {loading ? "Loading" : "Post"}
        </button>
      </div>
      <div className="error-msg text-xs">{error}{errorMessage}</div>
    </form>
    </div>
  )
}
