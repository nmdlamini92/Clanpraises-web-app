import { useState } from "react";

export default function FormattedParagraphs({ text, pageIndex, PostFullText, pagesTextArray, onLineClick, definitions }) {

  console.log(definitions)
  //console.log(pageIndex)

  const formattedLines = text
    .split(/\n\s*\n/) // split by blank lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleLineClick = (line, index, pageIndex) => {
    onLineClick({ line, index, pageIndex });
    setActiveIndex(null);
  };

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
              lineIndex={index}
              text={line}
              pageText={text}
              pageIndex={pageIndex}
              PostFullText={PostFullText}
              //pagesTextArray={pagesTextArray}
              numOfDefinitions={definitions.filter(
                (definition) => definition.index === index && definition.page === pageIndex
              ).length}
              //pageOfDifinition={definition.page}
              isActive={activeIndex === index}
              onHover={() => setActiveIndex(index)}
              onLeave={() => setActiveIndex(null)}
              onClick={() => handleLineClick(line, index, pageIndex)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Line({
  text,
  pageText,
  pageIndex,
  lineIndex,
  PostFullText,
  //pagesTextArray,
  numOfDefinitions,
  isActive,
  onHover,
  onLeave,
  onClick,
}) {

  console.log(numOfDefinitions)
  //console.log(PostFullText.split(/(?=^.*?page\s+\d+.*\n\s*draft of .*? by R\. Mdvumowencwala PATRICKS, Museum, Lobamba)/m)[pageIndex])
  //console.log(pageIndex)
  //console.log(text)

  return (
    <p
      className={`px-0.5 py-0 my-0 rounded-sm cursor-pointer transition-all duration-200 w-fit text-[12px] sm:text-[14px] md:text-[14px] lg:text-[15px] ${
        isActive
          ? "bg-amber-100"
          : numOfDefinitions > 0 //&& PostFullText.split(/(?=^.*?page\s+\d+.*\n\s*draft of .*? by R\. Mdvumowencwala PATRICKS, Museum, Lobamba)/m)[pageIndex].includes(text)
          ? "bg-gray-300/30"
          : ""
      }`}
      style={{
        display: "inline-block",
        whiteSpace: "pre-wrap", // ✅ preserves multi-line formatting
        textAlign: "left",
        fontFamily: "Microsoft PhagsPa",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onTouchStart={onHover}
      onTouchEnd={onLeave}
      onClick={onClick}
    >
      {text}
    </p>
  );
}
