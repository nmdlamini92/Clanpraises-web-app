//import react from "react"
"use client";
import {IconBtn} from "./IconBtn"
import { FaPenSquare} from "react-icons/fa";
import { useState } from "react";
import AddClanPraiseForm from "./AddClanPraiseForm"
import SignInComp from "./SignInComp";
import SignUpComp from "./SignUpComp";
import { ToastContainer, toast } from 'react-toastify';

export default function AddClanPraise () {

    const [show_AddClanPraise_Modal, setShow_AddClanPraise_Modal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [isSignUpCompVisible, setIsSignUpCompVisible] = useState(true);
    const [isSignInCompVisible, setIsSignInCompVisible] = useState(false);

    const handle_closeAddClanPraise_Modal = () => {
        setShow_AddClanPraise_Modal(false)
      }
    
      const handleOpen_ClanPraise_Modal = () => {
        const isUserSignedIn = JSON.parse(localStorage.getItem('isUserSignedIn'));
        if (isUserSignedIn.isUserSignedIn===false){
           // console.log("not signed ")
            handleOpenLogInModal()
        }
        else{
        setShow_AddClanPraise_Modal(true)
        }
      }
    
    const AddClanPraise_Modal = ({ show, onClose }) => {
        return (
          <>
            {show && (
              <div className="modal-backdrop">
                <div className="modal">
                  <button className="close-button mb-2" onClick={onClose}>Close</button>
                  <AddClanPraiseForm />
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
        Icon={props => <FaPenSquare {...props} size={20} className='text-amber-900'/>}
        onClick={handleOpen_ClanPraise_Modal}
        style={{backgroundColor: '#fff7ed', border: '1px solid #ca8a04' }}
        //className="bg-white-100"
      >
        <p className='text-amber-900'>Add Clan Praise</p> 
        </IconBtn>
        </div>
        </div>
        </>
    )
}