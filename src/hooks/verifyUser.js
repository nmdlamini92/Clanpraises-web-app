import { makeRequest } from "../services/makeRequest"

export async function getDecodeToken() {
  return await makeRequest("/getUserId")

}