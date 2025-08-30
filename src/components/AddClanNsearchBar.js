'use client'
import SearchBarWithSuggestions from "./SearchBar";
import AddClanPraise from "./AddClanPraise";
import {useState} from 'react';

export default function AddNsearchBar() {

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


  return (
    <div className="sticky top-0 z-50 flex flex-col">
              <SearchBarWithSuggestions setButtonBorderBold={makeButtonBorderBold} setButtonBorderNormal={makeButtonBorderNormal} />
            <div className="w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] mx-auto mt-12 md:mt-14">
              <AddClanPraise buttonBorderState={isbuttonBorderBold} />
            </div>
          </div>
  )}