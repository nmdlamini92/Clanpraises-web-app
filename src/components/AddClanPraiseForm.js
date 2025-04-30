import Validations from "./Validations";
import { useState, useEffect, useRef} from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { getTribes, getClanNames } from "../services/posts";
import { useAsync} from "../hooks/useAsync";



export default function AddClanPraiseForm() {

  const clanNameRef = useRef(null);
  const tribeRef = useRef(null);

  const { loading, error, value: TribesList } = useAsync(getTribes)
  const { loading1, error1, value: ClanNamesList } = useAsync(getClanNames)

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

      const handleFocus_ClanName = () => {

        const dropdownClanNames = [...new Set(ClanNamesList.map(clanName => clanName.title.toLowerCase()))]

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
        const dropdownTribe = [...new Set(TribesList.map(tribe => tribe.tribe.toLowerCase()))]

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
          setSuggestionsClanName(filteredSuggestions)
        } else {
          setSuggestionsClanName([]);
        }
      }

      const handleInputChange_Tribe = (e) => {
        //(e) => setvalues({ ...values, [e.target.name]: e.target.value })
        const input = e.target.value;
        setvalues({ ...values, ['tribe']: e.target.value })
        setSearchTerm_Tribe
        
        (input);
        setQueryTribe(input);

        if (input.length > 0) {
          const filteredSuggestions = tribeListDropdown.filter(item => item.toLowerCase().includes(input.toLowerCase()));
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
        console.log("All Cookies:", cookies);
        console.log(values);

        console.log(tribesArray)

        const tribeId = tribesArray.find(
          tribe => tribe.tribe.toLowerCase() === values.tribe.toLowerCase()
        )?.id ?? 'iua63833-bwi7-hwy3-n3i3-nwk343n32e4j';
        
        console.log(tribeId)

        const validationError = Validations.addClanPraiseValidations(values);

        if (validationError){
          setErrors(validationError);
        }
        else{
          setErrors({clanName:"", tribe:"", clanPraise:""});
          console.log(values);
          try {
              const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/addclanpraise`,
                {...values, tribeId: tribeId},{withCredentials: true}
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
                console.log(response.data);
                setErrors(response.data.errors)
              }
            } 
          catch (error) {
            console.error("Error while adding clan praise:", error);
          }
        }
      };

    return (
      <>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="ClanNamenTribe">
                <div ref={clanNameRef} style={{ margin: '0 auto', position: 'relative', left: 0, right: 0,}}>
                  <input className="ClanNameInput" name="clanName" placeholder="Clan name"  //value={values.clanName || ""}  
                    onChange={handleInputChange_ClanName}
                    onFocus={handleFocus_ClanName}
                    value={searchTerm_ClanName}
                    />
                  {errors.clanName && (<span className="error-msg">{errors.clanName}</span>)}
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
                                style={{padding: '0px', cursor: 'pointer', borderBottom: '1px solid #ddd',}}
                              >
                              {suggestion} 
                              </li>
                            )) 
                            }
                          </ul>
                        )}
                </div>
                <div ref={tribeRef} style={{ margin: '0 auto', position: 'relative', left: 0, right: 0,}}>
                  <input className="TribeInput" name="tribe" placeholder="Tribe"        //value={values.tribe || ""}  
                    onChange={handleInputChange_Tribe}
                    onFocus={handleFocus_Tribe}
                    value={searchTerm_Tribe}
                  />
                  {errors.tribe && (<span className="error-msg">{errors.tribe}</span>)}
                  {suggestionsTribe.length > 0 && (
                          <ul
                            style={{listStyleType: 'none', position: 'absolute', padding: '0', margin: '5px 0', border: '1px solid #ccc', borderRadius: '4px',
                              backgroundColor: '#fff', maxHeight: '150px', overflowY: 'auto', zIndex: 100, top: '100%', left: 0, right: 0,
                            }}
                          >
                            {suggestionsTribe.map((suggestion, index) => (
                              <li className="dropdown-item"
                                key={index}
                                onClick={() => handleTribe_SuggestionClick(suggestion)}
                                style={{padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ddd',}}
                              >
                              {suggestion} 
                              </li>
                            )) 
                            }
                          </ul>
                        )}
                </div>
                </div>
                <div>
                  <textarea className="ClanPraiseInput" name="clanPraise" placeholder="Clan praise" value={values.clanPraise || ""}  
                    onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                  />
                  {errors.clanPraise && (<span className="error-msg">{errors.clanPraise}</span>)}
                </div>
                <button type="submit">Add Clan Praise</button>
              </form>
            </div>
      </>
    );
  };