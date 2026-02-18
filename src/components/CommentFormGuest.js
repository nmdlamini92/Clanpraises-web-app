import { useState } from "react"
import Validations from "./Validations";
import axios from "axios";

export default function CommentFormGuest({loading, error, reviewee, onSubmit, popLoginModal, autoFocus = false, initialValue = "",}) {
  
  const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
  
  //const [message, setMessage] = useState(initialValue)
  const [errorMessage, setErrorMessage] = useState()

  //const [yourName, setYourName] = useState("");
  //const [yourEmail, setYourEmail] = useState("");
  const [values, setvalues] = useState({message: "", yourName: "", yourEmail: ""});
  const [errors, setErrors] = useState({message: "", yourName: "", yourEmail: ""});

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true);

    const validationError = Validations.addCommentGuestValidations(values);

            if (validationError){
              console.log(validationError)
              setErrors(validationError);
              setIsLoading(false);
            }
            else{
              setErrors({message:"", yourName:"", yourEmail:""});
              //console.log(values);
              try {

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/validateCommentGuestInput`,
                  {...values},{withCredentials: true}
                );

                console.log(response)

                if (response.data.status===false) {
                  //console.log(response);

                  if (!(response.data.existingName === undefined)){
                    setvalues({ ...values, ['yourName']: response.data.existingName })
                  }
                  console.log("values:", values);
                  setErrors(response.data.errors);
                  setIsLoading(false);

                }
                      
                if (response.data.status===true) {
                  //console.log(response);

                  try {
                    onSubmit(values)
                    //.then(() => setMessage(""))
                    .then(() => {
                      setvalues({message: "", yourName: "", yourEmail: ""});
                      setErrorMessage("");
                      setErrors({message: "", yourName: "", yourEmail: ""});
                      setIsLoading(false);
                    })
                    .catch(error => {return Promise.reject(error)})
                    setErrors(error);
                    }
                    catch(error){
                    console.log(error);
                    //setErrorMessage(error);
                  }
                }
      
              }
              catch (error) {
                console.log(error);
                setIsLoading(false);
              }
            }

  }

  const author = reviewee;

  return (
    <div className= "p-1 bg-amber-50/50 ">
    <form onSubmit={handleSubmit}>
      <p className="text-xs mb-0.5 pb-0 pt-2 ml-0.5 text-gray-500/80"> <strong>LEAVE COMMENT</strong></p>   {/**{author} */}
      <div className="flex-col">
      <div className="flex gap-1">
      <textarea
          autoFocus={autoFocus}
          value={values.message}
          //onChange={e => setMessage(e.target.value)}
          name="message"
          onChange={(e) => { setvalues({...values, [e.target.name]: e.target.value })}}
          className="h-14 w-9/12 border border-amber-500 rounded-md"
      />
      <button className="bg-orange-300/80 text-white border-solid border-[0.5px] border-orange-300 text-xs px-2 py-1 uppercase cursor-pointer rounded-md"  
        type="submit">
          {isLoading ? "Loading" : "Post"}
      </button>
      </div>
      <p className="error-msg text-xs">{error}{errorMessage}{errors.message}</p>
      </div>
        <div className="flex my-2 gap-2 w-[70%]">
                  <div className="flex-col gap-2">
                  <input className="w-full border rounded border-amber-500" name="yourName" placeholder=" name"  //value={values.clanName || ""}  
                    onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                    //onFocus={handleFocus_ClanName}
                    value={values.yourName}
                  />
                  {<p className="error-msg text-xs">{errors.yourName}</p>}
                  </div>
                  <div className="flex-col gap-2">
                  <input className="w-full border rounded border-amber-500" name="yourEmail" placeholder=" email"  //value={values.clanName || ""}  
                    onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                    //onFocus={handleFocus_ClanName}
                    value={values.yourEmail}
                  />
                  {<p className="error-msg text-xs">{errors.yourEmail}</p>}
                  </div>
        </div>
      {/*</div>*/}
    </form>
    </div>
  )
}