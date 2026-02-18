'use client'
import SearchBarWithSuggestions from "./SearchBar";
import AddClanPraise from "./AddClanPraise";
import {useState, useEffect} from 'react';

export default function AddNsearchBar() {


  const [isUserSignedIn, setIsUserSignedIn] = useState({isUserSignedIn: null});
  const [username, setUsername] = useState({VipUserName: null});
      
          useEffect(() => {
              // This code runs only in the browser
              const signInStatus = JSON.parse(localStorage.getItem('isUserSignedIn'));
              setIsUserSignedIn(signInStatus);
              const userName = JSON.parse(localStorage.getItem('VipUserName'));
              setUsername(userName);
            }, []);

const [isbuttonBorderBold, setButtonBorderBold] = useState(false);

/*const toggleButtonBorder = () => {
  setButtonBorderBold(!isbuttonBorderBold);
}*/

const makeButtonBorderBold = () => {
  setButtonBorderBold(true);
}

const makeButtonBorderNormal = () => {
  setButtonBorderBold(false);
}


console.log(username);
console.log(isUserSignedIn);

  return (
    <div className="sticky top-0 z-50 flex flex-col">
              <SearchBarWithSuggestions setButtonBorderBold={makeButtonBorderBold} setButtonBorderNormal={makeButtonBorderNormal} />
            <div className="w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] mx-auto mt-12 md:mt-14">
            {((isUserSignedIn.isUserSignedIn===true && (username.VipUserName === "nmd" || username.VipUserName === "mave")) && (
            
              <AddClanPraise buttonBorderState={isbuttonBorderBold} />
            
            )
            )}
            </div>
          </div>
  )}