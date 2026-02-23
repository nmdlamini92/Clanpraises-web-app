import { useState } from "react";

export default function FormattedParagraphsUnclickable({ text, pageIndex, PostFullText }) {

  //console.log(definitions)
  //console.log(pageIndex)

  const formattedLines = text
    .split(/\n\s*\n/) // split by blank lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

 

  return (
    <div className="flex flex-col items-start justify-center p-4 bg-transparent w-fit h-fit whitespace-pre-wrap font-mono text-sm text-left max-w-2xl mx-auto">
    {/*<div className="flex flex-col items-start justify-center p-4 bg-transparent w-fit h-fit whitespace-pre-wrap min-w-[200px] max-w-[500px]">*/}
      {formattedLines.map((line, index) => (
        <div key={index} className="mb-2">
          {index === 0 ? (
            // First paragraph → not clickable
            <p
              className="text-[6px] sm:text-[6.5px] md:text-[7px] lg:text-[8px] italic"
              style={{
                whiteSpace: "pre-wrap",
                //fontFamily: "Microsoft PhagsPa",
              }}
            >
              {line}
            </p>
          ) : (
            // Other paragraphs → clickable
            <Line
              key={index}
              
              text={line}
              pageText={text}
              pageIndex={pageIndex}
              PostFullText={PostFullText}
              //pagesTextArray={pagesTextArray}
              //pageOfDifinition={definition.page}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Line({text, 
  //pageText,
  //pageIndex,
  //lineIndex,
  //PostFullText,
  //pagesTextArray,
}) {

  const isInformationLine = /^information:/i.test(text.trim());

  return (
    <p
      //className={`px-0.5 py-0 my-0 rounded-sm cursor-pointer transition-all duration-200 w-fit text-[12px] sm:text-[14px] md:text-[14px] lg:text-[15px]`}
      className={`
        px-0.5 py-0 my-0 rounded-sm cursor-pointer transition-all duration-200 w-fit
        ${isInformationLine
          ? "text-[6px] sm:text-[6.5px] md:text-[7px] lg:text-[8px] italic whitespace-pre-wrap"
          : "text-[12px] sm:text-[14px] md:text-[14px] lg:text-[15px]"}
      `}
      style={{
        display: "inline-block",
        whiteSpace: "pre-wrap", // ✅ preserves multi-line formatting
        textAlign: "left",
        fontFamily: "Microsoft PhagsPa",
      }}
    >
      {text}
    </p>
  );
}
