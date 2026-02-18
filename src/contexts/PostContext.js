"use client"
import React, { useContext, createContext, useEffect, useMemo, useState } from "react"
//import { useParams } from "react-router-dom"
import { useParams, useRouter } from "next/navigation"
import { useAsync } from "../hooks/useAsync"
import { getPost } from "../services/posts"
import { useCookies } from "react-cookie"


const Context = React.createContext()

export function usePost() {
  return useContext(Context)
}

export function PostProvider({ children }) {
  console.log(children);

  const router = useRouter();

  const [cookie, setCookie] = useCookies();

  //const ClanName_TribeName = JSON.parse(localStorage.getItem('selectedClanName&Tribe'));
  //const id = ClanName_TribeName.id;

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const ClanName_TribeName = JSON.parse(localStorage.getItem('selectedClanName&Tribe'));
        //localStorage.setItem('AllUsersInDB', JSON.stringify({ AllUsersInDB: fetchedUsers }));
      }
    }, []);

  //const {id} = useParams();
  const params = useParams();
  console.log("PARAMS:", params);
  const id = params.id
  console.log(id);

  const { loading, error, value: post, isPostLikedByMe} = useAsync(() => getPost(id), [id]);

  console.log(post);
  console.log(loading);
  console.log(isPostLikedByMe);

  if ((loading === false) && (post === undefined || post === null) ) {
    //window.location.href = `/${params.tribe}/${params.posts}`
    router.push(`/${params.tribe}/${params.posts}`)
  }
 
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  //const [likes, setLikes] = useState({likeCount: , likedByMe: Boolean})

  const commentsByParentId = useMemo(() => {
    const group = {}
    comments.forEach(comment => {
      group[comment.parentId] ||= []
      group[comment.parentId].push(comment)
    })
    return group
  }, [comments])

  const reviewsByParentId = useMemo(() => {
    const group = {}
    reviews.forEach(review => {
      group[review.parentId] ||= []
      group[review.parentId].push(review)
    })
    return group
  }, [reviews])

  const definitionsByParentId = useMemo(() => {
    const group1 = {}
    definitions.forEach(definition => {
      group1[definition.parentId] ||= []
      group1[definition.parentId].push(definition)
    })
    return group1
  }, [definitions])

  useEffect(() => {
    if (post?.comments == null) return
    setComments(post.comments)
  }, [post?.comments])

  useEffect(() => {
    if (post?.reviews == null) return
    setReviews(post.reviews)
  }, [post?.reviews])

  useEffect(() => {
    if (post?.definitions == null) return
    setDefinitions(post.definitions)
  }, [post?.definitions])


  function getReplies(parentId) {
    return commentsByParentId[parentId]
  }

  function getRepliesRev(parentId) {
    return reviewsByParentId[parentId]
  }

  function getRepliesDef(parentId) {
    return definitionsByParentId[parentId]
  }

  function createLocalComment(comment) {
    setComments(prevComments => {
      return [comment, ...prevComments]
    })
  }

  function createLocalReview(review) {
    setReviews(prevReviews => {
      return [review, ...prevReviews]
    })
  }

  function createLocalDefinition(definition) {
    setDefinitions(prevDefinitions => {
      return [definition, ...prevDefinitions]
    })
  }

  function updateLocalComment(id, message) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === id) {
          return { ...comment, message }
        } else {
          return comment
        }
      })
    })
  }


  function updateLocalReview(id, message) {
    setReviews(prevReviews => {
      return prevReviews.map(review => {
        if (review.id === id) {
          return { ...review, message }
        } else {
          return review
        }
      })
    })
  }

  function updateLocalDefinition(id, rating) {
    setDefinitions(prevDefinitions => {
      return prevDefinitions.map(definition=> {
        if (definition.id === id) {
          return { ...definition, rating }
        } else {
          return definition
        }
      })
    })
  }

  function deleteLocalComment(id) {
    setComments(prevComments => {
      return prevComments.filter(comment => comment.id !== id)
    })
  }

  function deleteLocalReview(id) {
    setReviews(prevReviews => {
      return prevReviews.filter(review => review.id !== id)
    })
  }

  function deleteLocalDefinition(id) {
    setDefinitions(prevDefinitions => {
      return prevDefinitions.filter(definition => definition.id !== id)
    })
  }
    
  function toggleLocalCommentLike(id, addLike) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (id === comment.id) {
          if (addLike) {
            return {
              ...comment,
              likeCount: comment.likeCount + 1,
              likedByMe: true,
            }
          } else {
            return {
              ...comment,
              likeCount: comment.likeCount - 1,
              likedByMe: false,
            }
          }
        } else {
          return comment
        }
      })
    })
  }

  function toggleLocalCommentDisLike(id, addDisLike) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (id === comment.id) {
          if (addDisLike) {
            return {
              ...comment,
              disLikeCount: comment.disLikeCount + 1,
              disLikedByMe: true,
            }
          } else {
            return {
              ...comment,
              disLikeCount: comment.disLikeCount - 1,
              disLikedByMe: false,
            }
          }
        } else {
          return comment
        }
      })
    })
  }

  function toggleLocalReviewLike(id, addLike) {
    setReviews(prevReviews => {
      return prevReviews.map(review => {
        if (id === review.id) {
          if (addLike) {
            return {
              ...review,
              _count: {likes: review._count.likes + 1, disLikes: review._count.disLikes},//review._count.likes + 1,
              likedByMe: true,
            }
          } else {
            return {
              ...review,
              _count: {likes: review._count.likes - 1, disLikes: review._count.disLikes},
              //likeCount: review._count.likes - 1,
              likedByMe: false,
            }
          }
        } else {
          return review
        }
      })
    })
  }

  function toggleLocalReviewDisLike(id, addDisLike) {
    setReviews(prevReviews => {
      return prevReviews.map(review => {
        if (id === review.id) {
          if (addDisLike) {
            return {
              ...review,
              //disLikeCount: review.disLikeCount + 1,
              _count: {likes: review._count.likes, disLikes: review._count.disLikes + 1},
              disLikedByMe: true,
            }
          } else {
            return {
              ...review,
              //disLikeCount: review.disLikeCount - 1,
              _count: {likes: review._count.likes, disLikes: review._count.disLikes - 1},
              disLikedByMe: false,
            }
          }
        } else {
          return review
        }
      })
    })
  }


  function toggleLocalDefinitionLike(id, addLike) {
    setDefinitions(prevDefinitions => {
      return prevDefinitions.map(definition => {
        if (id === definition.id) {
          if (addLike) {
            return {
              ...definition,
              likeCount: definition.likeCount + 1,
              likedByMe: true,
            }
          } else {
            return {
              ...definition,
              likeCount: definition.likeCount - 1,
              likedByMe: false,
            }
          }
        } else {
          return definition
        }
      })
    })
  }

  function toggleLocalDefinitionDisLike(id, addDisLike) {
    setDefinitions(prevDefinitions => {
      return prevDefinitions.map(definition => {
        if (id === definition.id) {
          if (addDisLike) {
            return {
              ...definition,
              disLikeCount: definition.disLikeCount + 1,
              disLikedByMe: true,
            }
          } else {
            return {
              ...definition,
              disLikeCount: definition.disLikeCount - 1,
              disLikedByMe: false,
            }
          }
        } else {
          return definition
        }
      })
    })
  }



