import { makeRequest } from "./makeRequest"

export function getVipUserId({ cookies}) {
  return makeRequest(`getUserId`, {
    method: "POST",
    data: { cookies },
  })
}

export function createDefinition({ postId, message, rating, index, yourName, yourEmail }) {
  return makeRequest(`posts/${postId}/definitions`, {
    method: "POST",
    data: { message, rating, index, yourName, yourEmail },
  })
}

export function updateDefinition({ postId, rating, id }) {
  return makeRequest(`posts/${postId}/definitions/${id}`, {
    method: "PUT",
    data: { rating },
  })
}

export function deleteDefinition({ postId, id, clan, tribe, definition, reviews, comments }) {
  return makeRequest(`posts/${postId}/definitions/${id}`, {
    method: "DELETE",
    data: { clan, tribe, definition, reviews, comments},
  })
}

export function toggleDefinitionLike({ id, postId }) {
  return makeRequest(`/posts/${postId}/definitions/${id}/toggleLike`, {
    method: "POST",
  })
}

export function toggleDefinitionDisLike({ id, postId }) {
  return makeRequest(`/posts/${postId}/definitions/${id}/toggleDisLike`, {
    method: "POST",
  })
}

export function toggleLike_onClanPraise({ id, postId }) {
  return makeRequest(`/posts/${postId}/toggleLike`, {
    method: "POST",
  })
}