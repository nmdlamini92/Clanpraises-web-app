import axios from "axios"

const api = axios.create({
  //baseURL: process.env.REACT_APP_SERVER_URL,
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
})

export function makeRequest(url, options) {
  try{
  return api(url, options)
    .then(res => res.data)
    .catch(error => {
      //if (error.response) {return Promise.reject(error?.response?.data?.message ?? "Error")}

      if (error.response) {
        // Handle specific server-side errors like badRequest
        const status = error.response.status;
        const message = error.response.data?.message;
        
        if (status === 400) {
          // Handle bad request error (400)
          console.log('Fuck Kyle');
          return Promise.reject(message ?? "Bad Request wemalebe");
        }

        // Handle other response errors (e.g., 401 Unauthorized, 500 Internal Server Error)
        return Promise.reject(message ?? `Server Error: ${status}`);
      }

      else {
        // Some other unknown error
        return Promise.reject(error.message ?? "Unexpected Error");
      }
    }
    ) 
  }
  catch(error){
    console.error("Caught the error", error);
  }
}
