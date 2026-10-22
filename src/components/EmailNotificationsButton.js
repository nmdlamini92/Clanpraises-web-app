
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Validations from "./Validations";
import axios from "axios";

export default function NotificationToggle({initialOn = false, clanName, onChange, label = "notifications", postId, followsPost, openLoginModal, closeLoginModal}) {

  const [show_FollowPost_Modal, setShow_FollowPost_Modal] = useState(false);

    const [isUserSignedIn, setIsUserSignedIn] = useState({isUserSignedIn: null});
    
        useEffect(() => {
            // This code runs only in the browser
            const signInStatus = JSON.parse(localStorage.getItem('isUserSignedIn'));
            setIsUserSignedIn(signInStatus);
          }, []);

        const handleOpenFollow_Modal = (followData) => {
          //if (deleteData.id !== post.id){
            //setDeleteData(deleteData)
          //}

          setShow_FollowPost_Modal(true);
        };

        const handleCloseFollow_Modal = () => {

          setShow_FollowPost_Modal(false);
        };


      const FollowPost_Modal = ({ show, handleClose, children, }) => {

        const [values, setvalues] = useState({ email: "" });
        const [errors, setErrors] = useState({ email: "" });
        const [isLoading, setIsLoading] = useState(false);

        const handle_followPost = async () => {
          setIsLoading(true);

          if (!values.email || values.email.trim() === "") {
            setErrors({ ...errors, email: "*required" });
            setIsLoading(false);
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
              setErrors({ ...errors, email: "Invalid email address" });
              setIsLoading(false);
          }
          else {
            setErrors({ email: "" });
            
            try {
              const response = await axios.post(`${apiUrl}/checkEmailValidity`,
                {...values, tribeId: tribeId},{withCredentials: true}
              );
      
              if (response.data.status) {
                console.log(response);

                
              }
                
              if (!(response.data.status)) {
                console.log(response)
                console.log(response.data);
                
              }
            }
            catch (error) {
              console.error("Error while following post:", error);
          }

          }
        }

        function capitalizeFirstLetter(str) {
          if (!str) return '';
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
      

        return(
          <>
          {show && (
          <div className="modal-backdrop-clear">
          <div className="flex-col">
            <button onClick={handleCloseFollow_Modal} className="text-sm rounded-full">✕</button>
            <div className="modal bg-stone-300">
            <p className="text-xs mb-0.5">get <strong>{capitalizeFirstLetter(clanName)}</strong> notes notifications via your email</p>
              <div className="flex gap-2">
                <input className="border rounded border-amber-500 text-sm" type='email' name='email' placeholder=' Email' onChange={(e)=>
                  setvalues({ ...values, [e.target.name]: e.target.value })} />
                <button onClick={handle_followPost} className="px-1 text-sm">{isLoading ? "Loading..." : "Follow"}</button>
              </div>
              <p className="text-red-500 text-xs">{errors.email}</p>
            </div>
            
          </div>
          </div>
          )}
          </>
        )
       

      }

      const [on, setOn] = useState(followsPost);

      const[showUnfollowPostModal, setShowUnfollowPostModal] = useState(false);

      const handleClose_unfollowPostModal = () => {
        setShowUnfollowPostModal(false);
      };

      const UnfollowPost_Modal = ({ show, handleClose, children, }) => {

        //const [error, removeCookie] = useCookies([]);

        const handle_unfollowPost = async (e) => {
          //removeCookie("jwt");

          try {
              const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/followpost`,
                {postId: postId},{withCredentials: true}
              );
      
              if (response.data.status) {
                console.log(response);
                setOn((prev) => {
                  const next = !prev;
                  if (onChange) onChange(next);
                  return next;
                });
                handleClose_unfollowPostModal()
              }
                
              if (!(response.data.status)) {
                console.log(response)
                console.log(response.data);
                handleClose_unfollowPostModal()
              }
            }
            catch (error) {
              console.error("Error while following post:", error);
          }
        
        }

        function capitalizeFirstLetter(str) {
          if (!str) return '';
          return str.charAt(0).toUpperCase() + str.slice(1);
        }

        return(
          <>
          {show && (
          <div className="modal-backdrop-clear">
          <div className="modal animate-slide-in-top">
          <p>Are you want to unfollow <span className="font-bold">{capitalizeFirstLetter(clanName)}</span> clanpraise?</p>
          <div className="flex gap-2">
            <button onClick={handleClose_unfollowPostModal}>No</button>
            <button onClick={handle_unfollowPost} className="px-1 ">Yes</button>
          </div>
          </div>
          </div>
          )}
          </>
        )
      }
      

  const handleClick_FollowPost = async () => {

    if (isUserSignedIn.isUserSignedIn===null || isUserSignedIn.isUserSignedIn===false || isUserSignedIn.isUserSignedIn===undefined) {
    //handleOpenFollow_Modal()
    openLoginModal()
    }
    else{
      if (on === true) {
        setShowUnfollowPostModal(true);
      }
      else {
      //call followings_on_Post API
         try {
              const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/followpost`,
                {postId: postId},{withCredentials: true}
              );
      
              if (response.data.status) {
                console.log(response);
                setOn((prev) => {
                  const next = !prev;
                  if (onChange) onChange(next);
                  return next;
                });
              }
                
              if (!(response.data.status)) {
                console.log(response)
                console.log(response.data);
              }
            }
            catch (error) {
              console.error("Error while following post:", error);
          }
        }

      

    }
  };

  return (
    <>
    <UnfollowPost_Modal show={showUnfollowPostModal} handleClose={handleClose_unfollowPostModal}> </UnfollowPost_Modal>
    <button className="text-xs p-0.5 border-solid border-[0.3px] border-amber-400"
      onClick={handleClick_FollowPost}
      style={{ fontSize: "9px", color: on ? "#b45309" : "gray", background: on ? "transparent" : "transparent", }}
    >
      {on ? "+ Following" : "+ Follow"}
    </button>
    </>
  );
}


