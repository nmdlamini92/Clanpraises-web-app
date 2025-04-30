import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Validations from "./Validations";
//import { Link } from "react-router-dom";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';


export default function SignUpComp({ onDataChange }) {
   
    const [isEnterVeriCodeCompVisible, setIsEnterVeriCodeCompVisible] = useState(false);
    const [isSignUpFormVisible, setIsSignUpFormVisble] = useState(true);
    const [signUpData, setSignUpData] = useState();
    const [sentVcode, setSentVcode] = useState();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    
    const EnterVerifCode = () => {

        const [errors11, setErrors11] = useState("");
        const [enteredVcode, setEnteredVcode] = useState();


        const handleSignUp = async (e) => {
          e.preventDefault();
          console.log(sentVcode);
          console.log(enteredVcode);
          //console.log(enteredVcode.codeEntered);
          console.log(parseInt(sentVcode)===parseInt(enteredVcode));


          if(enteredVcode===undefined){
            setErrors11("code is required");
          }
          else{
              if(!(parseInt(sentVcode)===parseInt(enteredVcode))){
                  setErrors11("wrong code entered, try again");
              }
              else{
                setErrors11("");
                try {
                  const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/signup`,
                      {...signUpData},{withCredentials: true}
                    );
                    console.log(response);
            
                  if (response.data.status) {
                    console.log(response);
                    localStorage.setItem('isUserSignedIn', JSON.stringify({isUserSignedIn: true}));
                    onDataChange(["SignUpSuccess", response.data.userName]);
                    setCookie("VipUserId", response.data.userID, {
                      expires: 7, // Number of days until expiration
                      secure: true, // Set to true if using HTTPS
                      sameSite: "strict", // Protect against CSRF
                    });
                  } 
                  if (!(response.data.status)) {
                    console.log(response.data);
                  }
                } 
                catch (error) {
                console.error("Error while adding clan praise:", error);
                }
              }
            }
        }

      return(                                               
        <div>
        <h2>Enter CODE Comp</h2>
        <p>Enter verification code sent to your email</p>
        <input type='text' name='codeEntered'
             placeholder='code' onChange={(e)=>              //{...enteredVcode,[e.target.name]:e.target.value})} 
              setEnteredVcode(e.target.value)} />
              <button onClick={(e)=>handleSignUp(e)}>Verify</button>
              
              {errors11 && <span className= 'error-msg'> {errors11} </span>}    
        </div>
      )
    }

    const SignUpForm = () => {

      const [values1, setvalues1] = useState({username:"", email:"",password:""});
      const [errors1, setErrors1] = useState({username:"", email:"",password:""});

      const handleSubmit = async (e) => {                 
        e.preventDefault();
        
        const validationError = Validations.signUpValidations(values1);

        if (validationError){
          setErrors1(validationError);
        }
        else{
          setErrors1({username:"", email:"",password:""});
          try{                                                                    
            const {data} = await axios.post("http://192.168.1.172:3001/sendVcode", {...values1},{withCredentials: true});
            console.log(data);
            console.log(data.errors);
            console.log(data.status);
            console.log("All Cookies:", cookies);
        
              if (!(data.status)) {                            
              setErrors1(data.errors);
              console.log(errors1);           
              }
              if (data.status) {
                console.log(data.status);
                console.log(data.userDet);
                setSignUpData(data.userDet);
                setSentVcode(data.code);
                console.log(signUpData); 
                setIsSignUpFormVisble(false);
                setIsEnterVeriCodeCompVisible(true);
              }
          }
          catch(errors){
          }
        }
      }

      const switchToSignIn = () => {
        onDataChange("SwitchToSignIn");
    }
      
      return(
        <div className="bg-gray-200">
        <form onSubmit={(e) => handleSubmit(e, values1)}>
          <div>
          <div>
            <input className="border rounded border-amber-950" type='text' name='username' placeholder='Username' value={values1.username || ""} 
              onChange={(e)=> setvalues1({ ...values1, [e.target.name]: e.target.value })} />
              {errors1.username && <span className= 'error-msg'> {errors1.username} </span>}
          </div>
            <input className="border rounded border-amber-950 mt-1" type='email' name='email' placeholder='Email' onChange={(e)=>  //updates values on related hook as changes are made
              setvalues1({ ...values1, [e.target.name]: e.target.value })} />
              {errors1.email && <span className= 'error-msg'> {errors1.email} </span>}
          </div>
          <div>
            <input className="border rounded border-amber-950 mt-1" type='password' name='password' placeholder='Password' onChange={(e)=>
              setvalues1({ ...values1, [e.target.name]: e.target.value })} />
              {errors1.password && <span className='error-msg'> {errors1.password} </span>}
          </div>
          <button type='submit'>Sign Up</button>
      </form>
            <div className="flex flex-row">
                Already have account? <p onClick={switchToSignIn} className="text-blue-500 cursor-pointer underline ml-1">Sign In</p>
                </div>
        </div>
      )
    }

    return (
      <>
      <div className="mt-5 border border-black p-2.5 bg-gray-200">
        <p>Sign Up to continue</p>
        {isEnterVeriCodeCompVisible && <EnterVerifCode/>}
        {isSignUpFormVisible && <SignUpForm/>}
      </div>
      </>
    );
  };