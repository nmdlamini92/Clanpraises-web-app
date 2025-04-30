import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";
import crypto from "crypto"
import axios from "axios";
import { getDecodeToken } from "./verifyUser";
import { makeRequest } from "../services/makeRequest";
import { useState } from "react";


export  function useUser() {

  const [cookies] = useCookies([]);

  const getUserId = async () => {

    if (cookies.jwt){
      try{
        const resp = await axios.post("http://localhost:3001/getUserId", {cookies}, {withCredentials: true});
        console.log(resp);
        if(resp.data.status){
          //setVipUserID(resp.data.decodedToken);
          return {id: resp.data.decodedToken};
        }
        else{
          return {id: null}
        }
      }
      catch(error){
        console.log(error);
      }
    }
    else{
      //setVipUserID(null)
      return {id: null}
    }
    //return { id: VipUserID};
  }
  //return { id: document.cookie.match(/userId=(?<id>[^;]+);?$/).groups.id }
  //return { id: document.cookie.match(/jwt=(?<id>[^;]+)/)?.groups?.id };
  //return { id: VipUserID};
  const VipUserID =  getUserId();

  return VipUserID;
}