return (
  <Context.Provider
    value={{
      post: { id, ...post, },
      rootComments: commentsByParentId[null],
      rootReviews: reviewsByParentId[null],
      rootDefinitions: definitionsByParentId[null],
      isPostLikedByMe,
      getReplies, getRepliesDef, getRepliesRev,
      createLocalComment, createLocalDefinition, createLocalReview,
      updateLocalComment, updateLocalDefinition, updateLocalReview,
      deleteLocalComment, deleteLocalDefinition, deleteLocalReview,
      toggleLocalCommentLike, toggleLocalDefinitionLike, toggleLocalReviewLike,
      toggleLocalCommentDisLike, toggleLocalDefinitionDisLike, toggleLocalReviewDisLike,
    }}
  >
    {loading ? (
    <>
      {/*<h1>Loading</h1>*/}
      <div className="flex justify-center mt-12">
      <div className="flex flex-col items-center gap-2 w-fit min-w-[200px] max-w-[500px]">
      <div className={`h-4 w-40 bg-stone-300/70 rounded`}  /> 
      <div className={`h-4 w-52 bg-stone-300/70 rounded`}  />
      <div className={`h-4 w-48 bg-stone-300/70 rounded`} />
      <div className={`h-4 w-60 bg-stone-300/70 rounded`} />
      <div className={`h-4 w-44 bg-stone-300/70 rounded`}  />
      <div className={`h-4 w-56 bg-stone-300/70 rounded`}  />
      <div className={`h-4 w-36 bg-stone-300/70 rounded`} />
      </div>
      </div>
    </>
    ) : error ? (
      <h1 className="error-msg">{error}</h1>
    ) : (
      children
    )}
  </Context.Provider>
)
}

