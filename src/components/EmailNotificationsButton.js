
import { useState } from "react";
import PropTypes from "prop-types";

export default function NotificationToggle({initialOn = false, clanName, onChange, label = "notifications"}) {

  const [show_DeletePost_Modal, setShow_DeletePost_Modal] = useState(false);
        
        const handleOpenDelete_Modal = (deleteData) => {
          //if (deleteData.id !== post.id){
            //setDeleteData(deleteData)
          //}

          setShow_DeletePost_Modal(true);
        };

        const handleCloseDelete_Modal = () => {
          setShow_DeletePost_Modal(false);
        };


      const DeletePost_Modal = ({ show, handleClose, children, }) => {

        const [values, setvalues] = useState({ email: "" });

        const handle_deletePost = async () => {

            
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
            <button onClick={handleCloseDelete_Modal} className="text-sm rounded-full">✕</button>
            <div className="modal bg-stone-300">
            <p className="text-xs">Get updates on notes added to <strong>{capitalizeFirstLetter(clanName)}</strong></p>
              <div className="flex gap-2">
                <input className="border rounded border-amber-500 text-sm" type='email' name='email' placeholder=' Email' onChange={(e)=>
                  setvalues({ ...values, [e.target.name]: e.target.value })} />
                <button onClick={handle_deletePost} className="px-1 text-sm">Subscribe</button>
              </div>
            </div>
          </div>
          </div>
          )}
          </>
        )
       

      }
  
  const [on, setOn] = useState(false);

  const handleClick = () => {
    handleOpenDelete_Modal()
    setOn((prev) => {
      const next = !prev;
      if (onChange) onChange(next);
      return next;
    });
  };

  return (
    <>
    <DeletePost_Modal show={show_DeletePost_Modal} handleClose={handleCloseDelete_Modal}> </DeletePost_Modal>
    <div
      className="notificationButton inline-flex items-center justify-between rounded-full cursor-pointer"
      onClick={handleClick}
      style={{
        //background: "#f8fafc", 
        padding: "0.02rem 0.15rem", // px-2.5 py-1.5 (was px-5 py-3)
        minWidth: 25, // 50 / 2
        gap: 2, // 4 / 2
      }}
    >
      <span
        className="text-blue-600 select-none text-[14.5px]"
        onClick={handleClick}
        style={{
          fontSize: "", // 1.25rem / 2        //&#9993;&#65039;
        }}
      > 
        &#128276;
      </span>
      <button
        aria-pressed={on}
        role="switch"
        aria-label={label}
        onClick={handleClick}
        className="relative flex items-center flex-shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          width: 32, // 64 / 2 = 32px
          height: 7, // 32 / 2 = 16px
          background: on
            ? "linear-gradient(135deg,#6eaafc 0%,#8acbff 100%)"
            : "#cfdce9",
          transition: "background 200ms ease",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute rounded-full shadow"
          onClick={handleClick}
          style={{
            width: 16, // 28 / 2 = 14px
            height: 16,
            top: 0.25, // 0.5 / 2
            bottom: 0.125,      // 0.25 nala?
            background: "#fff",
            transform: on ? "translateX(10px)" : "translateX(-7.5px)", // 32/2 and 4/2
            transition: "transform 100ms ease",
          }}
        ></span>
      </button>
    </div>
    </>
  );
}

NotificationToggle.propTypes = {
  initialOn: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

/*
import { useState } from "react";
import PropTypes from "prop-types";

export default function NotificationToggle({
  initialOn = true,
  onChange,
  label = "notifications",
}) {
  const [on, setOn] = useState(initialOn);

  const handleClick = () => {
    setOn((prev) => {
      const next = !prev;
      if (onChange) onChange(next);
      return next;
    });
  };

  return (
    <div className="">
    <div
      className="inline-flex items-center justify-between px-5 py-3 rounded-full"
      style={{
        background: "#d8e9fd",
        minWidth: 50,
        gap: 4,
      }}
    >
      <span className="text-blue-600 font-medium text-lg select-none">
        {label}
      </span>
      <button
        aria-pressed={on}
        role="switch"
        aria-label={label}
        onClick={handleClick}
        className="relative w-16 h-8 flex items-center flex-shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          background: on
            ? "linear-gradient(135deg,#6eaafc 0%,#8acbff 100%)"
            : "#cfdce9",
          transition: "background 200ms ease",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute top-0.5 bottom-0.5 w-7 h-7 rounded-full shadow"
          style={{
            background: "#fff",
            transform: on ? "translateX(32px)" : "translateX(4px)",
            transition: "transform 200ms ease",
          }}
        ></span>
      </button>
    </div>
    </div>
  );
}

NotificationToggle.propTypes = {
  initialOn: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
};*/
