import { IconBtn } from "./IconBtn"
import { FaEdit, FaUser, FaReply, FaFlag, FaTrash, FaThumbsDown, FaRegThumbsDown, FaThumbsUp, FaRegThumbsUp, } from "react-icons/fa"
import { usePost } from "../contexts/PostContext"
import { CommentList } from "./CommentList"
import { useState, useEffect } from "react"
import { useAsyncFn, useAsync } from "../hooks/useAsync"
import { createComment, deleteComment, toggleCommentLike, toggleCommentDisLike,updateComment } from "../services/Comments"
import { CommentForm } from "./CommentForm"
//import { useUser } from "../hooks/useUser"

import { useCookies } from "react-cookie"
//import { getVipUserId } from "../services/comments"


const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  //timeStyle: "short",
})

export function Comment({id, message, user, createdAt, likeCount, likedByMe, disLikeCount, disLikedByMe, popLoginModal, popReportModal, popDeleteModal}) {

  const [areChildrenHidden, setAreChildrenHidden] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const {post, getReplies, createLocalComment, updateLocalComment, deleteLocalComment, toggleLocalCommentLike, toggleLocalCommentDisLike} = usePost()
  const createCommentFn = useAsyncFn(createComment)
  const updateCommentFn = useAsyncFn(updateComment)
  const deleteCommentFn = useAsyncFn(deleteComment)
  const toggleCommentLikeFn = useAsyncFn(toggleCommentLike)
  const toggleCommentDisLikeFn = useAsyncFn(toggleCommentDisLike)
  const childComments = getReplies(id)
  const [cookies] = useCookies([]);

  const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
  const VipUserID = JSON.parse(localStorage.getItem('VipUserId'));
  
  const currentUser = {id: VipUserID.VipUserId}
  console.log(currentUser)
  console.log(post.id)
  console.log(id)


  function onCommentReply(message) {
    return createCommentFn
      .execute({ postId: post.id, message, parentId: id })
      .then(comment => {
        setIsReplying(false)
        createLocalComment(comment)
      })
  }

  function onCommentUpdate(message) {
    return updateCommentFn
      .execute({ postId: post.id, message, id })
      .then(comment => {
        setIsEditing(false)
        updateLocalComment(id, comment.message)
      })
  }

  function onCommentDelete() {
    popDeleteModal({postId: post.id, id: id, postType: 'comment'})
  }

  function onToggleCommentLike() {
    if (isUserSignedIn.isUserSignedIn===false){
      popLoginModal()
    }
    else{
    return toggleCommentLikeFn
      .execute({ id, postId: post.id })
      .then(({ addLike }) => toggleLocalCommentLike(id, addLike))
    }
  }

  function onToggleCommentDisLike() {
    if (isUserSignedIn.isUserSignedIn===false){
      popLoginModal()
    }
    else{
    return toggleCommentDisLikeFn
      .execute({ id, postId: post.id })
      .then(({ addDisLike }) => toggleLocalCommentDisLike(id, addDisLike))
    }
  }

  const handlePopReportModal = () => {
    popReportModal({postId: null, definitionId: null, commentId: id, reviewId: null})
  }

  return (
    <>
      <div className="comment">
        <div className="header">
          <span>
            <IconBtn 
              Icon={props => <FaUser {...props} size={12} className="text-amber-900 bg-white/60"/>} 
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
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            initialValue={message}
            onSubmit={onCommentUpdate}
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
          />
        ) : (
          <div className="message">{message}</div>
        )}
        <div className="footer">
          <IconBtn
            onClick={onToggleCommentLike}
            disabled={toggleCommentLikeFn.loading}
            Icon={likedByMe ? FaThumbsUp : FaRegThumbsUp}
            aria-label={likedByMe ? "Unlike" : "Like"}
            style={{ color: "#78350f" }}
          >
            {likeCount}
          </IconBtn>
          <IconBtn
            onClick={onToggleCommentDisLike}
            disabled={toggleCommentDisLikeFn.loading}
            Icon={disLikedByMe ? FaThumbsDown : FaRegThumbsDown}
            aria-label={disLikedByMe ? "Unlike" : "Like"}
            style={{ color: "#78350f" }}
          >
            {disLikeCount}
          </IconBtn>
          <IconBtn
            onClick={() => setIsReplying(prev => !prev)}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
            style={{ color: "#78350f" }}
          />
          {user.id === currentUser.id && (
            <>
              <IconBtn
                onClick={() => setIsEditing(prev => !prev)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
              />
              <IconBtn
                disabled={deleteCommentFn.loading}
                onClick={onCommentDelete}
                Icon={props => <FaTrash {...props} className="text-stone-400"/>}
                aria-label="Delete"
                color="danger"
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
        </div>
        {deleteCommentFn.error && (
          <div className="error-msg mt-1">{deleteCommentFn.error}</div>
        )}
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            autoFocus
            onSubmit={onCommentReply}
            loading={createCommentFn.loading}
            error={createCommentFn.error}
            reviewee={user.username}
          />
        </div>
      )}
      {childComments?.length > 0 && (
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
              <CommentList comments={childComments} passOpenReport={handlePopReportModal} passOpenDelete={onCommentDelete}/>
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
