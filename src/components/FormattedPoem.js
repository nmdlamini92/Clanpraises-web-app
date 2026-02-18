import { useState } from "react";
import { FaScroll } from "react-icons/fa";
import { IconBtn } from "./IconBtn";
import { usePost } from "../contexts/PostContext"


export default function FormattedPoem({ text, onLineClick, definitions }) {

  //const rootDefinitions = [] = usePost()

  console.log(definitions)
  // Split the text into separate lines based on punctuation marks
  const formattedLines = text
    .split(/(?<=[.,!\n])/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Track the currently hovered/touched line
  const [activeIndex, setActiveIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleLineClick = (line, index) => {
    // Trigger the callback passed as prop and pass line data
    onLineClick({line: line, index: index, pageIndex: 0});

    // Reset the active line after the alert
    setActiveIndex(null);
  };

  return (
    //className="flex flex-col items-center justify-center h-full p-4">
      <div className="flex flex-col items-center justify-center p-4 bg-transparent w-fit h-fit min-w-[200px] max-w-[500px]"> {/*border border-violet-500 h-full*/}

      {formattedLines.map((line, index) => (
        <div key={index} className="flex items-center justify-center mb-0.5">
        <Line className = "flex items-center justify-center"
          key={index}
          lineIndex={index}
          text={line}
          //postDefinitions={definitions}
          numOfDefinitions={definitions.filter(definition => definition.index === index).length}
          isActive={activeIndex === index }
          onHover={() => setActiveIndex(index)}
          onLeave={() => setActiveIndex(null)}
          onClick={() => handleLineClick(line, index)}
        />
        {/*<IconBtn
          Icon={props => <FaScroll {...props} size={15} className="text-gray-300"/>} //className="text-gray-600"
          //onClick={handleClickDiscussionTab}
          style={{ marginLeft: 6 }}
          >
                     <p className="text-gray-500">{0}</p>
          </IconBtn>*/}
        </div>
      ))}
    </div>
  );
}

function Line({ text, lineIndex, numOfDefinitions, isActive, onHover, onLeave, onClick }) {

  console.log(numOfDefinitions)

  //const lineDefinitions = postDefinitions.filter(definition => definition.index === lineIndex)
  //console.log(lineDefinitions)
  //console.log(lineDefinitions.length)

  return (
    <p
      className={`px-0.5 py-0 my-0 rounded-sm cursor-pointer transition-all duration-200 w-fit text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] ${
        isActive ? "bg-amber-100" : numOfDefinitions>0? "bg-gray-300/30" : ""      //bg-amber-200 : bg-slate-50
      }`}
      style={{
        display: "inline-block",  // Shrink to fit content, even when wrapped
        whiteSpace: "normal",     // Allow line wrapping
        textAlign: "center",      // Center multi-line text
        fontFamily: "Microsoft PhagsPa" 
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