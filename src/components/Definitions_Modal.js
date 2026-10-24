import React, { useState, useEffect } from 'react';
import { DefinitionList } from "./DefinitionList"
import axios from 'axios';


export default function Definitions_Modal ({ show, post, line_nd_index, definitions, rootDefinitions, definitionsArray, createDefinitionFn, createLocalDefinition, setDefinitionsArray, 
                             setDefinitionId, handleOpenLogInModal, handleCloseDefinitions_Modal, handleOpenReportModal, handleOpenDelete_Modal, handleOpenReviewDefModal, selectedLineIndex, selectedPageIndex }) {
  
          useEffect(() => {
            if (show) {
              // Prevent scrolling
              document.body.style.overflow = "hidden";
            } else {
              // Restore scrolling
              document.body.style.overflow = "";
            }

            // Clean up on unmount
            return () => {
              document.body.style.overflow = "";
            };
          }, [show]);



        console.log(definitions);
        console.log(line_nd_index)
        console.log(definitionsArray);
        console.log(rootDefinitions);

        //const definitionz = definitionsArray.filter(definition => definition.index === selectedLineIndex)
        const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
        const [definitionsList, setDefinitionList] = useState();
        const [definition, setDefinition] = useState("");
        //setDefinitionList(definitions);
        console.log(definitionsList);
        //const [checkStatus, setCheckStatus] = useState();
        

        const [loadingNote, setLoadingNote] = useState(false);
        const [valuesNote, setValuesNote] = useState({message: "", yourName: "", yourEmail: ""})
        const [errorsNote, setErrorsNote] = useState({message: "", yourName: "", yourEmail: ""});
        const [errorDef, setErrorDef] = useState('');

        useEffect(() => {
          console.log("Definitions_Modal MOUNTED");

          return () => {
            console.log("Definitions_Modal UNMOUNTED");
          };
        }, []);

        useEffect(() => {
          console.log("Textarea state:", valuesNote.message);
        }, [valuesNote.message]);


        async function onDefinitioncreate(e) {

          console.log('HANDLE CREATE BLOODY DEFINITION')
          e.preventDefault();
          console.log(isUserSignedIn)


          if (isUserSignedIn.isUserSignedIn===false){   //isUserSignedIn.isUserSignedIn===false
            
           handleOpenLogInModal()
          }
          else{
            if (valuesNote.message.trim() ==="" && isUserSignedIn.isUserSignedIn === true) {
              //setErrorNote("*required");
              setErrorsNote({ ...valuesNote, ['message']: "*required" })
              console.log('ya')
            }
            else{
              console.log('CALLING CREATE DEFINITION API')
              setErrorsNote({ ...valuesNote, ['message']: "" });
              try{
                return createDefinitionFn({ postId: post.id, message: valuesNote.message, index: selectedLineIndex, page: selectedPageIndex, rating: 0 })
                .then(async response => {
                  console.log(response);
                createLocalDefinition(response);
                setDefinitionsArray([response, ...definitionsArray])

                if (response) {
                    console.log('Definition created successfully')
                    setValuesNote({ ...valuesNote, ['message']: "" });

                    //call API to start background process to send email notifications to users who are following this post
                    const response2 = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/startDefinitionNotificationBGprocess`,
                      {definitionId: response.id, postId: post.id, clanname: post.title, tribe: post.tribe},{withCredentials: true})
                    console.log(response2)
                    if (response2.data.status) {
                      console.log('Notifications sent successfully')
                    } else {
                      console.log('Failed to send notifications')
                    }
                  }
                  else {
                    console.log('Definition creation failed')
                  }

                })
                .catch(error => {console.error("Error creating definition:", error);
                setErrorDef(error)
                })
              }
              catch(error){
              //console.log(error);
              setErrorDef(error)
              } 
            }
          }
        }
          
        const handleReviewDef = (defData) => {

          if(isUserSignedIn.isUserSignedIn === false) {
            handleOpenLogInModal()
          }
          else {
            console.log(defData);
            //setDefinitionReviews(defData.defReviews);
            setDefinitionId(defData.defId);
            //setShowReviewDefModal(true);
            handleOpenReviewDefModal()
            setCurrentDefRating(defData.defRating)
            setCurrentNumOfDefReviews(defData.numbOfDefReviews)
          }

        }

        const handleOpenDefCommentsModal = (defData) => {
          console.log(defData)
          setDefinitionId(defData.defId)
          setShowDefCommentsModal(true)
        }

        const handleOnFocus = (e) => {
           e.preventDefault();
          e.target.nextSibling.style.display = "none";

          if (isUserSignedIn.isUserSignedIn===false){   //isUserSignedIn.isUserSignedIn===false
            setTimeout(() => {
              handleOpenLogInModal();
            }, 1000); 
          } 
          
        }

        //console.log(line_nd_index.line.trim().split(/\s+/).filter(Boolean).length)

        return(
          <>
          {show && (               // min-w-[300px] max-w-[90vw] min-h-[200px]
          <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="relative w-[95%] sm:w-[60%] md:w-[45%] lg:w-[35%] max-h-[60%] overflow-y-auto p-4 pt-2 rounded-lg shadow-lg" 
                style={{ backgroundColor: "rgba(205, 187, 167)" }}>
          <button onClick={handleCloseDefinitions_Modal} className="p-1 mb-2"
            style={{ backgroundColor: "rgba(214, 131, 108)" }}>Close</button>
          <p className="font-bold mt-2 mb-3 whitespace-pre-wrap text-amber-900 bg-yellow-50 w-fit"
             style={{ fontSize: post.tribe === "history"? "11px" : "14px" }}>
            "{line_nd_index.line}"</p>
          <div className= "p-2 pb-0.5 bg-gray-100/60 rounded-md md:max-w-[90%] lg:max-w-[76%]">  {/*bg-amber-50/50*/}
          <form onSubmit={onDefinitioncreate}>  
            <div className="flex flex-col">
            <div className="flex gap-1.5 w-fit leading-none">
            <div className="relative">
              <textarea
                className="message-input w-full border-[1.3px] border-yellow-400 bg-gray-50"
                onFocus={ (e) => { console.log("TEXTAREA FOCUS"); handleOnFocus(e)}}
                onBlur={(e) => {if (!e.target.value) e.target.nextSibling.style.display = "block";}}
                name="message"
                value={valuesNote.message}
                onChange={e => {
                  //setValuesNote({ ...valuesNote, [e.target.name]: e.target.value })}}
                  setValuesNote(prev => ({...prev, message: e.target.value}));}}
              />
              <div className="absolute left-2 top-2 text-gray-400 pointer-events-none text-sm">
                {/*faka lwati ngale'sisho... <br></br>*/}
                {(((line_nd_index.line.replace(/,/g, "").trim().split(/\s+/).filter(Boolean).length > 1) && (post.tribe !== "clan-history"))  && (
                  <p className="text-gray-400">Add meaning/context...</p>
                )
                )}
                {(((line_nd_index.line.replace(/,/g, "").trim().split(/\s+/).filter(Boolean).length === 1) && (post.tribe !== "clan-history"))   && (
                  <p className="text-gray-400">Add context...</p>
                )
                )}
                {((post.tribe === "history")   && (
                  <p className="text-gray-400"></p>
                )
                )}
              </div>
            </div>
              <button className="bg-amber-300/60 border-[1.3px] border-solid border-yellow-400/80 text-sm" type="submit" > {/*disabled={loading}*/}
              {loadingNote ? "Loading" : <p className="text-sm">add <br></br> note</p>}
              </button>
            </div>
            {/*<p className="text-[11px] text-lime-700 w-fit leading-none">*bhala ngesiSwati nawukhonile*</p>*/}
              <div className="text-red-500 w-fit text-xs mt-1">{errorsNote.message}</div>
          <div className="flex w-[75%] mt-1.5 mb-1.5">
          </div>       
          </div>
          </form>
          </div>
           <p>{errorDef}</p>
            <div className="boarder boarder-red-500">
              
            <h3 className="font-bold mt-3 mb-1 ml-1">Notes ({rootDefinitions.filter(definition => definition.index ===  selectedLineIndex && definition.page === selectedPageIndex).length})</h3>
              {((rootDefinitions.filter(definition => definition.index === selectedLineIndex).length==0) && (false)) &&  //(currentUser.id==null))
              (<div className="text-xs flex text-stone-400 ml-1">get notified when new note is added <p onClick={handleOpenLogInModal} className="text-blue-500 ml-1 underline cursor-pointer">Sign-Up</p></div>)}
              <>
              
              {rootDefinitions.filter(definition => definition.index === selectedLineIndex) != null && rootDefinitions.filter(definition => definition.index === selectedLineIndex).length > 0 && (
                  <div className="mt-4">
                    <DefinitionList definitions={rootDefinitions.filter(definition => definition.index === selectedLineIndex && definition.page === selectedPageIndex)} 
                    passDefReviews={handleReviewDef} passOpenDefComments={handleOpenDefCommentsModal} passOpenLogin={handleOpenLogInModal} passOpenReport={handleOpenReportModal} passOpenDelete={handleOpenDelete_Modal}/>
                  </div>
                )}
              </>
            </div>
          </div>
          </div>
          )}
          </>
        )
      }