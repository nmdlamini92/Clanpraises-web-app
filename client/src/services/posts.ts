'use client'

import { makeRequest } from "./makeRequest"

export async function getPosts() {
  return await makeRequest("/posts")
}

export async function getTribes() {
  return await makeRequest("/tribes")
}

export async function getClanNames() {
  return await makeRequest("/clanNames")
}

export async function getUsers() {
  return await makeRequest("/users")
}

export function getPost(id: String) {
  return makeRequest(`/posts/${id}`)
}

export function toggleLike_onClanPraise(postId: String) {
  return makeRequest(`/posts/${postId}/toggleLike`, {
    method: "POST",
  })
}

export function viewpost(postId: String) {
  return makeRequest(`/posts/${postId}/viewpost`, {
    method: "POST",
  })
}

type reportPostProps = {
  message: string; postId: String; definitionId: String; commentId: String; reviewId: String;
}

export function reportPost({ message, postId, definitionId, commentId, reviewId }: reportPostProps) {
  return makeRequest(`/reports`, {
    method: "POST",
    data: { message, postId, definitionId, commentId, reviewId },
  })
}
