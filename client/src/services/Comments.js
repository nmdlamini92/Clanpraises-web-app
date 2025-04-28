import { makeRequest } from "./makeRequest"

export function getVipUserId({ cookies}) {
  return makeRequest(`getUserId`, {
    method: "POST",
    data: { cookies },
  })
}

export function createComment({ postId, message, parentId, definitionId, index }) {
  return makeRequest(`posts/${postId}/comments`, {
    method: "POST",
    data: { message, parentId, definitionId, index },
  })
}

export function createCommentOnDef({ postId, message, parentId, definitionId, index }) {
  return makeRequest(`posts/${postId}/comments`, {
    method: "POST",
    data: {postId, message, parentId, definitionId, index}
  })
}

export function updateComment({ postId, message, id }) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: "PUT",
    data: { message },
  })
}

export function deleteComment({ postId, id }) {
  return makeRequest(`posts/${postId}/comments/${id}`, {
    method: "DELETE",
  })
}

export function toggleCommentLike({ id, postId }) {
  return makeRequest(`/posts/${postId}/comments/${id}/toggleLike`, {
    method: "POST",
  })
}

export function toggleCommentDisLike({ id, postId }) {
  return makeRequest(`/posts/${postId}/comments/${id}/toggleDisLike`, {
    method: "POST",
  })
}

export function toggleLike_onClanPraise({ id, postId }) {
  return makeRequest(`/posts/${postId}/toggleLike`, {
    method: "POST",
  })
}