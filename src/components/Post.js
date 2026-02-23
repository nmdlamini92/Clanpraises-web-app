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
import { FaTrash, FaShareAlt, FaMapMarkerAlt, FaFlag, FaUser, FaScroll, FaStar, FaComment, FaChartBar, FaPoll, FaChartLine, FaEye } from "react-icons/fa"
//import { useCookies } from "react-cookie"
import axios from "axios"
import SignUpComp from "./SignUpComp"
import SignInComp from "./SignInComp"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import FormattedPoem from "./FormattedPoem";
import FormattedParagraphs from "./FormattedParagraphs";
import StarRating from "./FiveStarRating"
import FacebookShareButton from "./ShareOnFacebook"
import ShareButton from "./Sharebutton"
import ShareClanPraise from "./ShareClanPraise"
import Validations from "./Validations"
import StarRatingInterActive from "./FiveStarRatingInterActive"
import { createComment, deleteComment, createCommentOnDef} from "../services/Comments"
import { CommentList } from "./CommentList"
import { CommentForm } from "./CommentForm"
import NotificationToggle from "./EmailNotificationsButton"
import Card from "./CardClanPraise_HomePage"
import Link from "next/link"
import FormattedParagraphsUnclickable from "./FormattedParagraphsUnclickable"
import WhatsAppShareButton from "./ShareOnWhatsApp"
import TwitterShareButton from "./ShareOnTwitter"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation";




const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium"
})


