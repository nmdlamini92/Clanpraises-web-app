'use client';
//import React from "react";
import Header1 from "../../../../components/Header1";
import HeaderSmallScrn from "../../../../components/HeaderSmallScrn";
import SearchBarWithSuggestions from "../../../../components/SearchBar";
import { PostProvider } from "../../../../contexts/PostContext";
import { Post } from "../../../../components/Post";
import AddClanPraise from "../../../../components/AddClanPraise";
import Footer from "../../../../components/Footer";
import FooterMobile from "../../../../components/FooterMobile";
import AddNsearchBar from "../../../../components/AddClanNsearchBar";


export default function ClanPraiseClient() {
  return (
      <>
      <div className="flex flex-col min-h-screen">
      <div className="flex flex-col mb-6 flex-grow">
        <div className="hidden md:block">
          <Header1/>
        </div>
        <div className="md:hidden">
          <HeaderSmallScrn/>
        </div>
        <div className="flex flex-col mt-8">
          <AddNsearchBar/>
          <div className="mt-8">
            <PostProvider>
            <Post/>
            </PostProvider>
          </div>
        </div>
          {/*<div className="flex justify-center mt-8 sm:mt-14 md:mt-14 lg:mt-8">
            <SendFeedback/>
          </div>*/}
      </div>
      <div className="hidden md:block mt-8 md:mt-12">
        <Footer />
      </div>
      <div className="md:hidden mt-8 md:mt-12">
        <FooterMobile />
      </div>
      </div>
      </>
  );
}
