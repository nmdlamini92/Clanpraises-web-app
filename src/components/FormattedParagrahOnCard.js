import { useState } from "react";
import { FaScroll } from "react-icons/fa";
import { IconBtn } from "./IconBtn";
import { usePost } from "../contexts/PostContext"


function Line({ text, lineIndex, isActive }) {

  //console.log(numOfDefinitions)

  //const lineDefinitions = postDefinitions.filter(definition => definition.index === lineIndex)
  //console.log(lineDefinitions)
  //console.log(lineDefinitions.length)

  return (
    <p
      className={`px-1 py-0 my-0 rounded-sm cursor-pointer transition-all duration-200 w-fit text-[12px] sm:text-sm text-stone-900 flex justify-center ${
        isActive ? "bg-amber-100/50" : ""      //bg-amber-200 : bg-slate/50
      }`}
      style={{
        display: "inline-block",  // Shrink to fit content, even when wrapped
        whiteSpace: "normal",     // Allow line wrapping
        textAlign: "center",      // Center multi-line text
      }}
      //onMouseEnter={onHover}
      //onMouseLeave={onLeave}
      //onTouchStart={onHover}
      //onTouchEnd={onLeave}
      //onClick={onClick}
    >
      {text}
    </p>
  );
}

export default function FormattedParagraph({ text}) {

  //const rootDefinitions = [] = usePost()

  //console.log(definitions)
  // Split the text into separate lines based on punctuation marks
  const formattedLines = text
    .split(/(?<=[.,!\n])/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Track the currently hovered/touched line
  const [activeIndex, setActiveIndex] = useState(null);
  //const [clickedIndex, setClickedIndex] = useState(null);

  /*const handleLineClick = (line, index) => {
    // Trigger the callback passed as prop and pass line data
    onLineClick({line: line, index: index});

    // Reset the active line after the alert
    setActiveIndex(null);
  };*/

  return (
    //className="flex flex-col items-center justify-center h-full p-4">
      <div className="flex flex-col items-center justify-center p-1 bg-transparent w-fit h-fit min-w-[200px] max-w-[500px]"> {/*border border-violet-500 h-full*/}

      {formattedLines.map((line, index) => (
        <div key={index} className="flex items-center justify-center">
    
        <Line className = "mt-0 mb-0 flex items-center justify-center "
          key={index}
          lineIndex={index}
          text={line}
          //postDefinitions={definitions}
          //numOfDefinitions={definitions}
          isActive={activeIndex === index }
          //onHover={() => setActiveIndex(index)}
          //onLeave={() => setActiveIndex(null)}
          //onClick={() => handleLineClick(line, index)}
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

