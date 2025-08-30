'use client'
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Validations from "./Validations";

export default function SendFeedback() {

    const [showUserProfileModal, setShowUserProfileModal] = useState(false);
    //const [feedback, setFeedback] = useState("");

    
    
    
                const handleOpenUserProfileModal = () => {
                  setShowUserProfileModal(true);
                };
                    
                const handleCloseUserProfileModal = () => {
                  setShowUserProfileModal(false);
                };
              
                const UserProfile_Modal = ({ handleClose}) => {

                  const [values, setvalues] = useState({message: "", yourName: "", yourEmail: ""});
                  const [errors, setErrors] = useState({message: "", yourName: "", yourEmail: ""});

                  //const [feedback, setFeedback] = useState("");
                  //const [error, setError] = useState("");
                  const [isLoading, setIsLoading] = useState(false);

                  const handlesSubmitFeedback = async (e) => {
                    e.preventDefault();
                    setIsLoading(true)

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
                    
                                    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/validateCommentGuestInput`,
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
                                        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/feedback`,
                                            {...values},{withCredentials: true}
                                          );
                                          console.log(response);
                                  
                                          if (response.data.isFeedbackSent) {
                                            //toast.success("Feedback sent successfully");
                                            alert("Thank you for your feedback")
                                            handleCloseUserProfileModal();
                                          }
                                          else {
                                            console.log(response.data);
                                            setIsLoading(false)
                                            //setErrors({ ...errors, ['message']: e.target.value })
                                          }
                                      } 
                                      catch (error) {
                                        console.error("Error while sending feeback:", error);
                                      }
                                    }
                          
                                  }
                                  catch (error) {
                                    console.log(error);
                                    setIsLoading(false);
                                  }
                                }
                    
                    
                    /*if (feedback === "") {
                      setError("Please enter your feedback");
                    }
                    else {
                      setError("");
                      try {
                        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/feedback`,
                            {feedback},{withCredentials: true}
                          );
                          console.log(response);
                  
                          if (response.data.isFeedbackSent) {
                            //toast.success("Feedback sent successfully");
                            alert("Thank you for your feedback")
                            handleCloseUserProfileModal();
                          }
                          else {
                            console.log(response.data);
                          }
                      } 
                      catch (error) {
                        console.error("Error while sending feeback:", error);
                      }
                  };*/
                    }          
                  return(
                    <>
                      {showUserProfileModal && (
                        <div className="modal-backdrop">
                          <div className=" bg-gray-200 p-3 rounded-lg shadow-lg">
                        <button className="p-1 mb-1 text-xs bg-red-800/60" onClick={handleCloseUserProfileModal}>Close</button>
                        <form onSubmit={handlesSubmitFeedback}>
                        <div className="flex flex-col gap-1">
                        <div className="comment-form-row ">
                        <div className="relative min-w-[60%]">
                        <textarea
                            className="message-input border border-amber-400 p-2 w-full bg-gray-50"
                            onFocus={(e) => (e.target.nextSibling.style.display = "none")}
                            onBlur={(e) => {
                            if (!e.target.value) e.target.nextSibling.style.display = "block";
                            }}
                            name="message"
                            value={values.message}
                            onChange={e => setvalues({ ...values, [e.target.name]: e.target.value })}
                        />
                        <div className="absolute left-2 top-2 text-gray-400 pointer-events-none">
                          feedback...
                        </div>
                        </div>
                        <button className="bg-amber-300/60 border-solid border-[0.3px] border-amber-400 py-0.5" type="submit" >
                            {isLoading ? "Loading" : "Send"}
                        </button>
                        </div>
                        <div className="error-msg text-xs">{errors.message}</div>
                        <div className="flex my-2 gap-2 w-[60%]">
                          <div className="flex-col gap-2">
                          <input className="w-full border rounded border-amber-400" name="yourName" placeholder=" name"  //value={values.clanName || ""}  
                            onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                            //onFocus={handleFocus_ClanName}
                            value={values.yourName}
                          />
                          {<p className="error-msg text-xs">{errors.yourName}</p>}
                          </div>
                          <div className="flex-col gap-2">
                          <input className="w-full border rounded border-amber-400" name="yourEmail" placeholder=" email"  //value={values.clanName || ""}  
                            onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                            //onFocus={handleFocus_ClanName}
                            value={values.yourEmail}
                          />
                          {<p className="error-msg text-xs">{errors.yourEmail}</p>}
                          </div>
                        </div>
                        </div>
                        </form>
                        </div>
                        </div>
                      )}
                    </>
                  )
                }

    return (        //bg-amber-100
        <>
        <UserProfile_Modal></UserProfile_Modal>
        <div className="flex flex-col border rounded-md border-gray-300">
        <p className="text-xs p-0.5 bg-white/10 text-stone-800">how can we improve this platform?</p> 
        <button className="bg-amber-200/50" onClick={handleOpenUserProfileModal}>Send Us Feedback</button>
        </div>
        </>
    )
}