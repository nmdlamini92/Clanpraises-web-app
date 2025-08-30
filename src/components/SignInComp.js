import React from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Validations from "./Validations";

export default function SignInComp ({onDataChange}) {

  const [values2, setvalues2] = useState({email:"",password:""});
  const [errors2, setErrors2] = useState({email:"",password:""});

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
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/signin`, {...values2},{withCredentials: true});
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
      onDataChange("SwitchToSignUp");
    }

    return (
      <div className="bg-gray-200 p-3 border border-amber-950">
        <p>Sign In to continue</p>
        <form onSubmit={(e) => handleSubmit(e, values2)}>
        <div className="boarder border-black">
            <input className="border rounded border-amber-500 mt-1" type='email' name='email' placeholder='Email' onChange={(e)=> 
              setvalues2({ ...values2, [e.target.name]: e.target.value })} />
              {errors2.email && <span className= 'error-msg text-xs'> {errors2.email} </span>}
          </div>
          <div>
            <input className="border rounded border-amber-500 mt-1" type='password' name='password' placeholder='Password' onChange={(e)=>  //updates values on related hook as changes are made
              setvalues2({ ...values2, [e.target.name]: e.target.value })} />
              {errors2.password && <span className= 'error-msg text-xs'> {errors2.password} </span>}
          </div>
          <button className={`mt-1 p-1 px-2  border-black ${isLoading ? "bg-amber-200" : " bg-amber-400"}`} 
                  type='submit'>{isLoading ? "Loading..." : "Sign In"}</button>
        </form>
        <div className="flex flex-row">
                Have no account? <Link onClick={switchToSignUp} href={''} className="flex flex-row"><p className="text-blue-500 ml-1 underline">Sign Up</p></Link>
          </div>
      </div>
    );
  };