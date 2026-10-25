    
 import React, { useState, useEffect, useRef } from 'react';   
 import StarRatingInterActive from "./FiveStarRatingInterActive"
 import { ReviewList } from "./ReviewList"
 import Validations from "./Validations"
    
    export default function ReviewDef_Modal ({ show, handleCloseReviewDefModal, rootDefinitions, rootReviews, definitionId, currentDefRating, currentNumOfDefReviews, handleOpenLogInModal, handleOpenReportModal, 
                                            handleOpenDelete_Modal, VipUserID, createReviewDefinitionFn, createLocalReview, updateLocalDefinition, post, line_nd_index }) {
        
              const childRef = useRef()

              //const [cookies, removeCookie] = useCookies([]);
              const [DefReview, setDefReview] = useState("");
              const [rating, setRating] = useState(null);
              const [errorDefReview, setErrorDefReview] = useState("");
              const [errorRating, setErrorRating] = useState("");

              const [loadingReview, setLoadingReview] = useState(false);
              const [valuesReview, setValuesReview] = useState({rating: null, message: "", yourName: "", yourEmail: ""})
              const [errorsReview, setErrorsReview] = useState({errorRating: "", errorMessage: "", errorName: "", errorEmail: "", message: ""});
              const [errorReview, setErrorReview] = useState('');
             
              const labelsRating = ["ukhe eceleni", "akunetisi", "kuya ngakhona", "kuyamukeleka", "ushaye esicongweni"]   

              console.log(currentDefRating)
              console.log(currentNumOfDefReviews)
              console.log(rating)
              console.log(((currentDefRating + rating)/(currentNumOfDefReviews + 1)))
      
              const handle_ReviewDefinition = async (e) => {
                e.preventDefault();
                setLoadingReview(true);

                console.log(currentDefRating)
                console.log(currentNumOfDefReviews)
                console.log(rating)
                console.log(((currentDefRating + rating)/(currentNumOfDefReviews + 1)))

                const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
                console.log(isUserSignedIn.isUserSignedIn);

                if (isUserSignedIn.isUserSignedIn===false || isUserSignedIn.isUserSignedIn===undefined || isUserSignedIn.isUserSignedIn===null){   //isUserSignedIn.isUserSignedIn===false

                  handleOpenLogInModal()
                }
                else{
                  if (rootDefinitions.filter(definition => definition.id === definitionId)[0].user.id === VipUserID.VipUserId) {
                    setLoadingReview(false);
                    setErrorDefReview("You cannot review your own note");
                  }
                  else{
                  if (DefReview === "" || rating === null) {
                    //const validationError = Validations.addReviewValidations({message: DefReview, rating: rating, author: post.user.username});
                    const validationError = Validations.addReviewValidations(valuesReview);
                    console.log(validationError);

                    if ((validationError.errorRating) || (validationError.errorMessage)) {
                    setErrorsReview(validationError)
                    setLoadingReview(false);
                    //setErrorDefReview(validationError.errorComment);
                    //setErrorRating(validationError.errorRating);
                    //setDefReview(validationError.comment)
                    }
                    else{
                      setErrorsReview({errorRating: "", errorMessage: "", errorName: "", errorEmail: "", message: ""});
                      //setErrorDefReview("");
                      //setErrorRating("");
                      //setDefReview("")
                      childRef.current.changeText(0)
                        try{
                           return createReviewDefinitionFn({ message: valuesReview.message, rating: valuesReview.rating, index: line_nd_index.index, parentId: null, definitionId: definitionId, postId: post.id, newDefRating: ((currentDefRating + valuesReview.rating)/(currentNumOfDefReviews + 1))})
                          .then(response => {
                            console.log(response);
                            if (response) {
                                console.log('Review created successfully')
                                setValuesReview({ ...valuesReview, ['message']: "", ['rating']: null });
                                createLocalReview(response);
                                updateLocalDefinition({id: definitionId, rating: (currentDefRating + valuesReview.rating)/(currentNumOfDefReviews + 1)});
                                setLoadingReview(false)  
                            }
                            else {
                                console.log('Review creation failed')
                            }
                        })
                        .catch(error => {console.error("Error creating Def-review:", error);})
                          }
                          catch(error){
                          console.log(error);
                        }
                    }
                  }
                }
              }

            }

              const handleRating = (rate) => {
                setValuesReview({...valuesReview, ['rating']: rate});
                console.log("User rated:", rate);
              };

              const handleOnFocus = (e) => {
                //e.target.nextSibling.style.display = "none";

                if (isUserSignedIn.isUserSignedIn===false){   //isUserSignedIn.isUserSignedIn===false
                  setTimeout(() => {
                    handleOpenLogInModal();
                  }, 1000); 
                }
              } 

              const handleCloseReviewDefModalfunc1 = () => {
                handleCloseReviewDefModal();
                setValuesReview({rating: null, message: "", yourName: "", yourEmail: ""});
                setErrorsReview({errorRating: "", errorMessage: "", errorName: "", errorEmail: "", message: ""});
                setDefReview("");
                setRating(null);
                setErrorDefReview("");
                setErrorReview('');
              };
      
              return(
                <>
                {show && (
                <div className="modal-backdrop ">
                <div className=" bg-stone-300 w-[90%] md:w-[40%] lg:w-[30%] max-h-[50%] overflow-y-auto p-2 pr-4 pl-4 rounded-lg shadow-md">
                 
                  <button onClick={handleCloseReviewDefModalfunc1} className="mb-2 p-1 "
                  style={{ backgroundColor: "rgba(214, 131, 108)" }}> close
                  </button>
                  
                    <div className="bg-yellow-50/50 flex-col p-2 rounded-md">
                      <div className="flex items-center pb-0.5 gap-2">
                        {/*<p className="text-xs mb-0.5 pt-1 ml-0.5 text-gray-500/80">rate <strong>{rootDefinitions.filter(definition => definition.id === definitionId)[0].user.username}</strong>'s note</p>*/}
                        {<StarRatingInterActive onRate={handleRating} ref={childRef}/>}
                        <p className="error-msg text-xs">{errorsReview.errorRating}</p>
                      </div>
                      <div className="pb-1">
                      <form onSubmit={handle_ReviewDefinition} className="mb-2">
                        <div className="flex gap-1 ">
                        <textarea
                            autoFocus={false} //${rootDefinitions.filter(definition => definition.id === definitionId)[0].user.username}
                            placeholder={`review...`}
                            onFocus={(e) => handleOnFocus(e)}
                            value={valuesReview.message}
                            name="message"
                            onChange={e => setValuesReview({...valuesReview, [e.target.name]:e.target.value})}
                            className="h-8 w-9/12 border-[1.3px] border-solid border-yellow-400 rounded-md placeholder:text-sm placeholder:m-1"
                            rows={2}
                          />
                          <button className="bg-amber-300/60 border-[1.3px] border-solid border-yellow-400/80 text-white text-xs px-2 py-1 uppercase cursor-pointer rounded-md" 
                          type="submit">
                            {loadingReview ? "Loading" : "Review"}
                          </button>
                        </div>
                        <div className="error-msg text-xs ml1">{errorsReview.errorMessage}{errorDefReview}</div>
                      </form>
                  </div>
                  </div>
                  <p>{errorReview}</p>
                  <div>
                  <div className="boarder boarder-red-500">
                    <h3 className="font-bold mt-3 mb-1 ml-1">Reviews ({rootReviews.filter(review => review.definitionId === definitionId).length})</h3>
                    {rootReviews.filter(review => review.definitionId === definitionId) != null && rootReviews.filter(review => review.definitionId === definitionId).length > 0 && (
                    <div className="mt-4">
                    <ReviewList reviews={rootReviews.filter(review => review.definitionId === definitionId)} passOpenLogin={handleOpenLogInModal} passOpenReport={handleOpenReportModal} passOpenDelete={handleOpenDelete_Modal}/>
                    </div>
                    )}
                </div>
                </div>
                </div>
                </div>
                )}
                </>
              )
            }