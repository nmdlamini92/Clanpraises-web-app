import { IconBtn } from "./IconBtn"
import { FaEdit, FaHeart, FaRegHeart, FaUser, FaFlag, FaTrash, FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa"
import { usePost } from "../contexts/PostContext"
import { ReviewList } from "./ReviewList"
import { useState, useEffect } from "react"
import { useAsyncFn, useAsync } from "../hooks/useAsync"
import { createReview, deleteReview, toggleReviewLike, toggleReviewDisLike, updateReview } from "../services/Reviews"
import { ReviewForm } from "./ReviewForm"
import { useUser } from "../hooks/useUser"
import { useCookies } from "react-cookie"
//import { getVipUserId } from "../services/Reviews"
import StarRating from "./FiveStarRating"


const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  //timeStyle: "short",
})

export function Review({id, message, user, createdAt, _count, likeCount, likedByMe, disLikeCount, disLikedByMe, rating, popLoginModal, popReportModal, popDeleteModal}) {
  
  const [areChildrenHidden, setAreChildrenHidden] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const {post, getReplies, createLocalReview, updateLocalReview, deleteLocalReview, toggleLocalReviewLike, toggleLocalReviewDisLike} = usePost()
  const createReviewFn = useAsyncFn(createReview)
  const updateReviewFn = useAsyncFn(updateReview)
  const deleteReviewFn = useAsyncFn(deleteReview)
  const toggleReviewLikeFn = useAsyncFn(toggleReviewLike)
  const toggleReviewDisLikeFn = useAsyncFn(toggleReviewDisLike)
  const childReviews = getReplies(id)
  const [cookies] = useCookies([]);
  const [error1, setError1] = useState("");
  //const [DislikedByMe, setDisLikedByMe] = useState(false);

  const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
  const VipUserID = JSON.parse(localStorage.getItem('VipUserId'));
  //console.log(VipUserID)
  const currentUser = {id: VipUserID.VipUserId}
  console.log(currentUser)
  
  function onReviewReply(message) {
    return createReviewFn
      .execute({ postId: post.id, message, parentId: id })
      .then(review => {
        setIsReplying(false)
        createLocalReview(review)
      })
  }

  function onReviewUpdate(message, rating) {
    return updateReviewFn
      .execute({ postId: post.id, message, id })
      .then(review => {
        setIsEditing(false)
        updateLocalReview(id, review.message)
      })
    }

  function onReviewDelete() {
    popDeleteModal({postId: post.id, id: id, postType: 'review'})
  }

  function onToggleReviewLike() {
    if (isUserSignedIn.isUserSignedIn===false){
      popLoginModal()
    }
    else{
    return toggleReviewLikeFn
      .execute({ id, postId: post.id })
      .then(({ addLike }) => toggleLocalReviewLike(id, addLike))
    }
  }

  function onToggleReviewDisLike() {
    if (isUserSignedIn.isUserSignedIn===false){
      popLoginModal()
    }
    else{
    return toggleReviewDisLikeFn
      .execute({id, postId: post.id })
      .then(({ addDisLike }) => toggleLocalReviewDisLike(id, addDisLike))
    }
  }

  const handlePopReportModal = () => {
    popReportModal({postId: null, definitionId: null, commentId: null, reviewId: id})
  }

  return (
    <>
      <div className="comment bg-yellow-50/50">
        <div className="header">
          <span className="name" > 
            <IconBtn 
              Icon={props => <FaUser {...props} size={12} className="text-amber-900"/>} 
              style={{ marginBottom: 0 }}
              >
              <p className="text-amber-900 lowercase text-[11px]">
                <strong>
                  {user.username.toLowerCase()}
                </strong></p>
            </IconBtn> 
          </span>
          <span className="date text-gray-400 text-[10px]">
            <strong>{dateFormatter.format(Date.parse(createdAt))}</strong>
          </span>
          <span>
            <StarRating rating={rating} />  
          </span>
        </div>
        {isEditing ? (
          <ReviewForm
            autoFocus
            initialValue={message}
            onSubmit={onReviewUpdate}
            loading={updateReviewFn.loading}
            error={updateReviewFn.error}
            error1={error1}
          />
        ) : (
          <div className="message text-sm">{message}</div>
        )}
        <div className="footer">
          <span>
            <div className="flex flex-row ml-12 gap-10">
          <IconBtn
            onClick={onToggleReviewLike}  //ml-[100%]
            disabled={toggleReviewLikeFn.loading}
            Icon={likedByMe ? FaThumbsUp : FaRegThumbsUp} 
            aria-label={likedByMe ? "Unlike" : "Like"}
            style={{ color: "#78350f" }}
          >
            {_count.likes}
          </IconBtn>
          <IconBtn
            onClick={onToggleReviewDisLike}
            disabled={toggleReviewDisLikeFn.loading}
            Icon={disLikedByMe ? FaThumbsDown : FaRegThumbsDown}
            aria-label={disLikedByMe ? "UnDisLike" : "DisLike"}
            style={{ marginLeft: 12, color: "#78350f" }}
          >
             {_count.disLikes}
          </IconBtn>
          </div>
          </span>
          <span>
          {user.id === currentUser.id && (
            <>
              {/*<IconBtn
                onClick={() => setIsEditing(prev => !prev)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
              />*/}
              <IconBtn
                disabled={deleteReviewFn.loading}
                onClick={onReviewDelete}
                Icon={props => <FaTrash {...props} className="text-stone-400"/>}
                aria-label="Delete"
              />
            </>
          )}
          {user.id !== currentUser.id && (
            <>
             <IconBtn
                      Icon={props => <FaFlag {...props} className="text-yellow-700"/>}
                      onClick={handlePopReportModal}
                    >
                      <p className="text-red-400 text-[10px]"></p>
            </IconBtn>
           </>
          )}
          </span>
        </div>
        {deleteReviewFn.error && (
          <div className="error-msg mt-1">{deleteReviewFn.error}</div>
        )}
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <ReviewForm
            autoFocus
            onSubmit={onReviewReply}
            loading={createReviewFn.loading}
            error={createReviewFn.error}
          />
        </div>
      )}
      {childReviews?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              className="collapse-line"
              aria-label="Hide Replies"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <ReviewList reviews={childReviews} />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
      )}
    </>
  )
}
