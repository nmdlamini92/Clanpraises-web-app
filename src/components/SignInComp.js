import React from "react";
//import { Link } from "react-router-dom";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Validations from "./Validations";

export default function SignInComp ({onDataChange}) {

  const [values2, setvalues2] = useState({email:"",password:""});
  const [errors2, setErrors2] = useState({email:"",password:""});

  const handleSubmit = async (e) => {                 
    e.preventDefault();

  const validationError = Validations.signInValidations(values2);

  if (validationError){
    setErrors2(validationError);
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
          console.log(errors2);           
        }
        if (data.status) {
          console.log(data.status);
          localStorage.setItem('isUserSignedIn', JSON.stringify({isUserSignedIn: true}));
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
      <div style={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
        <p>Sign In to continue</p>
        <form onSubmit={(e) => handleSubmit(e, values2)}>
        <div className="boarder border-black">
            <input type='email' name='email' placeholder='Email' onChange={(e)=> 
              setvalues2({ ...values2, [e.target.name]: e.target.value })} />
              {errors2.email && <span className= 'error-msg'> {errors2.email} </span>}
          </div>
          <div>
            <input type='password' name='password' placeholder='Password' onChange={(e)=>  //updates values on related hook as changes are made
              setvalues2({ ...values2, [e.target.name]: e.target.value })} />
              {errors2.password && <span className= 'error-msg'> {errors2.password} </span>}
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <div className="flex flex-row">
                Have no account? <Link onClick={switchToSignUp} href={''} className="flex flex-row"><p className="text-blue-500 ml-1">Sign Up</p></Link>
          </div>
      </div>
    );
  };