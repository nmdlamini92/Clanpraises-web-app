
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Validations from "./Validations";

export default function NotificationToggle({initialOn = false, clanName, onChange, label = "notifications"}) {

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
  
  const [on, setOn] = useState(false);

  const handleClick = () => {

    if (isUserSignedIn.isUserSignedIn===null || isUserSignedIn.isUserSignedIn===false || isUserSignedIn.isUserSignedIn===undefined) {
    handleOpenFollow_Modal()
    }
    else{
      setOn((prev) => {
        const next = !prev;
        if (onChange) onChange(next);
        return next;
      });
    }
  };

  return (
    <>
    <FollowPost_Modal show={show_FollowPost_Modal} handleClose={handleCloseFollow_Modal}> </FollowPost_Modal>
    <button className="text-xs p-0.5 border-solid border-[0.3px] border-amber-400"
      onClick={handleClick}
      style={{ fontSize: "9px", color: on ? "#b45309" : "gray", background: on ? "#dbeafe" : "#f1f5f9", }}
    >
      {on ? "+ Following" : "+ Follow"}
    </button>
    </>
  );
}


