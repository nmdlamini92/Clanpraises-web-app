"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useAsync } from "../hooks/useAsync"
import { getPosts, getUsers } from "../services/posts"
//import { Link, useNavigate } from 'react-router-dom';
import Link from 'next/link';
import AddClanPraise from './AddClanPraise';

const SearchBarWithSuggestions = () => {

  //const navigate = useNavigate(); 

  const inputRef = useRef(null);

  const [fetchedPosts, setFetchedPosts] = useState();
 
  const [isPostsNull, setIsPostsNull] = useState(true);
  const [postsLength, setPostsLength] = useState();
  const [query, setQuery] = useState("");

  //const users = getUsers();
 // console.log(users);

  useEffect(() => {
    
    getPosts()
      .then((data) => {
        console.log(data);
        setFetchedPosts(data); 
        setPostsLength(data.length);
    })
      .catch((error) => console.error(error)) // Handle any errors
      .finally(() => {
      
      })
  }, []);

  
  console.log(fetchedPosts);
  //console.log(fetchedPosts);
  console.log(postsLength);

  //localStorage.setItem('AllClanPraisesInDB', JSON.stringify({ AllClanPraisesList: fetchedPosts}));
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('AllClanPraisesInDB', JSON.stringify({ AllClanPraisesList: fetchedPosts}));
    }
  }, [fetchedPosts]);


  // State for search input and filtered suggestions
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsObj, setSuggestionsObj] = useState();
  const [storedSugg, setStoredSugg] = useState([]);
  
  const [suggestionsLinks, setSuggestionsLinks] = useState([]);
  const [ArrayList, setArrayList] = useState();
  const [ArrayListWithSugg, setArrayListWithSugg] = useState();
  const [ArrayListUnique, setArrayListUnique] = useState();
  const [allClanNamesInDB, setAllClanNamesInDB] = useState();
  const [ArrayLength, setArrayLength] = useState();
  const [selectedClanID, setSelectedClanID] = useState();
  const [rightClickedSuggestion, setRightClickedSuggestion] = useState();
  // Handler for search input changes

  const handleFocus = () => {
    console.log('Input box clicked!');

    //console.log(fetchedPosts);
    //console.log(fetchedPosts.post);
    
    //setIsActive(true);  // Change the state to active
    setArrayList(fetchedPosts)
    setArrayLength(postsLength)

    if (query) {              // Only show suggestions if there is input
      console.log(query);

      const uniquePosts = removeSimilarObjects(fetchedPosts, 'title', 'tribe');
      const SuggFormat = uniquePosts.map(item => `${item.title} (${item.tribe})`.toLowerCase());
      const uniPostsWithSugg = addStringsToObjects(uniquePosts, SuggFormat, 'suggestion')

      const DropDown1 = uniPostsWithSugg.map(item => item.suggestion);
      //setAllClanNamesInDB(DropDown1);
      //const DropDown = [...new Set(DropDown1.map(str => str.toLowerCase()))];
      

      setSearchTerm(query);

        if (query.length > 0) {
          const filteredSuggestions = DropDown1.filter(item =>
          item.toLowerCase().includes(query.toLowerCase())
            );
          setSuggestions(filteredSuggestions);
        } 
        else {
        setSuggestions([]);
        }  
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
          setSuggestions([]);           // Hide suggestions when clicked outside
      }
    }
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  function removeSimilarObjects(arr, key1, key2) {
    const uniquePairs = new Set();
    console.log(arr);
    
    return arr.filter(obj => {
      const pair = `${obj[key1].toLowerCase()}-${obj[key2].toLowerCase()}`;
      
      if (uniquePairs.has(pair)) {
        // If the pair already exists, filter this object out
        return false;
      }
      // Add the pair to the set and keep this object
      uniquePairs.add(pair);
      return true;
    });
  }

  function addStringsToObjects(objectsArray, stringsArray, newKey) {
    // Ensure the lengths of both arrays are the same
    if (objectsArray.length !== stringsArray.length) {
      throw new Error("The length of the objects array and strings array must be the same.");
    }
  
    // Iterate over both arrays in parallel and add the corresponding string to each object
    return objectsArray.map((obj, index) => ({
      ...obj,              // Spread the original object properties
      [newKey]: stringsArray[index]  // Add the new key with the corresponding string
    }));
  }

  const handleInputChange = (event) => {

    //const uniqueArr = ensureUniqueBySecondValue(ArrayList);
    const uniqueArr = removeSimilarObjects(ArrayList, 'title', 'tribe');

    console.log(uniqueArr);
    const uiqueArrLowerCase1 = uniqueArr.map(obj => ({...obj, title: obj.title.toLowerCase(), tribe: obj.tribe.toLowerCase()}));
    console.log(uiqueArrLowerCase1);

    const DropDown1 = ArrayList.map(item => `${item.title} (${item.tribe})`.toLowerCase());

    ArrayList.forEach(post => {
        post.suggestion = `${post.title} (${post.tribe})`.toLowerCase();
    });
    console.log(ArrayList);
    setArrayListWithSugg(ArrayList);
    console.log(ArrayList.map(item => item.suggestion));

    console.log(DropDown1);
    setAllClanNamesInDB(DropDown1);

    const DropDown = [...new Set(DropDown1.map(str => str.toLowerCase()))];
    console.log(DropDown);
    setStoredSugg(DropDown);

    uniqueArr.forEach(post => {
      post.suggestion = `${post.title} (${post.tribe})`.toLowerCase();
    });
    console.log(uniqueArr);


    const uiqueArrLowerCase = addStringsToObjects(uiqueArrLowerCase1, DropDown, 'suggestion');
    console.log(uiqueArrLowerCase);
    console.log(uiqueArrLowerCase);
    setArrayListUnique(uiqueArrLowerCase);
    console.log(ArrayListUnique);

    const input = event.target.value;
    setSearchTerm(input);
    setQuery(input);

    if (input.length > 0) {
      const filteredSuggestions = DropDown.filter(item =>
        item.toLowerCase().includes(input.toLowerCase())
      );
      const filteredUniArrayWithSugg = uiqueArrLowerCase.filter(item =>
          item.suggestion.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setSuggestionsObj(filteredUniArrayWithSugg);
      console.log(filteredSuggestions);
      console.log(filteredUniArrayWithSugg);
      //console.log(filteredUniArrayWithSugg[2].id);

      const filteredItems = uiqueArrLowerCase.filter(item => filteredSuggestions.includes(item.suggestion));
      setRightClickedSuggestion(filteredItems);
      //setFilteredSugg(filteredItems);
      console.log(filteredItems);

      const links = linksToSuggestions(filteredSuggestions, DropDown1, uiqueArrLowerCase);
      setSuggestionsLinks(links);
      console.log(links);
    } else {
      setSuggestions([]);
    }
  };

  const linksToSuggestions = (arrayToCheck, referenceArray, objectList) => {
    
    return arrayToCheck.map(item1 => {
      const count = referenceArray.filter(refItem => refItem === item1).length;
      console.log(count);
      const matchedObject = objectList.find(item => item.suggestion === item1);   //Object.values(item.suggestion)
      console.log(matchedObject);
      if (count>1){
        return `/${matchedObject.tribe}/${matchedObject.title}`;
      }
      else{
        return `/${matchedObject.tribe}/${matchedObject.title}/${matchedObject.id}`;
      }
    });
  };

  // Clear the search and suggestions when an item is selected
  const handleSuggestionClick = (suggestion) => {

    console.log(suggestion);
    setSearchTerm(suggestion);
    setSuggestions([]); // Clear suggestions after selection

   
    console.log(ArrayListUnique);
    console.log(allClanNamesInDB);

    const matchedObject = ArrayListUnique.find(item => item.suggestion === suggestion);   //Object.values(item)[4]
    const isSuggestionManyInDB = (allClanNamesInDB.filter(item => item === suggestion).length) > 1;
    console.log(isSuggestionManyInDB);
    console.log(matchedObject);
    console.log(matchedObject.id);
    console.log(matchedObject.title.replace(/\s+/g, ''));
    setSelectedClanID(matchedObject.id);

    if (!isSuggestionManyInDB){
      localStorage.setItem('selectedClanName&Tribe', JSON.stringify({
        selectedClanName: matchedObject.title,
        selectedTribe: matchedObject.tribe,
        AllClanPraisesInDB: ArrayList,
        id: matchedObject.id
    }));
      window.location.href = `/${matchedObject.tribe}/${matchedObject.title}/${matchedObject.id}`;
    }
    else{
      localStorage.setItem('selectedClanName&Tribe', JSON.stringify({
        selectedClanName: matchedObject.title,
        selectedTribe: matchedObject.tribe,
        AllClanPraisesInDB: ArrayList,
        id: matchedObject.id
    }));
      window.location.href = `/${matchedObject.tribe}/${matchedObject.title}`;
    }
    
    //window.location.reload();
    
  };
              

  const handleRightClick = (e, suggestion) => {
    const matchedObject = ArrayListUnique.find(item => item.suggestion === suggestion);  //Object.values(item)[4]
    console.log(matchedObject);
    //setRightClickedSuggestion(matchedObject);
    console.log(rightClickedSuggestion);
    //console.log(rightClickedSuggestion[2].title)

    localStorage.setItem('selectedClanName&Tribe', JSON.stringify({
      selectedClanName: matchedObject.title,
      selectedTribe: matchedObject.tribe,
      AllClanPraisesInDB: ArrayList,
      id: matchedObject.id
  }));
  //setSelectedClanNamexTribe({selectedClanName: matchedObject.title, selectedTribe: matchedObject.tribe, AllClanPraisesInDB: ArrayList})
  //console.log(selectedClanNamexTribe);
  }
                          //w-[300px] mx-auto absolute left-0 right-0
  return (              //style={{width: '300px', margin: '0 auto', position: 'absolute',  left: 0, right: 0,}}
    
    <>
    <div ref={inputRef} className="w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] mx-auto absolute left-0 right-0">
      <input
        type="text"
        placeholder="search Clan Name..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        className="w-full p-2 md:p-2 lg:p-3 rounded border border-yellow-600 box-border bg-orange-50"
        //onBlur={console.log('clicked')}
        //style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc',boxSizing: 'border-box',}}
      />
      {suggestions.length > 0 && (
        <ul
          style={{listStyleType: 'none', padding: '0', margin: '5px 0', border: '1px solid #ca8a04', borderRadius: '4px',
            backgroundColor: '#fff', maxHeight: '150px', overflowY: 'auto', zIndex: 100, top: '100%', left: 0, right: 0,
          }}
        >
          {suggestions.map((suggestion, index) => (
              <Link key={index} href={suggestionsLinks[index]} state={{selectedClanName: suggestion.title, //rightClickedSuggestion[index].title, 
              selectedTribe: suggestion.tribe,//rightClickedSuggestion[index].tribe,
              AllClanPraisesInDB: ArrayList}}> 
              
            <li className="dropdown-item bg-orange-50"
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              onContextMenu={(e) => handleRightClick(e, suggestion)} 
              style={{padding: '3px', cursor: 'pointer', borderBottom: '1px solid #ca8a04',}}
            >
            {suggestion} 
            </li>
            </Link>
          )) 
          }
        </ul>
      )}
    </div>
    </>
  );
};

export default SearchBarWithSuggestions;