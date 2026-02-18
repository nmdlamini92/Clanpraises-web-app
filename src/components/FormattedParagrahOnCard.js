import { useState } from "react";

export default function FormattedParagraphOnCard({ text }) {
  const formattedLines = text
    .split(/\n\s*\n/) // split by blank lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (
    <div className="flex flex-col items-start justify-center bg-transparent w-fit h-fit whitespace-pre-wrap font-mono text-sm text-left max-w-2xl mx-auto ">
    {/*<div className="flex flex-col items-start justify-center p-4 bg-transparent w-fit h-fit min-w-[200px] max-w-[500px]">*/}
      {formattedLines.map((line, index) => (
        <div key={index} className="">
          {index === 0 ? (
            // First paragraph → not clickable
            <p
              className="text-[6px] sm:text-[6.5px] md:text-[7px] lg:text-[8px] w-fit h-fit italic mb-2 mt-2 leading-none"
              style={{
                //whiteSpace: "pre-wrap",
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
              
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Line({
  text,
  lineIndex,
}) {
  return (
    <p
      className="px-0.5 py-0 my-0 rounded-sm cursor-pointer leading-none transition-all duration-200 w-fit text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px]"
       
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


