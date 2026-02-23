"use client"

import Validations from "./Validations";
import { useState, useEffect, useRef} from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { getTribes, getClanNames } from "../services/posts";
import { useAsync} from "../hooks/useAsync";

/*const apiUrl = typeof window !== 'undefined'
  ? window.env?.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_API_URL;*/
const apiUrl = process.env.NEXT_PUBLIC_API_URL


export default function AddClanPraiseForm() {

  const clanNameRef = useRef(null);
  const tribeRef = useRef(null);

  const { loading, error, value: TribesList } = useAsync(getTribes)
  const { loading1, error1, value: ClanNamesList } = useAsync(getClanNames)
  const [isLoading, setIsLoading] = useState(false);

    const [queryClanName, setQueryClanName] = useState("");
    const [queryTribe, setQueryTribe] = useState("");
    const [searchTerm_ClanName, setSearchTerm_ClanName] = useState('');
    const [searchTerm_Tribe, setSearchTerm_Tribe] = useState('')
    const [suggestionsClanName, setSuggestionsClanName] = useState([])  //USE URL FOR STATE MANAGEMENT  *prince kyle*
    const [suggestionsTribe, setSuggestionsTribe] = useState([])        //USE REACT HOOK FORM for FORM STATE MANAGEMENT

    const[clanNameListDropdown, setClanNameListDropdown] = useState()
    const[tribeListDropdown, setTribeListDropdown] = useState([])
    const [tribesArray, setTribesArray] = useState([])

    const [cookies, setCookie, removeCookie] = useCookies([]);

      const [values, setvalues] = useState({clanName:"", tribe:"", clanPraise:""});
      const [errors, setErrors] = useState({clanName:"", tribe:"", clanPraise:""});

      const [values2, setvalues2] = useState({location:"", related:"", forbidden_foods:"", englishVersion: "", siswatiVersion:""});

      const handleFocus_ClanName = () => {

        const dropdownClanNames = [...new Set(ClanNamesList.map(clanName => clanName.title.toLowerCase()))]
        //const dropdownClanNames = [...new Set(ClanNamesList.map(clanName => clanName.title.toLowerCase()))]

        setClanNameListDropdown(dropdownClanNames)

        if (queryClanName) {              // Only show suggestions if there is input
          console.log(queryClanName);
          setSearchTerm_ClanName(queryClanName);

          if (queryClanName.length > 0) {
            const filteredSuggestions = dropdownClanNames.filter(item =>
            item.toLowerCase().includes(queryClanName.toLowerCase())
              );
            setSuggestionsClanName(filteredSuggestions);
          } 
          else {
          setSuggestionsClanName([]);
          }  
        }
      }

      const handleFocus_Tribe = () => {
        //const dropdownTribe = [...new Set(TribesList.map(tribe => tribe.tribe.toLowerCase()))]
        const dropdownTribe = [...new Set(TribesList.map(tribe => tribe.tribe))]

        setTribeListDropdown(dropdownTribe)
        setTribesArray(TribesList)

        if (queryTribe) {              // Only show suggestions if there is input
          console.log(queryTribe);
          setSearchTerm_Tribe(queryTribe);

          if (queryTribe.length > 0) {
            const filteredSuggestions = dropdownTribe.filter(item =>
            item.toLowerCase().includes(queryTribe.toLowerCase())
              );
            setSuggestionsTribe(filteredSuggestions);
          } 
          else {
          setSuggestionsTribe([]);
          }  
        }
      }

      useEffect(() => {
      
        function handleClickOutside(event) {
          const clickedOutsideClan = clanNameRef.current && !clanNameRef.current.contains(event.target);
          const clickedOutsideTribe = tribeRef.current && !tribeRef.current.contains(event.target);

          if (clickedOutsideClan) {
            setSuggestionsClanName([]);
          }
          if (clickedOutsideTribe) {
            setSuggestionsTribe([]);
          }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);



      const handleInputChange_ClanName = (e) => {
        //(e) => setvalues({ ...values, [e.target.name]: e.target.value })
        const input = e.target.value;
        setvalues({ ...values, ['clanName']: e.target.value })
        setSearchTerm_ClanName(input);
        setQueryClanName(input);

        if (input.length > 0) {
          const filteredSuggestions = clanNameListDropdown.filter(item => item.toLowerCase().includes(input.toLowerCase()));
          //const filteredSuggestions = clanNameListDropdown.filter(item => item.includes(input));
          setSuggestionsClanName(filteredSuggestions)
        } else {
          setSuggestionsClanName([]);
        }
      }

      const handleInputChange_Tribe = (e) => {
        //(e) => setvalues({ ...values, [e.target.name]: e.target.value })
        //setErrors({clanName: null, tribe: null, clanPraise:errors.clanPraise});
        const input = e.target.value;
        setvalues({ ...values, ['tribe']: e.target.value })
        setSearchTerm_Tribe
        
        (input);
        setQueryTribe(input);

        if (input.length > 0) {
          //const filteredSuggestions = tribeListDropdown.filter(item => item.toLowerCase().includes(input.toLowerCase()));
          const filteredSuggestions = tribeListDropdown.filter(item => item.includes(input));
          setSuggestionsTribe(filteredSuggestions)
        } else {
          setSuggestionsTribe([]);
        }
      }

      const handleClanName_SuggestionClick = (suggestion) => {

        setvalues({...values, ['clanName']: suggestion })
        setSearchTerm_ClanName(suggestion);
        setSuggestionsClanName([])
        //console.log(values)
      }

      const handleTribe_SuggestionClick = (suggestion) => {

        setvalues({...values, ['tribe']: suggestion })
        setSearchTerm_Tribe(suggestion);
        setSuggestionsTribe([])
        //console.log(values)
      }
      
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("All Cookies:", cookies);
        console.log(values);

        console.log(tribesArray)

        const tribeId = tribesArray.find(
          tribe => tribe.tribe.toLowerCase() === values.tribe.toLowerCase()
        )?.id ?? null;
        
        console.log(tribeId)

        const validationError = Validations.addClanPraiseValidations(values);

        if (validationError){
          setErrors(validationError);
          setIsLoading(false);
        }
        else{
          setErrors({clanName:"", tribe:"", clanPraise:""});
          console.log(values);
          try {
              const response = await axios.post(`${apiUrl}/addclanpraise`,
                {...values, ...values2, tribeId: tribeId},{withCredentials: true}
              );
      
              if (response.data.status) {
                console.log(response);

                const ArrayList = JSON.parse(localStorage.getItem('AllClanPraisesInDB'));

                localStorage.setItem('selectedClanName&Tribe', JSON.stringify({
                  selectedClanName: response.data.clanPraisePost.title,
                  selectedTribe: response.data.clanPraisePost.tribe,
                  AllClanPraisesInDB: ArrayList,
                  id: response.data.clanPraisePost.id
                }));
                window.location.href = `/${response.data.clanPraisePost.tribe}/${response.data.clanPraisePost.title}/${response.data.clanPraisePost.id}`;
              } 
              if (!(response.data.status)) {
                console.log(response)
                console.log(response.data);
                setErrors("error - no response");
                setIsLoading(false);
              }
            } 
          catch (error) {
            console.error("Error while adding clan praise:", error);
          }
        }
      };

    return (
      <>
            <br></br>
            <div className="bg-amber-600/20 p-3 border rounded border-amber-500">
              <form onSubmit={handleSubmit}>
                <div className="flex mb-4 gap-2 w-[90%]">
                <div ref={clanNameRef} className="flex-1 mt-2 relative">
                  <div className="flex flex-col">
                  {<p className="error-msg text-xs">{errors.clanName}</p>}
                  <input className="w-full border rounded border-amber-500" name="clanName" placeholder="Title"  //value={values.clanName || ""}  
                    onChange={handleInputChange_ClanName}
                    onFocus={handleFocus_ClanName}
                    value={searchTerm_ClanName}
                    />
                    </div>
                  {suggestionsClanName.length > 0 && (
                          <ul
                            style={{listStyleType: 'none', position: 'absolute', padding: '0', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px',
                              backgroundColor: '#fff', maxHeight: '150px', overflowY: 'auto', zIndex: 100, top: '100%', left: 0, right: 0,
                            }}
                          >
                            {suggestionsClanName.map((suggestion, index) => (
                              <li className="dropdown-item bg-stone-50"
                                key={index}
                                onClick={() => handleClanName_SuggestionClick(suggestion)}
                                style={{padding: '0px', cursor: 'pointer', borderBottom: '1px solid #ca8a04',}}   //#ddd
                              >
                              {suggestion} 
                              </li>
                            )) 
                            }
                          </ul>
                        )}
                </div>
                <div ref={tribeRef} className="flex-1 mt-2 relative">
                  <div className="flex flex-col">
                  {<p className="error-msg text-xs">{errors.tribe}</p>}
                  <input className="w-full border rounded border-amber-500" name="tribe" placeholder="tribe"        //value={values.tribe || ""}  
                    onChange={handleInputChange_Tribe}
                    onFocus={handleFocus_Tribe}
                    value={searchTerm_Tribe}
                  />
                  </div>
                  {suggestionsTribe.length > 0 && (
                          <ul
                            style={{listStyleType: 'none', position: 'absolute', padding: '0', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px',
                              backgroundColor: '#fff', maxHeight: '150px', overflowY: 'auto', zIndex: 100, top: '100%', left: 0, right: 0,
                            }}
                          >
                            {suggestionsTribe.map((suggestion, index) => (
                              <li className="dropdown-item bg-stone-50"
                                key={index}
                                onClick={() => handleTribe_SuggestionClick(suggestion)}
                                style={{padding: '0px', cursor: 'pointer', borderBottom: '1px solid #ca8a04',}} //#ddd
                              >
                              {suggestion} 
                              </li>
                            )) 
                            }
                          </ul>
                        )}
                </div>
                </div>
                <div className="flex flex-col">
                  <textarea className="ClanPraiseInput border rounded border-amber-500" name="clanPraise" placeholder="Clanpraise..." value={values.clanPraise || ""}  
                    onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                  />
                  {errors.clanPraise && (<span className="error-msg text-xs">{errors.clanPraise}</span>)}
                  <textarea className="ClanPraiseInput mt-1 border rounded border-amber-500" name="englishVersion" placeholder="History/Info (english)..." value={values2.englishVersion}  
                    onChange={(e) => setvalues2({ ...values2, [e.target.name]: e.target.value })}
                  />
                  <textarea className="ClanPraiseInput mt-1 border rounded border-amber-500" name="siswatiVersion" placeholder="History/Info (siswati)..." value={values2.siswatiVersion}  
                    onChange={(e) => setvalues2({ ...values2, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <input className="w-full border rounded border-amber-500" name="location" placeholder="Location"        //value={values.tribe || ""}  
                    onChange={(e) => setvalues2({ ...values2, [e.target.name]: e.target.value })}
                    value={values2.location}
                  />
                  <input className="w-full border rounded border-amber-500" name="related" placeholder="Related"        //value={values.tribe || ""}  
                    onChange={(e) => setvalues2({ ...values2, [e.target.name]: e.target.value })}
                    value={values2.related}
                  />
                  <input className="w-full border rounded border-amber-500" name="forbidden_foods" placeholder="Forbidden-foods"        //value={values.tribe || ""}  
                    onChange={(e) => setvalues2({ ...values2, [e.target.name]: e.target.value })}
                    value={values2.forbidden_foods}
                  />
                </div>
                <button className={`mt-1 p-1 px-2  border-black ${isLoading ? "bg-amber-200" : " bg-amber-400"}`} 
                  type='submit'>{isLoading ? "Loading..." : "Add Literature"}</button>
              </form>
            </div>
      </>
    );
  };