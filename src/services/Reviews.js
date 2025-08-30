import { makeRequest } from "./makeRequest"

export function getVipUserId({ cookies}) {
  return makeRequest(`getUserId`, {
    method: "POST",
    data: { cookies },
  })
}

export function createReview({ postId, message, parentId, definitionId, rating, index, yourEmail }) {
  return makeRequest(`posts/${postId}/reviews`, {
    method: "POST",
    data: { message, rating, index, parentId, definitionId, postId, yourEmail },
  })
}

export function createReviewDefinition({ postId, message, parentId, definitionId, rating, index, newDefRating, yourEmail }) {
  return makeRequest(`reviewDefinition`, {
    method: "POST",
    data: {postId, message, parentId, definitionId, rating, index, newDefRating, yourEmail}
  })
}


export function updateReview({ postId, message, id }) {
  return makeRequest(`posts/${postId}/reviews/${id}`, {
    method: "PUT",
    data: { message },
  })
}

export function deleteReview({ postId, id }) {
  return makeRequest(`posts/${postId}/reviews/${id}`, {
    method: "DELETE",
  })
}

export function toggleReviewLike({ id, postId }) {
  return makeRequest(`/posts/${postId}/reviews/${id}/toggleLike`, {
    method: "POST",
  })
}

export function toggleReviewDisLike({ id, postId }) {
  return makeRequest(`/posts/${postId}/reviews/${id}/toggleDisLike`, {
    method: "POST",
  })
}

