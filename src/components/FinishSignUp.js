import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Validations from "./Validations";

export default function FinishSignUp({userEmail_password}) {
    
      const [values2, setvalues2] = useState({username:"", tribe:"", clan:""});
      const [errors2, setErrors2] = useState({username:"", tribe:"", clan:""});

      const userName = JSON.parse(localStorage.getItem('VipUserName'));
    
      const handleSubmit = async (e) => {                 
        e.preventDefault();

      const userID = JSON.parse(localStorage.getItem('VipUserId'));
    
      const validationError = Validations.finishSignUpValidations(values2);

      if (validationError){
        setErrors2(validationError);
      }
      else{
        setErrors2({tribe:"",clan:""});
        try{                                                                    
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/sendVcode`, {...values2, userEmail_password},{withCredentials: true});
            console.log(data);
            console.log(data.errors);
            console.log(data.status);
        
            if (!(data.status)) {                            
              setErrors2(data.errors);
              console.log(errors2);           
            }
            if (data.status) {
              console.log(data.status);
              localStorage.setItem('isProfileComplete', JSON.stringify({isUserSignedIn: true}));
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
            <form onSubmit={(e) => handleSubmit(e, values2)}>
            <div>
            <input className="border rounded border-amber-950" type='text' name='username' placeholder='username' value={values2.username || ""} 
              onChange={(e)=> setvalues2({ ...values2, [e.target.name]: e.target.value })} />
              {errors2.username && <span className= 'error-msg text-xs'> {errors2.username} </span>}
          </div>
          <div>
            <input className="border rounded border-amber-950 mt-1" type='text' name='clan' placeholder='clan / surname' onChange={(e)=>  //updates values on related hook as changes are made
             setvalues2({ ...values2, [e.target.name]: e.target.value })} />
              {errors2.clan && <span className= 'error-msg text-xs'> {errors2.clan} </span>}
          </div>
            <div className="boarder border-black">
              <input className="border rounded border-amber-950 mt-1" type='text' name='tribe' placeholder='tribe' onChange={(e)=> 
                setvalues2({ ...values2, [e.target.name]: e.target.value })} />
                {errors2.tribe && <span className= 'error-msg text-xs'> {errors2.tribe} </span>}
            </div>
              <button className="mt-0.5 p-1 bg-amber-400 border-2 border-black" type='submit'>Next</button>
            </form>
            {/*<div className="flex flex-row">
                    Have no account? <Link onClick={switchToSignUp} href={'exa'} className="flex flex-row"><p className="text-blue-500 ml-1 underline">Sign Up</p></Link>
              </div>*/}
          </div>
        );
      };
