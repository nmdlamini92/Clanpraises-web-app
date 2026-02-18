"use client"

import Validations from "./Validations";
import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { getTribes, getClanNames } from "../services/posts";
import { useAsync } from "../hooks/useAsync";
import dynamic from "next/dynamic"; 
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill (fixes SSR issues in Next.js)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AddClanPraiseForm() {
  const clanNameRef = useRef(null);
  const tribeRef = useRef(null);

  const { loading, error, value: TribesList } = useAsync(getTribes);
  const { loading1, error1, value: ClanNamesList } = useAsync(getClanNames);
  const [isLoading, setIsLoading] = useState(false);

  const [queryClanName, setQueryClanName] = useState("");
  const [queryTribe, setQueryTribe] = useState("");
  const [searchTerm_ClanName, setSearchTerm_ClanName] = useState('');
  const [searchTerm_Tribe, setSearchTerm_Tribe] = useState('');
  const [suggestionsClanName, setSuggestionsClanName] = useState([]);
  const [suggestionsTribe, setSuggestionsTribe] = useState([]);
  const [clanNameListDropdown, setClanNameListDropdown] = useState();
  const [tribeListDropdown, setTribeListDropdown] = useState([]);
  const [tribesArray, setTribesArray] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [values, setvalues] = useState({ clanName: "", tribe: "", clanPraise: "" });
  const [errors, setErrors] = useState({ clanName: "", tribe: "", clanPraise: "" });

  // --- your existing logic stays as is (handleFocus, handleClickOutside, etc.) ---
  // (I won’t rewrite all of it here for brevity since it’s unchanged)

  // 🔹 Replace textarea with ReactQuill
  const handleClanPraiseChange = (content) => {
    setvalues({ ...values, clanPraise: content }); // content is HTML string
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("All Cookies:", cookies);
    console.log(values);

    const tribeId = tribesArray.find(
      (tribe) => tribe.tribe.toLowerCase() === values.tribe.toLowerCase()
    )?.id ?? null;

    const validationError = Validations.addClanPraiseValidations(values);

    if (validationError) {
      setErrors(validationError);
      setIsLoading(false);
    } else {
      setErrors({ clanName: "", tribe: "", clanPraise: "" });
      try {
        const response = await axios.post(
          `${apiUrl}/addclanpraise`,
          { ...values, tribeId: tribeId },
          { withCredentials: true }
        );

        if (response.data.status) {
          const ArrayList = JSON.parse(localStorage.getItem("AllClanPraisesInDB"));
          localStorage.setItem(
            "selectedClanName&Tribe",
            JSON.stringify({
              selectedClanName: response.data.clanPraisePost.title,
              selectedTribe: response.data.clanPraisePost.tribe,
              AllClanPraisesInDB: ArrayList,
              id: response.data.clanPraisePost.id,
            })
          );
          window.location.href = `/${response.data.clanPraisePost.tribe}/${response.data.clanPraisePost.title}/${response.data.clanPraisePost.id}`;
        } else {
          setErrors("error - no response");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error while adding clan praise:", error);
      }
    }
  };

  return (
    <>
      <br />
      <div className="bg-amber-600/20 p-3 border rounded border-amber-500">
        <form onSubmit={handleSubmit}>
          {/* --- clanName + tribe inputs unchanged --- */}

          <div className="flex flex-col">
            <label className="mb-1">Clan Praise (Rich Text)</label>
            <ReactQuill
              theme="snow"
              value={values.clanPraise}
              onChange={handleClanPraiseChange}
              className="border rounded border-amber-500 bg-white"
              placeholder="Paste or write literature here..."
            />
            {errors.clanPraise && (
              <span className="error-msg text-xs">{errors.clanPraise}</span>
            )}
          </div>

          <button
            className={`mt-2 p-1 px-2 border-black ${
              isLoading ? "bg-amber-200" : "bg-amber-400"
            }`}
            type="submit"
          >
            {isLoading ? "Loading..." : "Add Literature"}
          </button>
        </form>
      </div>
    </>
  );
}
