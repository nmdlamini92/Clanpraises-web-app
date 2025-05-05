"use client";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import {useCookies} from "react-cookie";
import { useEffect } from "react";
import SignUpComp from "./SignUpComp";
import SignInComp from "./SignInComp";
import Validations from "./Validations";
import { getUsers } from "../services/posts";
import { ToastContainer, toast } from 'react-toastify';
import { FaRegUser, FaBars, FaPenSquare, FaFolderPlus, FaHome } from "react-icons/fa";
import { IconBtn } from "./IconBtn";
import Image from "next/image"
import BantuLogoIcon from "./BantuIcon";


export default function Header1 (){

  const [isUserSignedIn, setIsUserSignedIn] = useState(Boolean);
  const [userName, setUserName] = useState('');
  const [userTribe, setUserTribe] = useState('');
  const [userClan, setUserClan] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      console.log(cookies);
      console.log(cookies.jwt);
      console.log(!cookies.jwt);
      console.log(cookies.userId);
      console.log(cookies.jwt===undefined);
      
      const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
      console.log(isUserSignedIn);

      if (isUserSignedIn===null || isUserSignedIn.isUserSignedIn===false || isUserSignedIn.isUserSignedIn===undefined){ //isUserSignedIn.isUserSignedIn===false || isUserSignedIn.isUserSignedIn===undefined) {
        removeCookie("jwt");
        setIsUserSignedIn(false);
        setUserName("Login")
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
            setUserName("Login")
            localStorage.setItem('isUserSignedIn', JSON.stringify({isUserSignedIn: false}));
            localStorage.setItem('VipUserId', JSON.stringify({VipUserId: null}));
            console.log('User not signed-in')
          }
          if (data.data.status===true){
            setIsUserSignedIn(true);
            localStorage.setItem('isUserSignedIn', JSON.stringify({isUserSignedIn: true}));
            localStorage.setItem('VipUserId', JSON.stringify({VipUserId: data.data.UserId}));
            console.log(data.data);
            //setUserID(data.data.UserId);
            setUserName(data.data.UserName);
            setUserTribe(data.data.userTribe)
            setUserClan(data.data.userClan)
            console.log('User is Signed-In');
          }
          
        } catch (error) {
          console.error("Error during verification:", error);
        }
      }}
    };

    verifyUser();
  }, [cookies, removeCookie, setIsUserSignedIn]);



            const [isSignUpCompVisible, setIsSignUpCompVisible] = useState(true);
            const [isSignInCompVisible, setIsSignInCompVisible] = useState(false);
            const [showLoginModal, setShowLoginModal] = useState(false);

            const handleOpenLoginModal = () => {
              setShowLoginModal(true);
            };
                
            const handleCloseLoginModal = () => {
              setShowLoginModal(false);
            };
          
            const Login_Modal = ({ show, handleClose, isSignUpCompVisible, setIsSignUpCompVisible, isSignInCompVisible, setIsSignInCompVisible}) => {
      
              console.log('madafvcker');
      
              const handleChildData = (data) => {
      
                console.log(data);
                console.log(data == 'SignUpSuccess');
                console.log(data == 'SwitchToSignIn');
                  if (data[0] == 'SignUpSuccess'){
                    setShowLoginModal(false);
                    toast.success("Successfully signed-up");
                    window.location.reload()
                  }
                  if (data[0] == 'SignInSuccess'){
                    setShowLoginModal(false);
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
                    <button className="p-1 mb-1 text-xs bg-red-800/60" onClick={handleClose}>Close</button>
                    {isSignUpCompVisible && <SignUpComp onDataChange={handleChildData} />}
                    {isSignInCompVisible && <SignInComp onDataChange={handleChildData} />}
                    </div>
                    </div>
                  )}
                </>
              )
            }
            
        
      const handleCloseSignOutModal = () => {
        setShowSignOutModal(false);
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


      const [openProfileMenu, setOpenProfileMenu] = useState(false);
      
      const[showSignOutModal, setShowSignOutModal] = useState(false);


      const handleProfileClick = () => {

        if (isUserSignedIn){
          setOpenProfileMenu(!openProfileMenu);
        }
        else{
          handleOpenLoginModal();
        }
      }

      const handleCloseProfileMenue = () => {
        setOpenProfileMenu(false)
      }

      const handleOpenSignOutModal = () => {
        setOpenProfileMenu(!openProfileMenu);
        setShowSignOutModal(true);
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
      
            const [showUserProfileModal, setShowUserProfileModal] = useState(false);

            const handleOpenUserProfileModal = () => {
              setShowUserProfileModal(true);
            };
                
            const handleCloseUserProfileModal = () => {
              setShowUserProfileModal(false);
            };
          
            const UserProfile_Modal = ({ handleClose}) => {
      
              console.log('madafvcker');
      
              return(
                <>
                  {showUserProfileModal && (
                    <div className="modal-backdrop">
                      <div className="modal">
                    <button className="close-button" onClick={handleCloseUserProfileModal}>Close</button>
                    <p>Username: {userName} </p>
                    <p>Tribe: {userTribe} </p>
                    <p>Clan/Surname: {userClan}</p>
                    </div>
                    </div>
                  )}
                </>
              )
            }
    
    return(   
      
      <>
      <ToastContainer/>
    <div className='flex justify-between items-center bg-white/60 border-4 border-amber-500 p-2'> {/**bg-amber-600/10  bg-amber-200/50 */}
    <Login_Modal show={showLoginModal} handleClose={handleCloseLoginModal} isSignUpCompVisible={isSignUpCompVisible} setIsSignUpCompVisible={setIsSignUpCompVisible} isSignInCompVisible={isSignInCompVisible} setIsSignInCompVisible={setIsSignInCompVisible} setShowModal={setShowLoginModal}></Login_Modal>    
        <SignOut_Modal show={showSignOutModal} handleClose={handleCloseSignOutModal}></SignOut_Modal>  
        <About_Modal showAboutModal={showAboutModal} handleClose={handleCloseAboutModal}></About_Modal>  
        <Contact_Modal showContactModal={showContactModal} handleClose={handleCloseContactModal}></Contact_Modal>
        <UserProfile_Modal></UserProfile_Modal>
        <div className="flex gap-2 justify-center items-center">
          <IconBtn
          
          Icon={props => <FaHome {...props} size={20} className='text-amber-900'/>}
          onClick={handleHome}
        >
          <p className='text-amber-900'>Home</p>
        </IconBtn>
        <p onClick={handleOpenAboutModal} className='text-amber-900 hover:bg-gray-100 cursor-pointer'>ABOUT</p>
        <p onClick={handleOpenContactModal} className='text-amber-900 hover:bg-gray-100 cursor-pointer'>CONTACT</p>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center leading-none">
        <Image src="/SimpleIcon.svg" alt="My Logo" width={55} height={65 } />
          <div className="flex flex-col items-center leading-none">
            <h1 className="text-amber-900 text-[28px] leading-none font-hand">Bantu</h1>
            <p className="relative text-amber-900 text-[13px] leading-none font-hand">clan praises</p>
          </div>
        </div>
      <div className="flex flex-col items-center">
        <IconBtn
          Icon={props => <FaRegUser {...props} size={20} className="mb-0 p-0 text-amber-900"/>}
          onClick={handleProfileClick}
        > 
        </IconBtn>
        <div className="relative p-0">
        <p onClick={handleProfileClick} className="text-[10px] cursor-pointer">{userName}</p>
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
              <ul className=""> {/*space-y-2*/}
                <li className="p-2 hover:bg-gray-100 cursor-pointer border border-gray-400 box-border" onClick={handleOpenUserProfileModal}>Profile</li>
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
