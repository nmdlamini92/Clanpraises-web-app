import { IconBtn } from "./IconBtn"
import { FaUser, FaScroll, FaFlag, FaStar, FaRegStar,FaTrash, FaRegComment, FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa"
import { usePost } from "../contexts/PostContext"
//import { CommentList } from "./CommentList"
import { DefinitionList } from "./DefinitionList"
import { useState, useEffect } from "react"
import { useAsyncFn, useAsync } from "../hooks/useAsync"
//import { createComment, deleteComment, toggleCommentLike, updateComment } from "../services/comments"
import { createDefinition, deleteDefinition, toggleDefinitionLike, toggleDefinitionDisLike, updateDefinition } from "../services/Definitions"
//import { CommentForm } from "./CommentForm"
import { DefinitionForm } from "./DefinitionForm"
//import { useUser } from "../hooks/useUser"
import { useCookies } from "react-cookie"
//import { getVipUserId } from "../services/Reviews"
import StarRating from "./FiveStarRating"


const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  //timeStyle: "short",
})

export function Definition({id, message, user, reviews, createdAt, _count, likeCount, likedByMe, disLikeCount, disLikedByMe, rating, index, onDataChange, popDefCommentsModal,popLoginModal, popReportModal, popDeleteModal}) {
  
  const [areChildrenHidden, setAreChildrenHidden] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const {post, rootReviews = [], rootDefinitions = [], rootComments = [], getReplies, getRepliesDef, createLocalDefinition, updateLocalDefinition, deleteLocalDefinition, toggleLocalDefinitionLike, toggleLocalDefinitionDisLike} = usePost()
  const createDefinitionFn = useAsyncFn(createDefinition)
  const updateDefinitionFn = useAsyncFn(updateDefinition)
  const deleteDefinitionFn = useAsyncFn(deleteDefinition)
  const toggleDefinitionLikeFn = useAsyncFn(toggleDefinitionLike)
  const toggleDefinitionDisLikeFn = useAsyncFn(toggleDefinitionDisLike)
  const childComments = getRepliesDef(id)
  const [cookies] = useCookies([]);
  const [error1, setError1] = useState("");
  const [DislikedByMe, setDisLikedByMe] = useState(false);
  const [numbOfDefReviews, setNumbOfDefReviews] = useState(post.reviews.filter(review => review.definitionId === id).length)
  
  const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
  const VipUserID = JSON.parse(localStorage.getItem('VipUserId'));
  //console.log(VipUserID)
  const currentUser = {id: VipUserID.VipUserId}
  console.log(currentUser)
  console.log(rootDefinitions)
  
  function onDefinitionReply(message) {
    return createDefinitionFn
      .execute({ postId: post.id, message, parentId: id, index: index })
      .then(definition => {
        setIsReplying(false)
        createLocalDefinition(definition)
      })
  }

  function onDefinitionUpdate(rating, id) {
    return updateDefinitionFn
      .execute({ postId: post.id, rating, id })
      .then(definition => {
        setIsEditing(false)
        updateLocalDefinition(id, definition.rating)
      })
    }

  function onDefinitionDelete() {
    popDeleteModal({postId: post.id, id: id, postType: 'note'})
  }

  function onToggleDefinitionLike() {
    if (isUserSignedIn.isUserSignedIn===false){
      popLoginModal()
    }
    else{
    return toggleDefinitionLikeFn
      .execute({ id, postId: post.id })
      .then(({ addLike }) => toggleLocalDefinitionLike(id, addLike))
    }
  }

  function onToggleDefinitionDisLike() {
    if (isUserSignedIn.isUserSignedIn===false){
      popLoginModal()
    }
    else{
    return toggleDefinitionDisLikeFn
      .execute({ id, postId: post.id })
      .then(({ addDisLike }) => toggleLocalDefinitionDisLike(id, addDisLike))
    }
  }

  const handleReviewDef = () => {
    onDataChange({defId: id, defReviews: reviews, defRating: rating, numbOfDefReviews: _count.reviews});
  }

  const handlePopDefCommentsModal = () => {
    popDefCommentsModal({defId: id})
  }

  const handlePopReportModal = () => {
    popReportModal({postId: null, definitionId: id, commentId: null, reviewId: null})
  }

  function sumProperty(array, property) {
    return array.reduce((sum, obj) => sum + (obj[property] || 0), 0);
  }

  console.log((sumProperty(rootReviews.filter(review => review.definitionId === id), "rating"))/
  (rootReviews.filter(review => review.definitionId === id).length))

  return (
    <>
      <div className="comment min-w-[100%] bg-gray-100/60">
        <div className="header">
          {/*<span className="name">
            <IconBtn
                 Icon={props => <FaScroll {...props} size={13} className="text-bg-amber-700"/>} 
                 style={{ marginLeft: 4, color: "rgba(180, 83, 9, 0.5)" }}
                >
                <p className="text-gray-500 lowercase"></p>
            </IconBtn>
            </span>*/}
            <span>
              {/*<div className="flex justify-between items-center">*/}
                <IconBtn 
                  Icon={props => <FaUser {...props} size={9} className=""/>} 
                  style={{ marginBottom: 0, color: "#78350f" }}  //rgba(180, 83, 9, 0.8)   
                  >
                  <p className="text-amber-900 lowercase text-[11px]">
                  <strong>
                  {user.username.toLowerCase()}
                  </strong></p>
                </IconBtn>
            </span>
            <span>
                <p className="date text-gray-400 text-[10px] ">
                  <strong>{dateFormatter.format(Date.parse(createdAt))}</strong>
                </p>
            </span>
            {/*</div>*/}
          <span >
            <div className="flex justify-center align-middle items-center">
              {(rootReviews.filter(review => review.definitionId === id).length) === 0 ?(
                "") : (
              <p className="text-gray-600 text-[11px]">{((sumProperty(rootReviews.filter(review => review.definitionId === id), "rating"))/(rootReviews.filter(review => review.definitionId === id).length)).toFixed(1)}</p>
              ) 
              }
              <IconBtn
                 Icon={(rootReviews.filter(review => review.definitionId === id).length) === 0 ? 
                        props => <FaRegStar {...props} size={12} className="text-bg-amber-700"/>
                      : props => <FaStar {...props} size={12} className="text-bg-amber-700"/>} 
                 style={{ marginLeft: 0, color: "rgba(202, 138, 4, 0.5)" }} //rgba(180, 83, 9, 0.5)
                >
                <p className="text-gray-500 lowercase">{(rootReviews.filter(review => review.definitionId === id).length) === 0 ? 'unreviewd': ''} </p>
              </IconBtn>
            </div>
          </span>
        </div>
        {isEditing ? (
          <DefinitionForm
            autoFocus={autoFocus}
            initialValue={message}
            onSubmit={onDefinitionUpdate}
            loading={updateDefinitionFn.loading}
            error={updateDefinitionFn.error}
            error1={error1}
          />
        ) : (
          <div className="">
            <div className="message text-sm p-0.5">{message}</div>
          </div>
        )}
        <div className="footer">
          <span>
            <div className="flex flex-row gap-4 justify-between ml-2">
              <IconBtn
                onClick={onToggleDefinitionLike}
                disabled={toggleDefinitionLikeFn.loading}
                Icon={likedByMe ? FaThumbsUp : FaRegThumbsUp}
                aria-label={likedByMe ? "Unlike" : "Like"}
                style={{ color: "#78350f"}}      //#78350f
              >
                {likeCount}
              </IconBtn>
              <IconBtn
                onClick={onToggleDefinitionDisLike}
                disabled={toggleDefinitionDisLikeFn.loading}
                Icon={disLikedByMe ? FaThumbsDown : FaRegThumbsDown}
                aria-label={disLikedByMe ? "UnDisLike" : "DisLike"}
                style={{ color: "#78350f" }}
              >
                {disLikeCount}
              </IconBtn>
            </div>
            </span>
            <span>
              <div className="flex-col leading-none mr-4">
              <p className="underline text-[8px] text-gray-600 cursor-pointer leading-none"
                 onClick={handleReviewDef}>
              ({(rootReviews.filter(review => review.definitionId === id).length)} Reviews)
              </p>
              <button className="bg-yellow-400/70 text-white text-[9px] border-[1.3px] border-solid border-[rgba(202,138,4,0.5)] p-1 uppercase cursor-pointer rounded-md leading-none"
              //style={{ color: "rgba(202, 138, 4, 0.5)" }}
              onClick={handleReviewDef}>REVIEW</button>
              </div>
            </span>
              {/*<span>
                <div className=" flex items-center">
                <IconBtn
                  Icon={props => <FaRegComment {...props} size={12} className="text-gray-500"/>} //className="text-gray-600"
                  onClick={handlePopDefCommentsModal}
                  >
                  <p onClick={handlePopDefCommentsModal} className="text-black text-[10px] underline cursor-pointer">{rootComments.filter(comment => comment.definitionId === id).length}</p>
                </IconBtn>
                </div>
              </span>*/}
            <span>
              {user.id === currentUser.id && (
              <>
              <IconBtn
                disabled={deleteDefinitionFn.loading}
                onClick={onDefinitionDelete}
                 Icon={props => <FaTrash {...props} className="text-stone-400"/>}
                aria-label="Delete"
                color="danger"
              />
              </>
              )}
              {user.id !== currentUser.id && (
              <>
              <IconBtn
                Icon={props => <FaFlag {...props} className="text-stone-400"/>} //text-yellow-700
                onClick={handlePopReportModal}
                >
                <p className="text-orange-700 text-[10px]"></p>
              </IconBtn>
              </>
              )}
          </span>
        </div>
        {deleteDefinitionFn.error && (
          <div className="error-msg mt-1">{deleteDefinitionFn.error}</div>
        )}
        </div>
    </>
  )
}
