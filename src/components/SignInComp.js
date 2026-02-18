"use client"
import React from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Validations from "./Validations";
import SocialAuthButtons from "./SocialAuthButtons";
import { FaUser, FaCaretDown, FaRegEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SignInComp ({onDataChange}) {

  const router = useRouter();
  const [isHaveNoAccountVisible, setIsHaveNoAccountVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  
          

  useEffect(() => {

    setHydrated(true);
      
       if ((window.location.pathname === '/auth/signin')) {
        setIsHaveNoAccountVisible(false);

      } 
    }, []);

     

  const [values2, setvalues2] = useState({email:"",password:""});
  const [errors2, setErrors2] = useState({email:"",password:""});
  const [isSignInFormVisible, setIsSignInFormVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {                 
    e.preventDefault();
    setIsLoading(true);

  const validationError = Validations.signInValidations(values2);

  if (validationError){
    setErrors2(validationError);
    setIsLoading(false);
  }
  else{
    setErrors2({email:"",password:""});
    try{                                                                    
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {...values2},{withCredentials: true});
        console.log(data);
        console.log(data.errors);
        console.log(data.status);
    
        if (!(data.status)) {                            
          setErrors2(data.errors);
          setIsLoading(false);
          console.log(errors2);           
        }
        if (data.status) {
          console.log(data.status);
          localStorage.setItem('isUserSignedIn', JSON.stringify({isUserSignedIn: true}));
          localStorage.setItem('VipUserId', JSON.stringify(data.userID))
          localStorage.setItem('VipUserName', JSON.stringify(data.userName))
          onDataChange(['SignInSuccess', data.userName]);
        }
      }
     catch(errors){
     }
   }
  }

    const switchToSignUp = () => {
      /*if ((window.location.pathname === '/auth/signin')) {
          router.push("/auth/signup")
      }*/
      onDataChange("SwitchToSignUp");
    }

     const handleShowSignInForm = () => {
      setIsSignInFormVisible(true)
    }

    return (
      <div>
      <div className="bg-gray-200 p-3  border border-amber-950">
        <div className="flex justify-center items-center  gap-1.5">
          <FaUser className="text-black" size={10}/>
          <p className="text-sm text-bold font-medium">Sign In</p>
        </div>

        <SocialAuthButtons />

        <div className="flex items-center mt-3 mb-2">
          <hr className="flex-grow border-gray-400" />
          <span className="px-2 text-xs text-gray-600">OR</span>
          <hr className="flex-grow border-gray-400" />
        </div>

        <div className="flex justify-center items-center gap-0.5">
        
        {( !isSignInFormVisible && (
        <p className="flex justify-center cursor-pointer items-center text-sm
         text-gray-500 bg-slate-50 border border-amber-400 px-1 rounded-sm hover:stone-400 hover:bg-stone-300"
            onClick={handleShowSignInForm}>
          <FaRegEnvelope/> &nbsp;
          manually sign in
        </p>
        )
        )}
        </div>
        

        {(isSignInFormVisible && (
        <div className="">
        <form onSubmit={(e) => handleSubmit(e, values2)}>
        <div className="boarder border-black">
            <input className="border rounded border-amber-400 mt-1" type='email' name='email' placeholder='Email' onChange={(e)=> 
              setvalues2({ ...values2, [e.target.name]: e.target.value })} />
              {errors2.email && <span className= 'error-msg text-xs'> {errors2.email} </span>}
          </div>
          <div>
            <input className="border rounded border-amber-400 mt-1" type='password' name='password' placeholder='Password' onChange={(e)=>  //updates values on related hook as changes are made
              setvalues2({ ...values2, [e.target.name]: e.target.value })} />
              {errors2.password && <span className= 'error-msg text-xs'> {errors2.password} </span>}
          </div>
          <button className={`mt-1 p-1 px-2 border-solid border-[0.3px] border-amber-400 ${isLoading ? "bg-amber-200" : " bg-amber-300/90"}`} 
                  type='submit'>{isLoading ? "Loading..." : "Sign In"}</button>
        </form>
        </div>
        )
        )}
      </div>
      {(hydrated && (
        <>
        {(isHaveNoAccountVisible && (
        <div className="flex flex-row mt-0.5 text-sm">
              Have no account? <Link onClick={switchToSignUp} href={''} className="flex flex-row"><p className="text-blue-500 ml-1 underline">Sign Up</p></Link>
        </div>
        )
        )}
        </>
      )
      )}
      </div>
    );
  };