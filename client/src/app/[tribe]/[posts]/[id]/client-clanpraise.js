//'use client';
//import React from "react";
import Header1 from "../../../../components/Header1";
import HeaderSmallScrn from "../../../../components/HeaderSmallScrn";
import SearchBarWithSuggestions from "../../../../components/SearchBar";
import { PostProvider } from "../../../../contexts/PostContext";
import { Post } from "../../../../components/Post";
import AddClanPraise from "../../../../components/AddClanPraise";

export default function ClanPraiseClient() {
  return (
      <>
        <div className="flex flex-col mb-6">
        <div className="hidden md:block">
      <Header1/>
      </div>
      <div className="md:hidden">
      <HeaderSmallScrn/>
      </div>
          <div className="flex flex-col mt-8">
            <div>
              <SearchBarWithSuggestions />
            </div>
            <div className="w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] mx-auto mt-12 md:mt-14">
              <AddClanPraise />
            </div>
            <div className="mt-8">
              <PostProvider>
                <Post />
              </PostProvider>
            </div>
          </div>
        </div>
      </>
  );
}
