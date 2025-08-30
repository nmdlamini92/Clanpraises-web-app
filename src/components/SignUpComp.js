import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Validations from "./Validations";
//import { Link } from "react-router-dom";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import { getTribes, getClanNames } from "../services/posts";
import { useAsync} from "../hooks/useAsync";


export default function SignUpComp({ onDataChange }) {

   
    const [isEnterVeriCodeCompVisible, setIsEnterVeriCodeCompVisible] = useState(false);
    const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(true);
    const [isUserBioFormVisible, setIsUserBioFormVisible] = useState(false);
    const [userBioData, setUserBioData] = useState();
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
                    localStorage.setItem('VipUserId', JSON.stringify(response.data.userID))
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
          <div className="flex gap-1 ">
            <p className="text-lime-800 text-sm">Enter verification code sent to </p> <strong><p className="text-sm text-stone-500">{signUpData.email}</p></strong>
          </div>
        <input className="border rounded border-amber-500 mr-1" type='text' name='codeEntered'
             placeholder='code' onChange={(e)=>              //{...enteredVcode,[e.target.name]:e.target.value})} 
              setEnteredVcode(e.target.value)} />
              <button className="p-1 px-2 border-black bg-amber-400"
                onClick={(e)=>handleSignUp(e)}>
                Verify
              </button>
              {errors11 && <span className= 'error-msg text-xs'> {errors11} </span>}    
        </div>
      )
    }


    const SignUpForm = () => {

      const clanNameRef = useRef(null);
      const tribeRef = useRef(null);

      const { loading, error, value: TribesList } = useAsync(getTribes)
      const { loading1, error1, value: ClanNamesList } = useAsync(getClanNames)
      const [isLoading, setIsLoading] = useState(false);

      const [queryClanName, setQueryClanName] = useState("");
      const [queryTribe, setQueryTribe] = useState("");
      const [searchTerm_ClanName, setSearchTerm_ClanName] = useState('');
      const [searchTerm_Tribe, setSearchTerm_Tribe] = useState('')
      const [suggestionsClanName, setSuggestionsClanName] = useState([])  //USE URL FOR STATE MANAGEMENT  *prince kyle*
      const [suggestionsTribe, setSuggestionsTribe] = useState([])        //USE REACT HOOK FORM for FORM STATE MANAGEMENT

      const[clanNameListDropdown, setClanNameListDropdown] = useState()
      const[tribeListDropdown, setTribeListDropdown] = useState([])
      const [tribesArray, setTribesArray] = useState([])

      const [values1, setvalues1] = useState({username:"", tribe:"", clan:"", email:"", password1:"", password2:""});
      const [errors1, setErrors1] = useState({username:"", tribe:"", clan:"", email:"", password1:"", password2:""});

      const handleFocus_ClanName = () => {

        const dropdownClanNames = [...new Set(ClanNamesList.map(clanName => clanName.title.toLowerCase()))]

        setClanNameListDropdown(dropdownClanNames)

        if (queryClanName) {              // Only show suggestions if there is input
          console.log(queryClanName);
          setSearchTerm_ClanName(queryClanName);

          if (queryClanName.length > 0) {
            const filteredSuggestions = dropdownClanNames.filter(item =>
            item.toLowerCase().includes(queryClanName.toLowerCase())
              );
            setSuggestionsClanName(filteredSuggestions);
          } 
          else {
          setSuggestionsClanName([]);
          }  
        }
      }

      const handleFocus_Tribe = () => {
        const dropdownTribe = [...new Set(TribesList.map(tribe => tribe.tribe.toLowerCase()))]

        setTribeListDropdown(dropdownTribe)
        setTribesArray(TribesList)

        if (queryTribe) {              // Only show suggestions if there is input
          console.log(queryTribe);
          setSearchTerm_Tribe(queryTribe);

          if (queryTribe.length > 0) {
            const filteredSuggestions = dropdownTribe.filter(item =>
            item.toLowerCase().includes(queryTribe.toLowerCase())
              );
            setSuggestionsTribe(filteredSuggestions);
          } 
          else {
          setSuggestionsTribe([]);
          }  
        }
      }

      useEffect(() => {
      
        function handleClickOutside(event) {
          const clickedOutsideClan = clanNameRef.current && !clanNameRef.current.contains(event.target);
          const clickedOutsideTribe = tribeRef.current && !tribeRef.current.contains(event.target);

          if (clickedOutsideClan) {
            setSuggestionsClanName([]);
          }
          if (clickedOutsideTribe) {
            setSuggestionsTribe([]);
          }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

      const handleInputChange_ClanName = (e) => {
        //(e) => setvalues({ ...values, [e.target.name]: e.target.value })
        const input = e.target.value;
        setvalues1({ ...values1, ['clan']: e.target.value })
        setSearchTerm_ClanName(input);
        setQueryClanName(input);

        if (input.length > 0) {
          const filteredSuggestions = clanNameListDropdown.filter(item => item.toLowerCase().includes(input.toLowerCase()));
          setSuggestionsClanName(filteredSuggestions)
        } else {
          setSuggestionsClanName([]);
        }
      }

      const handleInputChange_Tribe = (e) => {
        //(e) => setvalues({ ...values, [e.target.name]: e.target.value })
        //setErrors({clanName: null, tribe: null, clanPraise:errors.clanPraise});
        const input = e.target.value;
        setvalues1({ ...values1, ['tribe']: e.target.value })
        setSearchTerm_Tribe(input);
        setQueryTribe(input);

        if (input.length > 0) {
          const filteredSuggestions = tribeListDropdown.filter(item => item.toLowerCase().includes(input.toLowerCase()));
          setSuggestionsTribe(filteredSuggestions)
        } else {
          setSuggestionsTribe([]);
        }
      }

      const handleClanName_SuggestionClick = (suggestion) => {

        setvalues1({...values1, ['clan']: suggestion })
        setSearchTerm_ClanName(suggestion);
        setSuggestionsClanName([])
        //console.log(values)
      }

      const handleTribe_SuggestionClick = (suggestion) => {

        setvalues1({...values1, ['tribe']: suggestion })
        setSearchTerm_Tribe(suggestion);
        setSuggestionsTribe([])
        //console.log(values)
      }

      const handleSubmit = async (e) => {                 
        e.preventDefault();
        setIsLoading(true);
        /*console.log("All Cookies:", cookies);
        console.log(values1);

        console.log(tribesArray)

        const tribeId = tribesArray.find(
          tribe => tribe.tribe.toLowerCase() === values1.tribe.toLowerCase()
        )?.id ?? null;*/
        
        //console.log(tribeId)

        const validationError = Validations.signUpValidations(values1);

        if (validationError){
          setErrors1(validationError);
          setIsLoading(false);
        }
        else{
          if (values1.password1 !== values1.password2) {
                  setErrors1({password1: "passwords do not match", password2: "passwords do not match"});
                  setIsLoading(false);
          }
          else{
            setErrors1({username:"", tribe:"", clan:"", email:"",password1:"", password2:""});
            //setSignUpData({email: values1.email, password: values1.password1, username: userBioData.username, tribe: userBioData.tribe, clan: userBioData.clan});
            try{                                                                    
              const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/sendVcode`, 
                {...values1},{withCredentials: true});
              console.log(data);
              console.log(data.errors);
              console.log(data.status);
              console.log("All Cookies:", cookies);
          
                if (!(data.status)) {                            
                setErrors1(data.errors);
                setIsLoading(false);
                console.log(errors1);           
                }
                if (data.status) {
                  console.log(data.status);
                  //console.log(data.userDet);
                  //setSignUpData(data.userDet);
                  //localStorage.setItem('VipUserName', JSON.stringify(data.userDet.username));
                  setSignUpData({email: values1.email, password: values1.password1, username: values1.username, tribe: values1.tribe, clan: values1.clan});
                  setSentVcode(data.code);
                  console.log(signUpData); 
                  setIsSignUpFormVisible(false);
                  setIsEnterVeriCodeCompVisible(true);
                }
            }
            catch(errors){
              console.log(errors);
            }
         }
        }
      }

      return(
        <div className="bg-gray-200 ">
        <form onSubmit={(e) => handleSubmit(e, values1)}>
          <div className="mt-1">
            <input className="border rounded border-amber-500" type='text' name='username' placeholder='username' value={values1.username || ""} 
              onChange={(e)=> setvalues1({ ...values1, [e.target.name]: e.target.value })} />
              {errors1.username && <span className= 'error-msg text-xs'> {errors1.username} </span>}
          </div>
          {/*<div className="flex mb-4 gap-2 w-[57%]">
                <div ref={clanNameRef} className="flex-1 mt-1.5 relative">
                  <div className="flex flex-col">
                  <input className="w-full border rounded border-amber-500" name="clan" placeholder="clan"  //value={values.clanName || ""}  
                    onChange={handleInputChange_ClanName}
                    onFocus={handleFocus_ClanName}
                    value={searchTerm_ClanName}
                    />
                    {<p className="error-msg text-xs">{errors1.clan}</p>}
                    </div>
                  {suggestionsClanName.length > 0 && (
                          <ul
                            style={{listStyleType: 'none', position: 'absolute', padding: '0', margin: '2px 0', border: '1px solid #ccc', borderRadius: '1px',
                              backgroundColor: '#fff', maxHeight: '150px', width: '100px', overflowY: 'auto', zIndex: 100, top: '100%',
                            }}
                          >
                            {suggestionsClanName.map((suggestion, index) => (
                              <li className="dropdown-item bg-stone-50"
                                key={index}
                                onClick={() => handleClanName_SuggestionClick(suggestion)}
                                style={{padding: '0px', cursor: 'pointer', borderBottom: '1px solid #ca8a04',}}   //#ddd
                              >
                              {suggestion} 
                              </li>
                            )) 
                            }
                          </ul>
                        )}
                </div>
                <div ref={tribeRef} className="flex-1 mt-1.5 relative">
                  <div className="flex flex-col">
                  <input className="w-full border rounded border-amber-500" name="tribe" placeholder="tribe"        //value={values.tribe || ""}  
                    onChange={handleInputChange_Tribe}
                    onFocus={handleFocus_Tribe}
                    value={searchTerm_Tribe}
                  />
                  {<p className="error-msg text-xs">{errors1.tribe}</p>}
                  </div>
                  {suggestionsTribe.length > 0 && (
                          <ul
                            style={{listStyleType: 'none', position: 'absolute', padding: '0', margin: '2px 0', border: '1px solid #ccc', borderRadius: '1px',
                              backgroundColor: '#fff', maxHeight: '150px', width: '100px', overflowY: 'auto', zIndex: 100, top: '100%',
                            }}
                          >
                            {suggestionsTribe.map((suggestion, index) => (
                              <li className="dropdown-item bg-stone-50"
                                key={index}
                                onClick={() => handleTribe_SuggestionClick(suggestion)}
                                style={{padding: '0px', cursor: 'pointer', borderBottom: '1px solid #ca8a04',}} //#ddd
                              >
                              {suggestion} 
                              </li>
                            )) 
                            }
                          </ul>
                        )}
                </div>
          </div>*/}
          <div>
            <input className="border rounded border-amber-500 mt-1" type='email' name='email' placeholder='Email' onChange={(e)=>  //updates values on related hook as changes are made
              setvalues1({ ...values1, [e.target.name]: e.target.value })} />
              {errors1.email && <span className= 'error-msg text-xs'> {errors1.email} </span>}
          </div>
          <div className="mt-3">
            <input className="border rounded border-amber-500 mt-1" type='password' name='password1' placeholder='Password' onChange={(e)=>
              setvalues1({ ...values1, [e.target.name]: e.target.value })} />
              {errors1.password1 && <span className='error-msg text-xs'> {errors1.password1} </span>}
          </div>
          <div>
            <p className="text-xs mt-0.5 text-gray-700">re-type password</p>
            <input className="border rounded border-amber-500 mt-0" type='password' name='password2' placeholder='Password' onChange={(e)=>
              setvalues1({ ...values1, [e.target.name]: e.target.value })} />
              {errors1.password2 && <span className='error-msg text-xs'> {errors1.password2} </span>}
          </div>
          <button className={`mt-1 p-1 px-2  border-black ${isLoading ? "bg-amber-200" : " bg-amber-400"}`} 
                  type='submit'>{isLoading ? "Loading..." : "Sign Up"}</button>
      </form>
            
        </div>
      )
    } 
      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
     const switchToSignIn = () => {
        onDataChange("SwitchToSignIn");
    }

    return (
      <>
      <div className="border border-amber-950 p-2.5 bg-gray-200">
        <p>Sign Up to continue</p>
        {isEnterVeriCodeCompVisible && <EnterVerifCode/>}
        {isSignUpFormVisible && <SignUpForm/>}
        {isUserBioFormVisible && <UserBioForm/>}
      </div>
      <div className="flex flex-row">
        Already have account? <p onClick={switchToSignIn} className="text-blue-500 cursor-pointer underline ml-1">Sign In</p>
      </div>
      </>
    );
  };