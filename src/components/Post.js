"use client"
import { usePost } from "../contexts/PostContext"
import { useAsyncFn } from "../hooks/useAsync"
import { createReview, createReviewDefinition, deleteReview} from "../services/Reviews"
import { createDefinition, updateDefinition, deleteDefinition } from "../services/Definitions"
import { viewpost, reportPost } from "../services/posts"
import { ReviewForm } from "./ReviewForm"
import { ReviewList } from "./ReviewList"
import { DefinitionList } from "./DefinitionList"
import HighlightableTex33 from "./HighlightableTex33"
import {React, useState, useEffect, useRef} from "react"
import { IconBtn } from "./IconBtn"
import { FaTrash, FaShareAlt, FaRegComment, FaRegEye, FaFlag, FaUser, FaScroll, FaStar, FaComment } from "react-icons/fa"
//import { useCookies } from "react-cookie"
import axios from "axios"
import SignUpComp from "./SignUpComp"
import SignInComp from "./SignInComp"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import FormattedParagraph from "./FormattedParagraph";
import StarRating from "./FiveStarRating"
import FacebookShareButton from "./ShareOnFacebook"
import Validations from "./Validations"
import StarRatingInterActive from "./FiveStarRatingInterActive"
import { createComment, deleteComment, createCommentOnDef} from "../services/Comments"
import { CommentList } from "./CommentList"
import { CommentForm } from "./CommentForm"


const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium"
})


