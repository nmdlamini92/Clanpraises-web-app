import React, { useState, useEffect, useRef } from "react";

export default function HighlightableTex33 ({ text }) {
  //console.log(text);
  const [selectedWord, setSelectedWord] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const paragraphRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const [isWordValid, setIsWordValid] = useState(true);

  const [lyrics, setLyrics] = useState();

  //console.log(text);
  //setLyrics(text);

  const convertToString = (elements) => {
    return elements.map((element) => element.props.children).join(' ');
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    console.log(selection);
    const selectedText = selection.toString().trim();

    //const lyrics = "This is a paragraph of text. Try selecting, \"individual\" words, welu'hlanga ";
    console.log(text);
    console.log(selectedText);


    //const range1 = selection.getRangeAt(0);
    //console.log(range1);
    //const startIndex1 = range1.startOffset;
    //const endIndex1 = range1.endOffset;
    //console.log(startIndex1);
    //console.log(text[startIndex1]);
    //console.log(text[selection.focusOffset - 1]);

    // Extract word before and after the selection
    //const wordStart1 = text.slice(0, startIndex1).split(/\s+/).pop();
    //const wordEnd1 = text.slice(endIndex1).split(/\s+/)[0];
    //console.log(wordStart1);
    //console.log(wordEnd1);

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      console.log(range);
      //const seleText = selectedText.split(" ");
      //console.log(seleText);
      const seleTextNoComma = selectedText.replace(/[.",]/g, "");
      console.log(seleTextNoComma);
      const splitText = seleTextNoComma.trim().split(/\s+/);
      console.log(splitText);
      const isSingleWord = seleTextNoComma.trim().split(/\s+/).length === 1;

     
      const stringJsx = convertToString(text);
      //console.log(stringJsx);
      const cleanlyrics = stringJsx.replace(/[.",]/g, "");
      console.log(cleanlyrics);
      const isFullWord = cleanlyrics.match(new RegExp(`\\b${splitText}\\b`)) !== null;
      const isNotclick = splitText[0] !== "";
      console.log(isNotclick);
      //const isInParagraph = paragraphRef.current.contains(range.commonAncestorContainer);
      //const isInParagraph = paragraphRef.current.contains();
     
      
     
      console.log(isWordValid);
      // Show menu only if one word is selected and is fully highlighted
      //if (isSingleWord && isInParagraph && isWordFullyHighlighted(selection, range, lyrics)) {
        //if (isSingleWord && isWordFullyHighlighted(selection, range, lyrics)) {
        if ((isSingleWord && isFullWord) && isNotclick) {
        setSelectedWord(splitText);
        setMenuVisible(true);
        const rect = range.getBoundingClientRect();
        setMenuPosition({ top: rect.top + window.scrollY, left: rect.left });
      } else {
        setMenuVisible(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div>
      <p ref={paragraphRef}>{text}</p>
      {menuVisible && (
        <div
          style={{
            //position: "absolute",
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            background: "white",
            border: "1px solid black",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          <span>Define: {selectedWord}</span>
        </div>
      )}
    </div>
  );
};