export function Post() {

    console.log('you clicked this clan praise');
    console.log(window.location.href);

    //const params = useParams();
    //console.log("PARAMS:", params);

    //const router = useRouter();

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

    const guestEmail = JSON.parse(localStorage.getItem('guestEmail'));
    //const [guestEmail, setGeuestEmail] = useState(JSON.parse(localStorage.getItem('guestEmail')))
    console.log(guestEmail);
    console.log(!guestEmail);

    //console.log(guestEmail === null)
    //if (guestEmail === null) {
      //setGeuestEmail('ewww')
    //}

    console.log(guestEmail)

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
            const  data  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/viewpost`,
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
          if (deleteData.postType === 'note'){
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/delete_ClanPraise`,
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
          <div className="modal bg-stone-200">
          <p>Are sure you want to delete {deleteData.postType}?</p>
          <div className="flex gap-4">
            <button onClick={handleCloseDelete_Modal} className="">No</button>
            <button onClick={handle_deletePost} className="px-1">Yes</button>
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
        const [comment, setComment] = useState("");
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
          
            if((selectedOption === 'other') && (errors11 === "" || comment === "")){
                setErrors11("*required*");
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
          {/*<div className="modal-backdrop">
          <div className="modal bg-gray-500">*/}
          {show && (       
          <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="relative w-[95%] md:w-[45%] lg:w-[35%] max-h-[60%] bg-stone-300 overflow-y-auto p-4 pt-2 rounded-lg shadow-lg" 
                >
          <button className="close-button" style={{ backgroundColor: "rgba(214, 131, 108)" }}
                onClick={handleClose}>Close</button>   
          <p className="text-sm mt-2 mb-0.5">why are you reporting this post?</p>
          <div className="flex flex-col gap-1">
            <select
            id="dropdown"
            value={selectedOption}
            onChange={handleChange}
            className="border border-amber-500 text-sm w-fit"
            style={{ marginLeft: "1px", padding: "1px" }}
          >
            <option className="text-sm"value="" disabled>
              -- select reason --
              {/*<p className="text-sm">-- select reason --</p>*/}
            </option>
            <option className="text-xs" value="wrong">post is irrelevant to {capitalizeFirstLetter(post.title)}</option>
            <option className="text-xs" value="offensive">contains in-appropriate language</option>
            <option className="text-xs" value="other">Other</option>
          </select>
            {isWhyReportlVisible && 
              <>
              <p className= 'error-msg text-sm'>please specify reason {errors11}</p>
              <input 
              type="text" className="border border-amber-500 w-fit" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)}
              />
              </>
            }
            {(selectedOption && (
            <button onClick={handleSendReport} className="mt-1 border border-black w-fit">Send Report</button>
            )
            )}
            {/*{errors11 && <span className= 'error-msg'> {errors11} </span>}*/}
          </div>
          </div>
          </div>
          )}
          </>
        )
      }


      const [showUserProfileModal, setShowUserProfileModal] = useState(false);
            
      const handleOpenUserProfileModal = () => {
        setShowUserProfileModal(true);
      };
                            
      const handleCloseUserProfileModal = () => {
        setShowUserProfileModal(false);
      };
                      
      const UserProfile_Modal = ({ handleClose}) => {
                  
        console.log('lol');
                  
        return(
          <>
            {showUserProfileModal && (
            <div className="modal-backdrop">
              <div className="modal">
                <button className="close-button" onClick={handleCloseUserProfileModal}>Close</button>
                <p>Username: {post.user.username} </p>
                <p>Joined: {dateFormatter.format(new Date(post.user.createdAt))}</p>
                <p>Tribe: {post.user.tribe} </p>
                <p>Clan/Surname: {post.user.clan}</p>
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
       const [userTribe, setUserTribe] = useState('');
       const [userClan, setUserClan] = useState('');

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
      const [selectedPageIndex, setSelectedPageIndex] = useState();
      const [line_nd_index, setLine_nd_index] = useState();
      const [showDefinitions_Modal, setShowDefinitions_Modal] = useState(false);

      const handle_ShowDefinitions_Modal = async (selectedLine) => {

        console.log(selectedLine);
        setSelectedLineIndex(selectedLine.index);

        //if (!(selectedLine.pageIndex)) {
          setSelectedPageIndex(selectedLine.pageIndex)
        //}
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

        async function onDefinitioncreate(e) {
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
              setErrorsNote({ ...valuesNote, ['message']: "" });
              try{
                return createDefinitionFn({ postId: post.id, message: valuesNote.message, index: selectedLineIndex, page: selectedPageIndex, rating: 0 })
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

        const handleOnFocus = (e) => {
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
                onFocus={(e) => handleOnFocus(e)}
                onBlur={(e) => {if (!e.target.value) e.target.nextSibling.style.display = "block";}}
                name="message"
                value={valuesNote.message}
                onChange={e => setValuesNote({ ...valuesNote, [e.target.name]: e.target.value })}
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
              <button className="bg-amber-300/60 border-[1.3px] border-solid border-yellow-400/80 text-sm" type="submit" disabled={loading}>
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
                            createLocalReview(response);
                            updateLocalDefinition({id: definitionId, rating: (currentDefRating + valuesReview.rating)/(currentNumOfDefReviews + 1)})  
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
      
              return(
                <>
                {show && (
                <div className="modal-backdrop ">
                <div className=" bg-stone-300 w-[90%] md:w-[40%] lg:w-[30%] max-h-[50%] overflow-y-auto p-2 pr-4 pl-4 rounded-lg shadow-md">
                 
                  <button onClick={handleCloseReviewDefModal} className="mb-2 p-1 "
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
                  <div className="flex w-[75%] mt-1 mb-1.5">
                  {/*{(isUserSignedIn.isUserSignedIn===null || isUserSignedIn.isUserSignedIn===false || 
                      isUserSignedIn.isUserSignedIn===undefined) && (
                    <div className="flex gap-2 w-fit">
                          <div className="flex-col">
                          <input className="w-full text-sm border-[1.3px] rounded border-amber-400/80" name="yourName" placeholder=" name"  //value={values.clanName || ""}  
                            onChange={(e) => setValuesReview({ ...valuesReview, [e.target.name]: e.target.value })}
                            //onFocus={handleFocus_ClanName}
                            value={valuesReview.yourName}
                          />
                          {<p className="text-red-500 text-xs ">{errorsReview.errorName}</p>}
                          </div>
                          <div className="flex-col w-fit">
                          <input className="w-full text-sm border-[1.3px] rounded border-amber-400/80" name="yourEmail" placeholder=" email"  //value={values.clanName || ""}  
                            onChange={(e) => setValuesReview({ ...valuesReview, [e.target.name]: e.target.value })}
                            //onFocus={handleFocus_ClanName}
                            value={valuesReview.yourEmail}
                          />
                          {<p className="error-msg text-xs">{errorsReview.errorEmail}</p>}
                          </div>
                    </div>
                  )}*/}
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
          <div className="modal-backdrop">
          <div className="bg-amber-50 w-[90%] md:w-[40%] lg:w-[30%] max-h-[50%] overflow-y-auto p-4 pr-4 pl-4 rounded-lg shadow-md">
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

    function capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));

    
    const handleToggle = (enabled) => {
      console.log("Notifications enabled:", enabled);
    };

    const [showHint, setShowHint] = useState(false);   // controls DOM presence
    const [visible, setVisible] = useState(false);     // controls opacity

    const handleScrollClick = () => {
      // Run your existing FaScroll click logic
      //handleClickOnFaScroll();

      // Show the hint modal
      setShowHint(true);
      setVisible(true);

      // Start fade immediately
      setTimeout(() => setVisible(false), 0);

      // Remove from DOM after fade completes
      setTimeout(() => setShowHint(false), 5000);
    };

    

    //const pagesArray = post.bodyEnglish.split(/(?=^.*?page\s+\d+.*\n\s*draft of .*? by .*? PATRICKS, Museum, )/m)
    //console.log(pagesArray)

    const [historyTextlanguage, setHistoryTextLanguage] = useState(post.bodyEnglish)

    
    const handleChangeLanguage = (event) => {  

      if (event.target.value === "Swati") {
        setHistoryTextLanguage(post.bodySiswati)
      }
      if (event.target.value === "English") {
        setHistoryTextLanguage(post.bodyEnglish)
      }

    }
    
  return (
    <>
    {/*<div className="flex flex-col justify-center items-center">*/}
    <div className="text-left max-w-2xl mx-auto">
      {/*<div className="flex flex-col justify-center items-center">*/}
      <ToastContainer/>
      <Definitions_Modal show={showDefinitions_Modal} handleClose={handleCloseDefinitions_Modal}  line_nd_index={line_nd_index} ></Definitions_Modal>
      <ReviewDef_Modal show={showReviewDefModal} handleClose={handleCloseReviewDefModal}></ReviewDef_Modal> 
      <DefComments_Modal show={showDefCommentsModal} handleClose={handleCloseDefCommentsModal}></DefComments_Modal>
      <LogInModal show={showLogInModal} handleClose={handleCloseLogInModal} isSignUpCompVisible={isSignUpCompVisible} setIsSignUpCompVisible={setIsSignUpCompVisible} isSignInCompVisible={isSignInCompVisible} setIsSignInCompVisible={setIsSignInCompVisible} setShowLogInModal={setShowLogInModal}></LogInModal>
      <ReportModal show={showReportModal} handleClose={handleCloseReportModal}> </ReportModal>
      <DeletePost_Modal show={show_DeletePost_Modal} handleClose={handleCloseDelete_Modal}> </DeletePost_Modal>
      <UserProfile_Modal></UserProfile_Modal>
      <div className="">
        
              <>
              <div>
                <h1 className="mt-8 text-sm text-gray-600 font-medium ml-1">Clan praise</h1>
                <div className="flex justify-end gap-1 mr-0.5">
                  <FaShareAlt size={18} className="text-gray-500/30 mt-1"/>
                  <FacebookShareButton text={post.body} url={`https://clanpraises.com/${post.tribe.trim()}/${post.title.trim()}/${post.id}`}></FacebookShareButton>
                  <WhatsAppShareButton text={post.body} url={`https://clanpraises.com/${post.tribe.trim()}/${post.title.trim()}/${post.id}`}></WhatsAppShareButton>
                  <TwitterShareButton text={post.body} url={`https://clanpraises.com/${post.tribe.trim()}/${post.title.trim()}/${post.id}`}></TwitterShareButton>
                  {/*<ShareButton text={post.title} url={`https://192.168.1.172:3000/tinanatelo/${post.title.trim()}/${post.id}`}> </ShareButton>*/}
                </div>
                <div className="flex flex-col gap-2 bg-white/10 pt-3 pb-3 rounded-sm"> 
                  <div>
                    <span className="username">
                      { post.location !== null && post.location !== "" && 
                      <IconBtn
                            Icon={props => <FaMapMarkerAlt {...props}  className="text-stone-500/60 text-[10px] sm:text-[14px]"/>}
                            style={{ marginLeft: 6 }}
                          >
                            <p className="text-stone-500/60 text-[9px] normal-case"><strong>{post.location}</strong></p>
                      </IconBtn>
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-center">  
                      <h1 className='text-stone-600 text-2xl font-bold lg:text-[30px]'>{capitalizeFirstLetter(post.title)}</h1>
                  </div>
                </div>
              <div className="flex items-center justify-center bg-white/10 "> 
                  {/*<h1 className='text-stone-600 text-2xl font-bold lg:text-[30px]'>{capitalizeFirstLetter(post.title)}</h1>*/}
                  <div className="flex gap-20">
                          <IconBtn
                            Icon={props => <FaEye {...props}  className="text-gray-500/60 text-[14px] sm:text-[14px]"/>}
                            style={{ marginLeft: 6 }}
                          >
                            <p className="text-gray-500/60 text-[10px]">{post._count.views}</p>
                        </IconBtn>
                         <div className="flex gap-20 relative">
                          <IconBtn
                            Icon={(props) => (
                              <FaScroll
                                {...props}
                                size={15}
                                className="text-bg-amber-700 cursor-pointer"
                              />
                            )}
                            onClick={handleScrollClick}
                            style={{ marginLeft: 6, color: "rgba(180, 83, 9, 0.5)" }}
                          >
                            <p className="text-gray-500 underline text-[9.5px]">
                              {rootDefinitions.length} notes
                            </p>
                          </IconBtn>

                          {/* Thin horizontal hint modal */}
                          {showHint && (
                            <div
                              className={`
                                absolute left-12 top-18
                                bg-amber-100 text-amber-800 text-[10px]
                                px-3 py-0.5 rounded-sm shadow-sm
                                transition-opacity duration-[5000ms] ease-in-out
                                ${visible ? "opacity-100" : "opacity-0"}
                              `}
                            >
                             click on any line to view or add notes
                            </div>
                          )}
                        </div>
                          {/*<IconBtn
                                    Icon={props => <FaScroll {...props} size={15} className="text-bg-amber-700 cursor-pointer"/>} //className="text-gray-600"
                                    onClick={handleClickOnFaScroll}
                                    style={{ marginLeft: 6, color: "rgba(180, 83, 9, 0.5)" }}
                                >
                                  <p className="text-gray-500 loweercase underline text-[10px]">{rootDefinitions.length} notes</p>
                          </IconBtn>*/}
                          {/*< NotificationToggle initialOn={true} clanName={post.title} onChange={handleToggle} />*/}
                  </div>
                </div>
              <div className="flex items-center justify-center bg-white/10 h-fit"> {/*boader border-red-500 */}
                <FormattedPoem text={post.body} onLineClick={handle_ShowDefinitions_Modal} definitions={rootDefinitions} />
              </div>
                <div className="flex justify-between bg-white/10">
                <span>
                  <p className="text-[8px] ml-1 pt-2 italic">
                    {(post.user.username === "mave" || post.user.username === "nmd") && (
                      <>Tibongo Netinanatelo TemaSwati - R. Mdvumowencwala Patrick</>
                    )}
                    {(!(post.user.username === "mave") && !(post.user.username === "nmd")) && (
                      <div className="flex justify-center items-align items-center gap-1">
                      <p>Source: </p>
                      <IconBtn 
                         Icon={props => <FaUser {...props} //size={12} 
                         className="text-[8px] sm:text-xs text-amber-900"/>} 
                         style={{ marginBottom: 0}}
                         >
                         <p className="text-amber-900 text-[8px] sm:text-xs lowercase"><strong>{post.user.username}</strong></p>
                      </IconBtn>
                      </div>
              
                    )}
                  </p>
                </span>
                <span>
                  {!((post.user.id === currentUser.id) || ((guestEmail) && guestEmail.guestEmail === post.user.email)) && (
                  <>
                  {/*<IconBtn
                      Icon={props => <FaFlag {...props} size={15} className="text-white/50"/>}
                      onClick={handleOpenReportModal}
                    >
                      <p className="text-red-700 text-[10px]"></p>
                    </IconBtn>*/}
                    </>
                      )}
                      {(guestEmail) && (
                        (post.user.id === currentUser.id || guestEmail.guestEmail === post.user.email) && (
                          <>
                            <IconBtn
                              onClick={handleOpenDelete_Modal}
                              Icon={props => <FaTrash {...props} size={20} className="text-stone-400" />}
                              aria-label="Delete"
                            //color="danger"
                            style={{ marginLeft: 12 }}
                          />
                          </>
                      )
                    )}
          </span>
              </div>
              </div>
              <div className=" flex flex-col items-center h-2 bg-white/10 border-b border-[#9a9393] rounded-lg shadow-md ">           
            </div>
              {/*<h1 className="mt-8 text-sm text-gray-600 mb-4 font-medium ml-1">Related Posts</h1>*/}
              </>
             
             
      {( (post.bodyEnglish !== "" && post.bodyEnglish !== null ) && (
        <>
            <div>
              <div className="flex justify-between">
              <h1 className="mt-8 text-sm text-gray-600 mb-4 font-medium ml-1">Clan history, customs, information</h1>
              <div className="flex justify-center gap-1 mr-0.5 mb-0.5">
                <p className="text-sm italic mt-14 text-gray-500 font-thin">language:</p>
                <select
                  id="dropdown"
                  //value={selectedOption}
                  onChange={handleChangeLanguage}
                  className="border border-amber-500 text-xs mt-14 w-fit h-fit py-0.5 px-1"
                //style={{ marginLeft: "1px", padding: "1px" }}
                >
                  <option className="text-xs"value="English">English</option>
                  <option className="text-xs" value="Swati">Swati</option>
                </select>
              </div>
              </div>
              {historyTextlanguage.split(/\s*################################\s*/)   //split(/(?=^.*?page\s+\d+.*\n\s*draft of .*? by .*? PATRICKS, Museum, )/m)     Mdvumowencwala PATRICKS, Museum, Lobamba
                        .map((page, index) => (
                <div key={index}>
                  <div className="whitespace-pre-wrap font-mono text-sm text-left max-w-2xl mx-auto bg-white/10 p-1 mb-8">
                    <FormattedParagraphsUnclickable text={page} pageIndex={index} PostFullText={historyTextlanguage}/>
                  </div>
                </div>
              ))}
            </div>
            </>
              )
            )}
      </div>  
      
           
      {(post.relatedPosts.filter(obj => obj['id'] !== post.id).length > 0  &&
        <p className="mt-10 text-sm text-gray-600 mb-1 font-medium ">Related clans</p>
      )}
      </div>
        <div className="flex overflow-auto max-w-3xl mx-auto">
          {(post.relatedPosts.filter(obj => obj['id'] !== post.id).length > 0  &&
          <>
            {post.relatedPosts.filter(obj => obj['id'] !== post.id).map((post, index) => (
              <div key={index} className="flex">
              <Link key={index} href={`/${post.tribe}/${post.title}/${post.id}`}>
                <Card
                  title={capitalizeFirstLetter(post.title)}
                      tribe={post.tribe}
                      location={post.location}
                      tribeSingular={post.tribe_.praises_Singular}
                      username={post.user.username}
                      rating={sumAndAverage(post.reviews, "rating")}
                      views={post._count.views}
                      definitions={post._count.definitions}
                      reviews={post.reviews.length}
                      comments={post.comments.length}
                      description={post.body}
                      createdAt={post.createdAt}
                      linkUrl={`/${post.tribe}/${post.title}/${post.id}`}
                />
              </Link>
            </div>
          ))
          }  
        </>   
        )}
        </div>
    {/*</div>*/}
    </>
  )
}
