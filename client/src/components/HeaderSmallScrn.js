"use client";
import React from "react";
import axios from 'axios';
import {useCookies} from "react-cookie";
import { useEffect, useState, useRef } from "react";
import SignUpComp from "./SignUpComp";
import SignInComp from "./SignInComp";
import Validations from "./Validations";
import { getUsers } from "../services/posts";
import { ToastContainer, toast } from 'react-toastify';
import { FaRegUser, FaBars, FaPenSquare, FaFolderPlus, FaHome } from "react-icons/fa";
import { IconBtn } from "./IconBtn";
import Image from "next/image";


export default function HeaderSmallScrn (){

  const homeMenueRef = useRef(null);
  const profileMenueRef = useRef(null);

  const [isUserSignedIn, setIsUserSignedIn] = useState(Boolean);
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState();


  const [fetchedUsers, setFetchedUsers] = useState();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  useEffect(() => {
    
    getUsers()
      .then((data) => {
        console.log(data);
        setFetchedUsers(data);
    })
      .catch((error) => console.error(error)) // Handle any errors
      .finally(() => {
      })
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      console.log(cookies);
      console.log(cookies.jwt);
      console.log(!cookies.jwt);
      console.log(cookies.userId);
      console.log(cookies.jwt===undefined);
      
      const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
      console.log(isUserSignedIn);

      if (isUserSignedIn===null){ //isUserSignedIn.isUserSignedIn===false || isUserSignedIn.isUserSignedIn===undefined) {
        removeCookie("jwt");
        setIsUserSignedIn(false);
        setUserName("")
        //onDataChange1([false, '']);
        localStorage.setItem('isUserSignedIn', JSON.stringify({isUserSignedIn: false}));
        localStorage.setItem('VipUserId', JSON.stringify({VipUserId: null}));
        //console.log(isUserSignedIn);
        console.log('user Not signed-in');
      } else {
        if(isUserSignedIn.isUserSignedIn===true){
        try {
          const  data  = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/verifyuser`,
            {cookies: cookies},
            { withCredentials: true }
          );
          console.log(data);
          console.log(data.data.status);
          if (data.data.status===false) {
            setIsUserSignedIn(false);
            setUserName("")
            localStorage.setItem('isUserSignedIn', JSON.stringify({isUserSignedIn: false}));
            localStorage.setItem('VipUserId', JSON.stringify({VipUserId: null}));
            console.log('User not signed-in')
          }
          if (data.data.status===true){
            setIsUserSignedIn(true);
            setUserName("")
            localStorage.setItem('isUserSignedIn', JSON.stringify({isUserSignedIn: true}));
            localStorage.setItem('VipUserId', JSON.stringify({VipUserId: data.data.UserId}));
            console.log(data.data);
            setUserID(data.data.UserId);
            setUserName(data.data.UserName);
            console.log('User is Signed-In');
          }
          
        } catch (error) {
          console.error("Error during verification:", error);
        }
      }}
    };

    verifyUser();
  }, [cookies, removeCookie, setIsUserSignedIn]);

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('AllUsersInDB', JSON.stringify({ AllUsersInDB: fetchedUsers }));
    }
  }, [fetchedUsers]);


            const [isSignUpCompVisible, setIsSignUpCompVisible] = useState(true);
            const [isSignInCompVisible, setIsSignInCompVisible] = useState(false);
            const [showModal, setShowModal] = useState(false);
          
            const Modal = ({ show, handleClose, handleCloseModal, isSignUpCompVisible, setIsSignUpCompVisible, isSignInCompVisible, setIsSignInCompVisible, setShowModal}) => {
      
              console.log('madafvcker');
      
              const handleChildData = (data) => {
      
                console.log(data);
                console.log(data == 'SignUpSuccess');
                console.log(data == 'SwitchToSignIn');
                  if (data[0] == 'SignUpSuccess'){
                    setShowModal(false);
                    toast.success("Successfully signed-up");
                    window.location.reload()
                  }
                  if (data[0] == 'SignInSuccess'){
                    setShowModal(false);
                    toast.success("Successfully signed-in");
                    window.location.reload()
                  }
                  if (data == 'SwitchToSignIn'){
                    console.log("wtf kantsi");
                    setIsSignUpCompVisible(false);
                    setIsSignInCompVisible(true);
                  }
                  if (data == 'SwitchToSignUp'){
                    setIsSignInCompVisible(false);
                    setIsSignUpCompVisible(true);
                  }
                }
      
              return(
                <>
                  {show && (
                    <div className="modal-backdrop">
                      <div className="modal">
                    <button className="close-button" onClick={handleClose}>Close</button>
                    {isSignUpCompVisible && <SignUpComp onDataChange={handleChildData} />}
                    {isSignInCompVisible && <SignInComp onDataChange={handleChildData} />}
                    </div>
                    </div>
                  )}
                </>
              )
            }
            
      const handleOpenModal = () => {
        setShowModal(true);
      };
          
      const handleCloseModal = () => {
        setShowModal(false);
      };

      
      const SignOut_Modal = ({ show, handleClose, children, }) => {
      
              const [cookies, removeCookie] = useCookies([]);
      
              const handleSignOut = async (e) => {
                removeCookie("jwt");
                localStorage.setItem('isUserSignedIn', JSON.stringify({isUserSignedIn: false}));
                localStorage.setItem('VipUserId', JSON.stringify({VipUserId: null}));
                window.location.reload();
              }
      
              return(
                <>
                {show && (
                <div className="modal-backdrop-clear">
                <div className="modal animate-slide-in-top">
                <p>Are you sure you want to log out?</p>
                <div>
                  <button onClick={handleCloseSignOutModal}>No</button>
                  <button onClick={handleSignOut}>Yes</button>
                </div>
                </div>
                </div>
                )}
                </>
              )
            }

            const handleCloseSignOutModal = () => {
              setShowSignOutModal(false);
            };
      
            const [openProfileMenu, setOpenProfileMenu] = useState(false);
            
            const[showSignOutModal, setShowSignOutModal] = useState(false);
      
      
            const handleProfileClick = () => {
      
              if (isUserSignedIn){
                setOpenProfileMenu(!openProfileMenu);
              }
              else{
                handleOpenModal();
              }
            }

            const handleCloseProfileMenue = () => {
              setOpenProfileMenu(false)
            }
      
            const handleViewProfile = () => {
              setOpenProfileMenu(!openProfileMenu);
            }
      
            const handleOpenSignOutModal = () => {
              setOpenProfileMenu(!openProfileMenu);
              setShowSignOutModal(true);
            }


      const [isHomeMenueOpen, setIsHomeMenueOpen] = useState(false);

      const handleOpenHomeMenue = () => {
          setIsHomeMenueOpen(!isHomeMenueOpen);
      }

      const handleCloseHomeMenue = () => {
        setIsHomeMenueOpen(false);
      }

      const handleHome = () => {
        window.location.href = '/';
      }

      const [showAboutModal, setShowAboutModal] = useState(false);

      const handleOpenAboutModal = () => {
        setShowAboutModal(true)
      }

      const handleCloseAboutModal = () => {
        setShowAboutModal(false)
      }

      const About_Modal = ({ showAboutModal, handleClose, children, }) => {

        return(
          <>
          {showAboutModal && (
          <div className="modal-backdrop-clear">
          <div className="modal animate-slide-in-top">
          <button onClick={handleClose}>Close</button>
          <p>Bantu-ClanPraises is an interactive databes of bantu clans' praises and their meanings</p>
          </div>
          </div>
          )}
          </>
        )
      }

      
      const [showContactModal, setShowContactModal] = useState(false)

      const handleOpenContactModal = () => {
        setShowContactModal(true)
      }

      const handleCloseContactModal = () => {
        setShowContactModal(false)
      }

      const Contact_Modal = ({ showContactModal, handleClose, children, }) => {

        return(
          <>
          {showContactModal && (
          <div className="modal-backdrop-clear">
          <div className="modal animate-slide-in-top">
            <button onClick={handleClose}>Close</button>
          <p>Email: nmdlamini92@gmail.com</p>
          </div>
          </div>
          )}
          </>
        )
      }

    /*useEffect(() => {
          
            function handleClickOutside(event) {
              const clickedOutsideHomeMenue = homeMenueRef.current && !homeMenueRef.current.contains(event.target);
              const clickedOutsideProfileMenue = profileMenueRef.current && !profileMenueRef.current.contains(event.target);
    
              if (clickedOutsideHomeMenue) {
                setIsHomeMenueOpen(false)
              }
              if (clickedOutsideProfileMenue) {
                setOpenProfileMenu(false)
              }
            }
    
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
              document.removeEventListener("mousedown", handleClickOutside);
            };
          }, []);*/
    
    return(   
      
      <>
      <ToastContainer/>
    <div className='header1 bg-white/60 border border-amber-500 items-center p-2'> {/**bg-amber-600/10 */}
    <Modal show={showModal} handleClose={handleCloseModal} isSignUpCompVisible={isSignUpCompVisible} setIsSignUpCompVisible={setIsSignUpCompVisible} isSignInCompVisible={isSignInCompVisible} setIsSignInCompVisible={setIsSignInCompVisible} setShowModal={setShowModal}></Modal>    
        <SignOut_Modal show={showSignOutModal} handleClose={handleCloseSignOutModal}></SignOut_Modal>
        <About_Modal showAboutModal={showAboutModal} handleClose={handleCloseAboutModal}></About_Modal>  
        <Contact_Modal showContactModal={showContactModal} handleClose={handleCloseContactModal}></Contact_Modal>
        <div className="flex flex-col">
          <IconBtn
          Icon={props => <FaBars {...props} size={20} className='text-amber-900'/>}
          onClick={handleOpenHomeMenue}
        >
          <p className='text-amber-900'></p>
        </IconBtn>
            <div ref={homeMenueRef} className="relative text-sm p-0">
            {isHomeMenueOpen && (
            <div>
            {/* Wrapper to group both menu and close button absolutely */}
            <div className="absolute mt-0 flex items-start z-[102]"> {/**right-0 */}
              {/* Sliding Menu */}
              <div className="bg-white shadow-lg rounded-md left-0 p-0 animate-slide-in-left z-[101]">
                <ul className=""> {/*space-y-2*/}
                  <li className="p-2 hover:bg-gray-100 cursor-pointer border border-gray-400" onClick={handleHome}>Home</li>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer border border-gray-400" onClick={handleOpenAboutModal}>About</li>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer border border-gray-400" onClick={handleOpenContactModal}>Contact</li>
                </ul>
              </div>
              {/* Close Button */}
              <button
                onClick={handleCloseHomeMenue}
                className="ml-1 mt-1 text-gray-500 hover:text-black rounded-full p-1 transition duration-200"
                title="Close menu"
              >
                ✕
              </button>
            </div>
          </div>
            )}
            </div>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center leading-none">
            <Image src="/SimpleIcon.svg" alt="My Logo" width={55} height={65 } 
                  className="w-[35px] h-[45px] sm:w-[40px] sm:h-[50px] md:w-[50px] md:h-[60px] lg:w-[55px] lg:h-[65px]"/>
            <div className="flex flex-col items-center leading-none">
              <h1 className="text-amber-900 leading-none font-hand text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px]">Bantu</h1>
              <p className="relative text-amber-900 leading-none font-hand text-[9px] sm:text-[11px] md:text-[12px] lg:text-[13px]">clan praises</p>
            </div>
        </div>
        <div className="flex flex-col">
        <IconBtn
          Icon={props => <FaRegUser {...props} size={20} className="mb-0 p-0 text-amber-900"/>}
          onClick={handleProfileClick}
        > 
        </IconBtn>
        <div ref={profileMenueRef} className="relative p-0">
          <p className="text-[10px]">{isUserSignedIn? userName : ''}</p>
          {openProfileMenu && (
          <div>
          {/* Wrapper to group both menu and close button absolutely */}
          <div className="absolute mt-0 flex items-start z-[102] right-0"> {/**right-0 */}
            {/* Close Button */}
            <button
              onClick={handleCloseProfileMenue}
              className="mr-1 mt-1 text-gray-500 hover:text-black rounded-full p-1 transition duration-200"
              title="Close menu"
            >
              ✕
            </button>
            {/* Sliding Menu */}
            <div className="bg-white shadow-lg rounded-md p-0 animate-slide-in-right z-[101]">
              <ul className="text-sm"> {/*space-y-2*/}
                <li className="p-2 hover:bg-gray-100 cursor-pointer border border-gray-400 box-border" onClick={handleProfileClick}>Profile</li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer border border-gray-400" onClick={handleOpenSignOutModal}>Logout</li>
               
              </ul>
            </div>
            
          </div>
          </div>
          )}
        </div>
      </div>
      </div>
    </>
    )
}
