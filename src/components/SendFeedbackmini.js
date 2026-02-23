'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Validations from "./Validations";
import { FaComment } from "react-icons/fa";

export default function SendFeedback() {

   const [isUserSignedIn, setIsUserSignedIn] = useState({isUserSignedIn: null});
       
           useEffect(() => {
               // This code runs only in the browser
               const signInStatus = JSON.parse(localStorage.getItem('isUserSignedIn'));
               setIsUserSignedIn(signInStatus);
             }, []);

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

                
                  const [isLoading, setIsLoading] = useState(false);

                  const handlesSubmitFeedback = async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                      
                      console.log(values.message)

                      const validationError = Validations.sendFeedbackGuestlidations(values);

                      if (isUserSignedIn.isUserSignedIn===null || isUserSignedIn.isUserSignedIn===false || isUserSignedIn.isUserSignedIn===undefined) { 

                            if (validationError) {
                              setErrors(validationError);
                              setIsLoading(false);
                            }
                            else {
                              setErrors({message:"", yourName:"", yourEmail:""});
                                  //console.log(values);
                                  try {
                    
                                      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkEmailValidity`,
                                        {...values},{withCredentials: true}
                                      );
                      
                                    console.log(response)
                    
                                    if (response.data.status===false) {
                                     
                                      setErrors(response.data.errors);
                                      setIsLoading(false);
                    
                                    }
                                          
                                    if (response.data.status===true) {
                                      //console.log(response);
                    
                                      try {
                                        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/feedback`,
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
                        }
                        else{

                          if (!values.message || values.message.trim() === ""){
                            setErrors({ ...errors, message: "*required" });
                            setIsLoading(false);
                          }
                          else {

                              setErrors({message:"", yourName:"", yourEmail:""});
                              //console.log(values);

                              try {
                                        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/feedback`,
                                            {...values},{withCredentials: true}
                                          );
                                          console.log(response);
                                  
                                          if (response.data.isFeedbackSent) {
                                            //toast.success("Feedback sent successfully");
                                            setIsLoading(false)
                                            alert("Thank you for your feedback")
                                            handleCloseUserProfileModal();
                                          }
                                          else {
                                            console.log(response.data);
                                            setIsLoading(false)
                                            setErrors({ ...errors, ['message']: "server error" })
                                          }
                                      } 
                                      catch (error) {
                                        console.error("Error while sending feeback:", error);
                                      }
                                    }
                              }
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
                          {/*<div className="flex-col gap-2">
                          <input className="w-full border rounded border-amber-400" name="yourName" placeholder=" name"  //value={values.clanName || ""}  
                            onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                            //onFocus={handleFocus_ClanName}
                            value={values.yourName}
                          />
                          {<p className="error-msg text-xs">{errors.yourName}</p>}
                          </div>*/}
                          {(isUserSignedIn.isUserSignedIn===null || isUserSignedIn.isUserSignedIn===false || isUserSignedIn.isUserSignedIn===undefined) && (
                            <div className="flex-col gap-2">
                            <input className="w-full border rounded border-amber-400" name="yourEmail" placeholder=" your email"  //value={values.clanName || ""}  
                              onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                              //onFocus={handleFocus_ClanName}
                              value={values.yourEmail}
                            />
                            {<p className="error-msg text-xs">{errors.yourEmail}</p>}
                            </div>
                          )}
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
        <div className="flex rounded-md"> 
        <div className="flex justify-center items-center gap-0.5 px-0.5 border-b border-gray-200 cursor-pointer">
            <FaComment className="text-gray-500/80 cursor-pointer" size={11}/>
            <button className="bg-transparent text-xs text-gray-700 p-0 normal-case" 
            onClick={handleOpenUserProfileModal}> Send Feedback
            </button>
        </div>
        </div>
        </>
    )
}