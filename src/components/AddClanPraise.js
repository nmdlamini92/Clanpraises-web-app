//import react from "react"
"use client";
import {IconBtn} from "./IconBtn"
import { FaPenSquare} from "react-icons/fa";
import { useState, useEffect } from "react";
import AddClanPraiseFormGuest from "./AddClanPraiseFormGuest"
import AddClanPraiseForm from "./AddClanPraiseForm";
import SignInComp from "./SignInComp";
import SignUpComp from "./SignUpComp";
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';

export default function AddClanPraise ({buttonBorderState}) {

    // components/SimpleSvgIcon.jsx

      const SimpleSvgIcon = (props) => (
        <Image
          src="/SimpleIcon.svg"
          alt="My Logo"
          width={26}
          height={26}
          className={`text-amber-900 ${props.className || ''}`}
        />
      );

    const [isUserSignedIn, setIsUserSignedIn] = useState({isUserSignedIn: null});

    useEffect(() => {
        // This code runs only in the browser
        const signInStatus = JSON.parse(localStorage.getItem('isUserSignedIn'));
        setIsUserSignedIn(signInStatus);
      }, []);

    const [show_AddClanPraise_Modal, setShow_AddClanPraise_Modal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [isSignUpCompVisible, setIsSignUpCompVisible] = useState(true);
    const [isSignInCompVisible, setIsSignInCompVisible] = useState(false);

    const [isbuttonBorderBold, setButtonBorderBold] = useState(false);

    const handle_closeAddClanPraise_Modal = () => {
        setShow_AddClanPraise_Modal(false)
      }
    
      const handleOpen_ClanPraise_Modal = () => {
        //const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));

        setShow_AddClanPraise_Modal(true)
        /*if (isUserSignedIn.isUserSignedIn===false){
           // console.log("not signed ")
            handleOpenLogInModal()
        }
        else{
        setShow_AddClanPraise_Modal(true)
        }*/
      }
    
    const AddClanPraise_Modal = ({ show, onClose }) => {

      //const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));

        return (
          <>
            {show && (
              <div className="modal-backdrop">
                <div className="p-5 pt-2 rounded-lg max-w-sm w-full shadow-md bg-stone-200">
                  <div className="bg-stone-200">
                  <button className="p-1 mb-1 text-xs bg-red-700/70" onClick={onClose}>Close</button>
                  {(isUserSignedIn.isUserSignedIn===null || isUserSignedIn.isUserSignedIn===false || 
                  isUserSignedIn.isUserSignedIn===undefined) && (
                  <AddClanPraiseFormGuest />
                  )}
                  {(isUserSignedIn.isUserSignedIn===true) && (
                  <AddClanPraiseForm />
                  )}
                  </div>
                </div>
              </div>
            )}
          </>
        );
      };


      const handleOpenLogInModal = () => {
        setShowLogInModal(true);
      };
    
      const handleCloseLogInModal = () => {
        setShowLogInModal(false);
      };


    const LogInModal = ({ show, handleClose, isSignUpCompVisible, setIsSignUpCompVisible, isSignInCompVisible, setIsSignInCompVisible}) => {
      
        console.log('madafvcker');
      
        const [testing, setTesting] = useState();
      
      
        const handleChildData = (data) => {
      
          console.log(data);
          console.log(data[0] === 'SignUpSuccess');
          console.log(data[0] == 'SignInSuccess');
          console.log(data[0] === 'SwitchToSignIn');
            if (data[0] == 'SignUpSuccess'){
              //setUserName(data[1]);
              //handleCloseLogInModal();
              setShowLogInModal(false);
              toast.success("Successfully signed-up");
              window.location.reload()
            }
            if (data[0] == 'SignInSuccess'){ 
              console.log('golo')
              //setUserName(data[1]);
              //handleClose()
              //handleCloseLogInModal()
              //handleCloseLogInModal();
              setShowLogInModal(false);
              //toast.success("Successfully signed-in");
              window.location.reload()
             
            }
            if (data == 'SwitchToSignIn'){
              console.log("wtf kantsi");
              setIsSignUpCompVisible(false);
              setIsSignInCompVisible(true);
              setTesting(true);
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

    return(
        <>
        <ToastContainer/>
        <div>
        <AddClanPraise_Modal show={show_AddClanPraise_Modal} onClose={handle_closeAddClanPraise_Modal}/>
        <LogInModal show={showLogInModal} handleClose={handleCloseLogInModal} isSignUpCompVisible={isSignUpCompVisible} setIsSignUpCompVisible={setIsSignUpCompVisible} isSignInCompVisible={isSignInCompVisible} setIsSignInCompVisible={setIsSignInCompVisible} setShowLogInModal={setShowLogInModal}></LogInModal>
        <div className=''>
        <IconBtn
        Icon={props => <SimpleSvgIcon {...props} size={30} className='text-amber-900'/>}
        onClick={handleOpen_ClanPraise_Modal}
                    //backgroundColor: '#fff7ed'                                                  #ca8a04                   
        style={{backgroundColor: 'rgb(254 252 232 / 0.9)', border: buttonBorderState ? '2px solid #fbbf24' : '1.5px solid #fbbf24', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'}}>
        <p className='text-amber-900'>Add Literature</p>
        </IconBtn>
        </div>
        </div>
        </>
    )
}