export function Post() {
    console.log('you clicked this clan praise');
    console.log(window.location.href);

    const childRef = useRef()

    
    const { post, rootReviews = [], rootComments = [], rootDefinitions = [], createLocalReview, deleteLocalReview, createLocalComment, deleteLocalComment, createLocalDefinition, updateLocalDefinition, deleteLocalDefinition} = usePost()
    console.log(post);
    console.log(post.definitions);
    
    console.log(rootComments) 
    console.log(rootDefinitions);
    console.log(rootReviews);
    console.log(`192.168.1.172:3000/${post.tribe}/${post.title}/${post.id}`);
    console.log(post.user.id);

    const VipUserID = JSON.parse(localStorage.getItem('VipUserId'));
    const currentUser = {id: VipUserID.VipUserId}
    console.log(currentUser);

    const [reportData, setReportData] = useState({postId: post.id, definitionId: null, commentId: null, reviewId: null})
    const [deleteData, setDeleteData] = useState({postId: post.id, id: post.id})
    //const [likes, setLikes] = useState({likeCount: post._count.likesCP, likedByMe: post.isPostLikedByMe})
    const [postId, setPostId] = useState(post.id);
    const [numOfReviews, setNumOfReviews] = useState(post.reviews.length);
    const [numOfDissCussionComments, setNumOfDissCussionComments] = useState(post._count.comments);
    console.log(reportData);
    console.log(numOfDissCussionComments);
    const [definitionsArray, setDefinitionsArray] = useState(post.definitions);

    useEffect(() => {

      const timer = setTimeout(() => {
        console.log('7 seconds have passed!');

        const viewpost = async () => {
          try{
            const  data  = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/:id/viewpost`,
              {postId},
              { withCredentials: true }
            );
            console.log(data.data);
            if (data.data.status){
              console.log(data.data.status);
              console.log("new view added on clan praise post")
            }
            else{
              console.log("no view added")
            }
          }
          catch(error) {
            console.log(error);
          }
        }
        viewpost();
      }, 7000);
  
      // Cleanup the timeout if the component unmounts before 7 seconds
      return () => clearTimeout(timer);
    }, []);

    //const toggleLike_onClanPraise_Fn = useAsyncFn(toggleLike_onClanPraise)
    const { loading, error, execute: createReviewFn } = useAsyncFn(createReview)
    const { loading1, error1, execute: createCommentFn } = useAsyncFn(createComment)
    const { loading6, error6, execute: createCommentOnDefFn } = useAsyncFn(createCommentOnDef)
    const {loading2, error2, execute: createDefinitionFn} = useAsyncFn(createDefinition)
    const { loading3, error3, execute: createReviewDefinitionFn } = useAsyncFn(createReviewDefinition)
    const {loading4, error4, execute: updateDefinitionFn} = useAsyncFn(updateDefinition)
    const {loading5, error5, execute: logReportFn} = useAsyncFn(reportPost)
    const deleteCommentFn = useAsyncFn(deleteComment)
    const deleteDefinitionFn = useAsyncFn(deleteDefinition)
    const deleteReviewFn = useAsyncFn(deleteReview)


    const [errorMessage, setErrorMessage] = useState("")


    function onReviewCreate(message) {

        try{
          return createReviewFn({ postId: post.id, message })
          .then(response => {
            createLocalReview(response);
            setNumOfReviews(numOfReviews + 1);
            setAverageRating((averageRating+message[1])/2)
          })
          .catch(error => {console.error("Error creating review:", error);})
          }
          catch(error){
          console.log(error);
        } 
    }

    function onCommentCreate(message) {

      try{
        return createCommentFn({ postId: post.id, message, definitionId: null, index: null })
        .then(response => {
          createLocalComment(response);
          setNumOfDissCussionComments(numOfDissCussionComments + 1);
        })
        .catch(error => {console.error("Error creating comment:", error); setErrorMessage(error)})
        }
        catch(error){
        console.log(error);
      }
  }

  
    const [show_DeletePost_Modal, setShow_DeletePost_Modal] = useState(false);
        
        const handleOpenDelete_Modal = (deleteData) => {
          if (deleteData.id !== post.id){
            setDeleteData(deleteData)
          }

          setShow_DeletePost_Modal(true);
        };

        const handleCloseDelete_Modal = () => {
          setShow_DeletePost_Modal(false);
        };


      const DeletePost_Modal = ({ show, handleClose, children, }) => {

        console.log(deleteData)
        console.log(deleteData.postType === 'comment')

        const handle_deletePost = async () => {

          if (deleteData.postType === 'comment'){
            return deleteCommentFn
            .execute({ postId: deleteData.postId, id: deleteData.id })
            .then(comment => {deleteLocalComment(comment.id)
              handleCloseDelete_Modal()
            })
          }
          if (deleteData.postType === 'definition'){
            return deleteDefinitionFn
            .execute({ postId: deleteData.postId, id: deleteData.id, clan: post.title, tribe: post.tribe,
              definition: rootDefinitions.filter(definition => definition.id === deleteData.id)[0], 
              reviews: rootReviews.filter(review => review.definitionId === deleteData.id),
              comments: rootComments.filter(comment => comment.definitionId === deleteData.id)})
            .then(definition => {deleteLocalDefinition(definition.id)
              handleCloseDelete_Modal()
            })
          }
          if (deleteData.postType === 'review'){
            return deleteReviewFn
            .execute({ postId: deleteData.postId, id: deleteData.id })
            .then(review => {deleteLocalReview(review.id)
              handleCloseDelete_Modal()
            })
          }
          try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete_ClanPraise`,
                {post},{withCredentials: true}
              );
              console.log(response);
      
              if (response.data.isDeleted) {
                toast.success("Successfully deleted clanPraise");
                setShow_DeletePost_Modal(false);
                setTimeout(() => {
                  window.location.href = "/";
                }, 1000); // 2000ms = 2 seconds
              }
            //} 
            else {
              console.log(response.data);
            }
          } 
          catch (error) {
          console.error("Error while DELETING clan praise:", error);
          }
        }

        return(
          <>
          {show && (
          <div className="modal-backdrop-clear">
          <div className="modal">
          <p>Are sure you want to delete {deleteData.postType}</p>
          <div>
            <button onClick={handleCloseDelete_Modal}>No</button>
            <button onClick={handle_deletePost}>Yes</button>
          </div>
          </div>
          </div>
          )}
          </>
        )
      }


      const [showReportModal, setShowReportModal] = useState(false);

      const handleOpenReportModal = (reportData) => {

        if (reportData.postId===null){
          setReportData(reportData);
          }
          setShowReportModal(true);
        };

        const handleCloseReportModal = () => {
          setShowReportModal(false);
        };

      const ReportModal = ({ show, handleClose, children }) => {

        const [errors11, setErrors11] = useState("");
        const [comment, setComment] = useState();
        const [isWhyReportlVisible, setIsWhyReportVisible] = useState(false);
        const [selectedOption, setSelectedOption] = useState("");

        console.log(reportData)
        
          const handleChange = (event) => {
            setErrors11("");
            setSelectedOption(event.target.value);
            console.log(selectedOption);

            if(event.target.value === 'other'){
              setIsWhyReportVisible(true);
            }
            else{
              setIsWhyReportVisible(false);
            }
          }
          
          const handleSendReport = async (e) => {

            e.preventDefault();
            console.log(selectedOption);
          
            if(!selectedOption){
                setErrors11("reason for report required");
            }
            else{
              setErrors11("");
              try {
                return logReportFn({...reportData, message: selectedOption})
                .then(response => {
                  toast.success(response.reportLogged);
                  setShowReportModal(false);
                })
                .catch(error => {console.error("Error creating review:", error);})
              } 
              catch (error) {
              console.error("Error while reporting clan praise:", error);
              }
            }
          }

        return(
          <>
          {show && (                          
          <div className="modal-backdrop">
          <div className="modal">
          <button className="close-button" onClick={handleClose}>Close</button>   
          <p>why are you reporting this clan praise?</p>
            <select
            id="dropdown"
            value={selectedOption}
            onChange={handleChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="" disabled>
              -- why are you reporting  post --
            </option>
            <option value="wrong">not associated with {post.title} in any way</option>
            <option value="offensive">contains in-appropriate language</option>
            <option value="other">Other</option>
          </select>
            <br></br>
            {isWhyReportlVisible && 
              <>
              <p className= 'error-msg'>please specify reason</p>
              <input type="text"  onChange={(e)=>setSelectedOption(e.target.value)}/>
              </>}
            <br></br>
            <button onClick={handleSendReport}>Send Report</button>
            {errors11 && <span className= 'error-msg'> {errors11} </span>}
          </div>
          </div>
          )}
          </>
        )
      }

       const [isSignUpCompVisible, setIsSignUpCompVisible] = useState(true);
       const [isSignInCompVisible, setIsSignInCompVisible] = useState(false);
       const [showLogInModal, setShowLogInModal] = useState(false);
       const [userName, setUserName] = useState();

       const handleOpenLogInModal = () => {
        setShowLogInModal(true);
      };
    
      const handleCloseLogInModal = () => {
        setShowLogInModal(false);
      };
    
      const LogInModal = ({ show, handleClose, setShowLogInModal, handleCloseLogInModal, isSignUpCompVisible, setIsSignUpCompVisible, isSignInCompVisible, setIsSignInCompVisible}) => {

        console.log('madafvcker');

        const [testing, setTesting] = useState();

        const handleChildData = (data) => {

          console.log(data);
          console.log(data == 'SignUpSuccess');
          console.log(data == 'SwitchToSignIn');
            if (data[0] == 'SignUpSuccess'){
              setUserName(data[1]);
              //handleCloseLogInModal();
              setShowLogInModal(false);
              window.location.reload()
              toast.success("Successfully signed-up");
            }
            if (data[0] == 'SignInSuccess'){
              setUserName(data[1]);
              //handleCloseLogInModal();
              setShowLogInModal(false);
              window.location.reload()
              toast.success("Successfully signed-in");
            }
            if (data == 'SwitchToSignIn'){
              console.log("wtf kantsi");
              setIsSignUpCompVisible(false);
              setIsSignInCompVisible(true);
              setTesting(true);
            }
            if (data == 'SwitchToSignUp'){
              setIsSignInCompVisible(false);
              setIsSignUpCompVisible(true);
            }
          }

        return(
          <>
            {show && (
              <div className="modal-backdrop">
                <div className="modal">
              <button className="p-1 mb-1 text-xs bg-red-800/60" onClick={handleClose}>Close</button>
              {isSignUpCompVisible && <SignUpComp onDataChange={handleChildData} />}
              {isSignInCompVisible && <SignInComp onDataChange={handleChildData} />}
              </div>
              </div>
            )}
          </>
        )
      }


      const [definitions, setDefinitions] = useState();
      const [numOfDefinitions, setNumOfDefinitions] = useState();
      const [definitionId, setDefinitionId] = useState();
      const [currentDefRating, setCurrentDefRating] = useState();
      const [currentNumOfDefReviews, setCurrentNumOfDefReviews] = useState();
      //const [definitionReviews, setDefinitionReviews] = useState([]);
      const [selectedLineIndex, setSelectedLineIndex] = useState();
      const [line_nd_index, setLine_nd_index] = useState();
      const [showDefinitions_Modal, setShowDefinitions_Modal] = useState(false);

      const handle_ShowDefinitions_Modal = async (selectedLine) => {

        console.log(selectedLine);
        setSelectedLineIndex(selectedLine.index);
        setLine_nd_index(selectedLine);
       
        setShowDefinitions_Modal(true);
        console.log(definitions);
        console.log(line_nd_index)
        //alert(`You clicked: "${line_nd_index[0]}"`);
      };

      const handleCloseDefinitions_Modal = () => {
        setShowDefinitions_Modal(false);
      }

      const Definitions_Modal = ({ show, line_nd_index, children, }) => {

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
        const [checkStatus, setCheckStatus] = useState();
        const [errorDef, setErrorDef] = useState();

        function onDefinitioncreate(e) {
          e.preventDefault();
          console.log(isUserSignedIn)
          if (isUserSignedIn.isUserSignedIn===false){   //isUserSignedIn.isUserSignedIn===false
            handleOpenLogInModal()
          }
          else{
            if (definition ==="") {
              setErrorDef("*required");
              console.log('ya')
            }
            else{
              setErrorDef("");
          try{
            return createDefinitionFn({ postId: post.id, message: definition, index: selectedLineIndex, rating: 0 })
            .then(response => {
              createLocalDefinition(response);
              setDefinitionsArray([response, ...definitionsArray])
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
            console.log(defData);
            //setDefinitionReviews(defData.defReviews);
            setDefinitionId(defData.defId);
            setShowReviewDefModal(true);
            setCurrentDefRating(defData.defRating)
            setCurrentNumOfDefReviews(defData.numbOfDefReviews)
          }

        const handleOpenDefCommentsModal = (defData) => {
          console.log(defData)
          setDefinitionId(defData.defId)
          setShowDefCommentsModal(true)
        }

        return(
          <>
          {show && (               // min-w-[300px] max-w-[90vw] min-h-[200px]
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="relative w-[95%] md:w-[45%] lg:w-[35%]  max-h-[60%] overflow-y-auto bg-gray-200 p-4 rounded-lg shadow-lg"> {/*bg-[url('./resources-media/MapChart_Def.png')] bg-cover bg-center*/}
          <button onClick={handleCloseDefinitions_Modal}>Close</button>
          <p className="font-bold mt-2 mb-2 text-amber-900 bg-white w-fit"> "{line_nd_index.line}"</p>

          <form onSubmit={onDefinitioncreate}>
            <div className="comment-form-row ">
            <div className="relative min-w-[60%]">
              <textarea
                className="message-input border p-2 w-full bg-gray-50"
                onFocus={(e) => (e.target.nextSibling.style.display = "none")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.nextSibling.style.display = "block";
                }}
                onChange={e => setDefinition(e.target.value)}
              />
              <div className="absolute left-2 top-2 text-gray-400 pointer-events-none">
                add meaning/context...
              </div>
            </div>
              <button className="btn" type="submit" disabled={loading}>
              {loading ? "Loading" : <>add <br></br> note</>}
              </button>
            </div>
              <div className="error-msg">{errorDef}</div>
          </form>
            <div className="boarder boarder-red-500">
              <p className="text-xs text-lime-700">*stick to {post.tribe} lang if possible*</p>
            <h3 className="font-bold mt-3 mb-1 ml-1">Notes ({rootDefinitions.filter(definition => definition.index === selectedLineIndex).length})</h3>
              {((rootDefinitions.filter(definition => definition.index === selectedLineIndex).length==0) && (false)) &&  //(currentUser.id==null))
              (<div className="text-xs flex text-stone-400 ml-1">get notified when new note is added <p onClick={handleOpenLogInModal} className="text-blue-500 ml-1 underline cursor-pointer">Sign-Up</p></div>)}
              <>
              
              {rootDefinitions.filter(definition => definition.index === selectedLineIndex) != null && rootDefinitions.filter(definition => definition.index === selectedLineIndex).length > 0 && (
                  <div className="mt-4">
                    <DefinitionList definitions={rootDefinitions.filter(definition => definition.index === selectedLineIndex)} passDefReviews={handleReviewDef} passOpenDefComments={handleOpenDefCommentsModal} passOpenLogin={handleOpenLogInModal} passOpenReport={handleOpenReportModal} passOpenDelete={handleOpenDelete_Modal}/>
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

  

      const [showReviewDefModal, setShowReviewDefModal] = useState(false);

          const handleCloseReviewDefModal = () => {
          setShowReviewDefModal(false);
          };

      const ReviewDef_Modal = ({ show, handleClose, definitions, children, }) => {
        
              //const [cookies, removeCookie] = useCookies([]);
              const [DefReview, setDefReview] = useState("");
              const [rating, setRating] = useState(null);
              const [errorDefReview, setErrorDefReview] = useState("");
              const [errorRating, setErrorRating] = useState("");

              console.log(currentDefRating)
              console.log(currentNumOfDefReviews)
              console.log(rating)
              console.log(((currentDefRating + rating)/(currentNumOfDefReviews + 1)))
      
              const handle_ReviewDefinition = async (e) => {
                e.preventDefault();

                console.log(currentDefRating)
                console.log(currentNumOfDefReviews)
                console.log(rating)
                console.log(((currentDefRating + rating)/(currentNumOfDefReviews + 1)))

                const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
                console.log(isUserSignedIn.isUserSignedIn);

                if (isUserSignedIn.isUserSignedIn===false){
                  handleOpenLogInModal()
                }
                if (rootDefinitions.filter(definition => definition.id === definitionId)[0].user.id === VipUserID.VipUserId) {
                  setErrorDefReview("You cannot review your own note");
                }
                else{
                  if (DefReview === "" || rating === null) {
                    const validationError = Validations.addReviewValidations({comment: DefReview, rating: rating, author: post.user.username});
                    setErrorDefReview(validationError.errorComment);
                    setErrorRating(validationError.errorRating);
                    setDefReview(validationError.comment)
                    }
                    else{
                      setErrorDefReview("");
                      setErrorRating("");
                      setDefReview("")
                      childRef.current.changeText(0)
                        try{
                          return createReviewDefinitionFn({ message: DefReview, rating: rating, index: line_nd_index.index, parentId: null, definitionId: definitionId, postId: post.id, newDefRating: ((currentDefRating + rating)/(currentNumOfDefReviews + 1))})
                          .then(response => {
                            createLocalReview(response);
                            updateLocalDefinition({id: definitionId, rating: (currentDefRating + rating)/(currentNumOfDefReviews + 1)})  
                        })
                        .catch(error => {console.error("Error creating Def-review:", error);})
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
      
              return(
                <>
                {show && (
                <div className="modal-backdrop-clear">
                <div className="bg-amber-50 w-[90%] md:w-[40%] lg:w-[30%] p-4 pr-4 pl-4 rounded-lg shadow-md">
                  <button onClick={handleCloseReviewDefModal}>close</button>
                   <div className="bg-amber-50/50 ">
                    <div className="flex items-center p-1 gap-2">
                    <p className="text-xs mb-0 pb-0 pt-2">rate <strong>{rootDefinitions.filter(definition => definition.id === definitionId)[0].user.username}</strong>'s note</p>
                    {<StarRatingInterActive onRate={handleRating} ref={childRef}/>}
                    <p className="error-msg text-xs">{errorRating}</p>
                  </div>
                  <div className="pb-1 pl-1">
                  <form onSubmit={handle_ReviewDefinition} className="mb-2">
                    <div className="flex gap-1 mb-1">
                    <textarea
                        autoFocus={false}
                        placeholder={`review ${rootDefinitions.filter(definition => definition.id === definitionId)[0].user.username}\'s note...`}
                        value={DefReview}
                        onChange={e => setDefReview(e.target.value)}
                        className="h-8 w-9/12 border border-gray-300 rounded-md placeholder:text-md placeholder:m-1"
                        rows={2}
                      />
                      <button className="bg-orange-200 text-white text-xs border border-y-orange-600 px-2 py-1 uppercase cursor-pointer rounded-md" 
                      type="submit">
                        {loading ? "Loading" : "Review"}
                      </button>
                    </div>
                    <div className="error-msg text-xs ml-1">{error}{errorDefReview}</div>
                  </form>
                  </div>
                  </div>
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


      const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);


      const [showDefCommentsModal, setShowDefCommentsModal] = useState(false);

          const handleCloseDefCommentsModal = () => {
          setShowDefCommentsModal(false);
          };

          const handleOpenDefCommentsModal = () => {
            setShowDefCommentsModal(true)
          }

      const DefComments_Modal = ({ show, handleClose, definitions, children, }) => {
        
        const [DefComment, setDefComment] = useState("");
        const [errorDefComment, setErrorDefComment] = useState("");

        console.log(definitionId)
        console.log(selectedLineIndex)

        const handle_commentOnDefinition = async (e) => {
          e.preventDefault();

          console.log(definitionId)
          console.log(selectedLineIndex)

          const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
          console.log(isUserSignedIn.isUserSignedIn);

          if (isUserSignedIn.isUserSignedIn===false){
            handleOpenLogInModal()
          }
          else{
            if (DefComment === "" || DefComment === null) {
              setErrorDefComment("*required* enter comment")
              }
              else{
                setErrorDefComment("");
                  try{
                    return createCommentOnDefFn({ message: DefComment, index: selectedLineIndex, parentId: null, definitionId: definitionId, postId: post.id })
                    .then(response => {
                      createLocalComment(response);
                      //updateLocalDefinition({id: definitionId, rating: (currentDefRating + rating)/(currentNumOfDefReviews + 1)})  
                  })
                  .catch(error => {console.error("Error creating Def-review:", error);})
                    }
                    catch(error){
                    console.log(error);
                    setErrorDefComment(error)
                  }
              }
            }
          }

        return(
          <>
          {show && (
          <div className="modal-backdrop-clear">
          <div className="bg-amber-50 p-5 rounded-lg max-w-sm w-full shadow-md">
            <button onClick={handleCloseDefCommentsModal}>close</button>
            <div className= "p-1 bg-amber-50/50 ">
              <form onSubmit={handle_commentOnDefinition}>
                <p className="text-xs mb-0 pb-0 pt-2">comment on <strong>{rootDefinitions.filter(definition => definition.id === definitionId)[0].user.username}</strong>'s post</p>
                <div className="flex gap-1 mb-2">
                <textarea
                    autoFocus={false}
                    value={DefComment}
                    onChange={e => setDefComment(e.target.value)}
                    className="h-8 w-9/12 border border-gray-300 rounded-md"
                  />
                  <button className="bg-orange-200 text-white text-xs border border-y-orange-600 px-2 py-1 uppercase cursor-pointer rounded-md"  
                  type="submit">
                    {loading ? "Loading" : "Post"}
                  </button>
                </div>
                <div className="error-msg text-xs">{errorDefComment}</div>
              </form>
            </div>
            <div className="boarder boarder-red-500">
              <h3 className="font-bold mt-3 mb-1 ml-1">Comments ({rootComments.filter(comment => comment.definitionId === definitionId).length})</h3>
              {rootComments.filter(comment => comment.definitionId === definitionId) != null && rootComments.filter(comment => comment.definitionId === definitionId).length > 0 && (
              <div className="mt-4">
              <CommentList comments={rootComments.filter(comment => comment.definitionId === definitionId)}  passOpenLogin={handleOpenLogInModal} passOpenReport={handleOpenReportModal} passOpenDelete={handleOpenDelete_Modal}/>
              </div>
              )}
            </div>
          </div>
          </div>
          )}
          </>
        )
      }


    const sumAndAverage = (arr, key) => {
      if (!arr.length) return { sum: 0, average: 0 };
    
      const sum = arr.reduce((acc, obj) => acc + (obj[key] || 0), 0);
      const average = sum / arr.length;
    
      return { sum, average };
    }

    const postRating = sumAndAverage(post.reviews, "rating");
    
    console.log(post.reviews);
    console.log(postRating.average)

    const [averageRating, setAverageRating] = useState(postRating.average);

    const [isReviewTabActive, setIsReviewTabActive] = useState(true)
    const [isDiscussionTabActive, setIsDiscussionTabActive] = useState(false)

    const handleClickReviewsTab = () => {
      console.log('clicked reviews tab');
      setIsDiscussionTabActive(false);
      setIsReviewTabActive(true);
    }

    const handleClickDiscussionTab = () => {
      console.log('clicked discussion tab');
      setIsReviewTabActive(false);
      setIsDiscussionTabActive(true)
    }

    function sumProperty(array, property) {
      return array.reduce((sum, obj) => sum + (obj[property] || 0), 0);                             
    }

    

  return (
    <div className="flex flex-col justify-center items-center border">
      <ToastContainer/>
      <Definitions_Modal show={showDefinitions_Modal} handleClose={handleCloseDefinitions_Modal}  line_nd_index={line_nd_index} ></Definitions_Modal>
      <ReviewDef_Modal show={showReviewDefModal} handleClose={handleCloseReviewDefModal}></ReviewDef_Modal> 
      <DefComments_Modal show={showDefCommentsModal} handleClose={handleCloseDefCommentsModal}></DefComments_Modal>
      <LogInModal show={showLogInModal} handleClose={handleCloseLogInModal} isSignUpCompVisible={isSignUpCompVisible} setIsSignUpCompVisible={setIsSignUpCompVisible} isSignInCompVisible={isSignInCompVisible} setIsSignInCompVisible={setIsSignInCompVisible} setShowLogInModal={setShowLogInModal}></LogInModal>
      <ReportModal show={showReportModal} handleClose={handleCloseReportModal}> </ReportModal>
      <DeletePost_Modal show={show_DeletePost_Modal} handleClose={handleCloseDelete_Modal}> </DeletePost_Modal>
      <div className="border sm:px-1 md:px-0 w-[100%] md:min-w-[50%] md:max-w-[50%] lg:min-w-[40%] lg:max-w-[40%]"> 
      <div className="flex flex-row justify-center bg-white/60"> 
       <h1 className='text-yellow-600 text-2xl font-bold'>{post.title}</h1>
       <IconBtn
          Icon={props => <FaShareAlt {...props} size={15} className="text-gray-400"/>}
          style={{ marginLeft: 4}}
        >
        </IconBtn>
        <FacebookShareButton  text={post.body} url={`192.168.1.172:3000/${post.tribe}/${post.title}/${post.id}`}/>

       </div>
       <div>
      <div className="flex flex-row justify-between pt-4 bg-white/60"> 
        <IconBtn
        
          Icon={props => <FaRegEye {...props} size={15} className="text-gray-600"/>}
          style={{ marginLeft: 6 }}
        >
          <p className="text-gray-500">{post._count.views}</p>
        </IconBtn>
        <IconBtn
                  Icon={props => <FaScroll {...props} size={15} className="text-bg-amber-700"/>} //className="text-gray-600"
                  onClick={handleClickDiscussionTab}
                  style={{ marginLeft: 6, color: "rgba(180, 83, 9, 0.5)" }}
               >
                <p className="text-gray-500 loweercase">{rootDefinitions.length}</p>
              </IconBtn>
      
        <div className="flex flex-col justify-center items-center mr-2 cursor-pointer" onClick={handleClickReviewsTab}>
        <StarRating rating={(sumProperty(rootReviews.filter(review => review.index === null), "rating"))/(rootReviews.filter(review => review.index === null).length)}/>
        <p className="text-[9px] text-gray-600">({rootReviews.filter(review => review.index === null).length} Reviews)</p>
        </div>
          </div>   
            <div className=" flex items-center justify-center bg-white/60 h-fit"> {/*boader border-red-500 */}
            <FormattedParagraph text={post.body} onLineClick={handle_ShowDefinitions_Modal} definitions={rootDefinitions} />
          </div>
          <div className="flex justify-between text-blue bg-white/60 border"> {/*border-orange-500 */}
            <div className="flex flex-col">
              <span className="username">
              <IconBtn 
              Icon={props => <FaUser {...props} size={16} className="text-amber-900 bg-white/60"/>} 
              style={{ marginBottom: 0 }}
              >
              <p className="text-amber-900"><strong>{post.user.username}</strong></p>
              </IconBtn> 
              </span>
              <span className="text-gray-400 text-[9px] mt-0 ml-1 bg-white/60" >
              <strong>{dateFormatter.format(Date.parse(post.createdAt))}</strong>
              </span>
            </div>
              <span>
              <div className=" flex items-center">
               <IconBtn
                  Icon={props => <FaRegComment {...props} size={15} className="text-gray-500"/>} //className="text-gray-600"
                  onClick={handleClickDiscussionTab}
                  style={{ marginLeft: 6 }}
               >
                <p className="text-gray-600">{numOfDissCussionComments}</p>
              </IconBtn>
              </div>
              </span>
            <span>
            {!(post.user.id === currentUser.id) && (
            <>
       <IconBtn
          Icon={props => <FaFlag {...props} size={15} className="text-yellow-700"/>}
          onClick={handleOpenReportModal}
        >
          <p className="text-red-700 text-[10px]"></p>
        </IconBtn>
        </>
          )}
          {post.user.id === currentUser.id && (
            <>
              <IconBtn
                onClick={handleOpenDelete_Modal}            
                Icon={props => <FaTrash {...props} size={20} className="text-stone-400" />}
                aria-label="Delete"
                //color="danger"
                style={{ marginLeft: 12 }}
              />
            </>
          )}
          </span>
          </div>
          </div>
           <div className=" flex flex-col items-center mt-2">           
            </div>
          <div className="boarder"> {/* border-red-500 */}
            <div className="flex">
            <h3 className={`font-bold mt-3 mb-1 ml-1 p-1 bg-gray-100 w-[40%]  hover:bg-yellow-100 
                              transition-colors cursor-pointer ${isReviewTabActive ? "bg-yellow-100" : ""}`}
                  onClick={handleClickReviewsTab}> Reviews ({rootReviews.filter(review => review.index === null).length})</h3>           
              <h3 className={`font-bold mt-3 mb-1 ml-1 p-1 bg-gray-100 w-[40%] hover:bg-yellow-100 
                              transition-colors cursor-pointer ${isDiscussionTabActive ? "bg-yellow-100" : ""}`}
                  onClick={handleClickDiscussionTab}> Discussion ({rootComments.filter(comment => comment.index === null).length})</h3>
            </div>
            <>
            {(isReviewTabActive) && (
                <div className="mt-4 mb-4">
                <ReviewForm
                loading={loading}
                error={error}
                reviewee={post.user}
                onSubmit={onReviewCreate}
                popLoginModal={handleOpenLogInModal}
                postId={post.id}
                index={null}
                />
                </div>
              )}
              </>
              <>
            {((rootReviews.filter(review => review.index === null) != null && rootReviews.filter(review => review.index === null).length > 0) && isReviewTabActive) && (
                <div className="mt-4">
                <ReviewList reviews={rootReviews.filter(review => review.index === null)} passOpenLogin={handleOpenLogInModal} passOpenReport={handleOpenReportModal} passOpenDelete={handleOpenDelete_Modal}/>
              </div>
            )}
            </>
            <>
            {(isDiscussionTabActive) && (
              <div className="mt-4 mb-4">
              <CommentForm
              loading={loading1}
              error={errorMessage}
              reviewee={post.user.username}
              onSubmit={onCommentCreate}
              popLoginModal={handleOpenLogInModal}
              postId={post.id}
              index={null}
              />
              </div>
            )}
            </>
            <>
            {((rootComments != null && rootComments.length > 0) && isDiscussionTabActive) && (
                <div className="mt-4 mb-4">
                  <CommentList comments={rootComments.filter(comment => comment.index === null)} passOpenLogin={handleOpenLogInModal} passOpenReport={handleOpenReportModal} passOpenDelete={handleOpenDelete_Modal}/>
                </div>
            )}
            </>
          </div>
          </div>
    </div>
  )
}
