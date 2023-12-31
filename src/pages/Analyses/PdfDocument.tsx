import { Worker, Viewer, ScrollMode, MinimalButton, Position, Tooltip } from "@react-pdf-viewer/core";
import { searchPlugin, RenderSearchProps, NextIcon, PreviousIcon } from "@react-pdf-viewer/search";
import { ToolbarSlot, TransformToolbarSlot, toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { useEffect, useState } from "react";
import { add as addAlert, remove } from "store/actions/alert";
import { useAppDispatch } from "hooks";
import closePdf from "assets/icon/icon_close.svg";
import iconSearch from "assets/icon/icon_search.svg";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Define a function component named "PdfDocument" and receive a single parameter called "props"
export default function PdfDocument(props) {
  const dispatch = useAppDispatch();
  // Destructure the "url", "valueSearch", and "setShowPdf" props from the "props" object
  const { url, valueSearch, setShowPdf, setValueSearch } = props;

  // Define a transform function for the TransformToolbarSlot type
  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => {
    const { NumberOfPages } = slot;
    return {
      ...slot,
      EnterFullScreen: () => <></>,
      SwitchTheme: () => <></>,
      GoToPreviousPage: () => <></>,
      GoToNextPage: () => <></>,
      Open: () => <></>,
      ShowSearchPopover: () => <></>,
      NumberOfPages: () => <span className="text-white">/ <NumberOfPages /></span>
    }
  }

  // Create an instance of the toolbar plugin and get the renderDefaultToolbar and Toolbar components
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  // Create an instance of the search plugin and get the highlight method
  const searchPluginInstance = searchPlugin();
  const { highlight, clearHighlights, Search } = searchPluginInstance;

  const [contentPdf, setContentPdf] = useState<any>([]);

  // Calculates the length of a given string and continuously divides it by 2 until it is less than or equal to 100
  function calcLength(searchText) {
    let len = searchText.length;
    while (len > 100) {
      len = len / 2;
    }

    return len;
  }

  function getEndIndex(text, endIndex) {
    let newEnd = endIndex;
    for (let i = endIndex; i < text.length; i++) {
      if (text.charAt(i) === ' ') {
        newEnd = i;
        break;
      }
    }
    return newEnd;
  }

  // Splits a given text into smaller sentences based on the calculated length
  function splitSentence(text: string) {
    let startIndex = 0;
    const len = calcLength(text);

    let result: any = [];
    while (startIndex < text.length) {
      let endIndex = startIndex + len < text.length ? startIndex + len : text.length;
      const newEnd = getEndIndex(text, endIndex);

      result.push(text.substring(startIndex, newEnd));
      startIndex = newEnd + 1;
    }

    result = result.map((item, index) => {
      if (index === result.length - 1 && item.charAt(item.length - 1) === '.') {
        return item.slice(0, -1);
      }
      return item;
    });

    return result;
  }

  // Searches for a given sentence in the contentPdf array using a regular expression created from the search text
  function searchSentence(searchText) {
    // Make a regex from the needle...
    let regex = "";
    // ..split the needle into words...
    const words = searchText.trim().split(/\s+/);

    function getRightChar(charVal) {
      const specialChars = ['(', ')', '[', ']', '.', ',', ';'];
      return specialChars.find(p => p === charVal) ? "\\" + charVal : charVal;
    }

    for (let i = 0; i < words.length; i++) {
      const word = words[i].trim();

      // ...allow HTML tags after each character except the last one in a word...
      for (let i = 0; i < word.length; i++) {
        regex += getRightChar(word.charAt(i)) + "((<.+?>|[ .()\n<>,;])?)*";
      }

      // ...allow a mixture of whitespace and HTML tags after each word except the last one
      regex += "(([ .()\n<>,;])?)";

      if (i < words.length - 1) {
        regex += "+";
      }
    }

    const result: any = [];

    // Iterate through each page in the contentPdf array
    contentPdf.forEach(pageText => {
      const matches = pageText.match(regex);

      if (matches && matches.length > 0) {
        result.push(matches[0]);
      } else {
        result.push(null);
      }
    });

    return result;
  }

  // Defines an onHighlight function that splits the search text into smaller sentences,
  // searches for each sentence using searchSentence function,
  // and highlights the found text using the highlight function
  const onHighlight = (searchText) => {
    const sentencesArr = splitSentence(searchText.trim());
    const foundTextArr: any = [];
    let isFounded = false;

    for (let i = 0; i < sentencesArr.length; i++) {
      const actualTexts = searchSentence(sentencesArr[i]);
      foundTextArr.push(actualTexts);
    }

    if (foundTextArr.length > 0 && sentencesArr.length > 0) {
      const totalPage = foundTextArr[0].length;
      const actualTextArr: any = [];

      for (let i = 0; i < totalPage; i++) {
        let actualText = "";
        let isIgnore = false;

        for (let j = 0; j < sentencesArr.length; j++) {
          const textItem = foundTextArr[j][i];

          if (!textItem) {
            isIgnore = true;
            break;
          }

          actualText += textItem;
        }

        if (!isIgnore) {
          actualTextArr.push(actualText);
        }
      }

      actualTextArr.forEach(element => {
        dispatch(remove())
        highlight([
          {
            keyword: element.replace(/\s+/g, ' '),
            matchCase: true,
          },
        ]);
        scrollToHighlight()
        isFounded = true;
      });
    }

    if (!isFounded && valueSearch) {
      clearHighlights();
      dispatch(
        addAlert("The sentence is not found in the document!", "danger")
      );
      setTimeout(() => {
        dispatch(remove())
      }, 5000);
    }

    setValueSearch("");
  }

  const scrollToHighlight = () => {
    window.scrollTo(0, 0);
  };

  // Uses the useEffect hook to perform the highlight when the valueSearch changes
  useEffect(() => {
    if (valueSearch) {
      onHighlight(valueSearch);
    }
  }, [valueSearch])

  // Handles the document load success event and extracts the text content from each page of the document
  const onDocumentLoadSuccess = async (doc) => {
    const totalNumPages = doc.doc.numPages;
    let pdfContent: any = [];

    const pdfDoc = doc.doc;
    const render_options = {
      normalizeWhitespace: false,
      disableCombineTextItems: false
    };

    for (let i = 0; i < totalNumPages; i++) {
      let pageText = '';
      const page = await pdfDoc.getPage(i + 1);
      const textContent = await page.getTextContent(render_options);

      textContent.items.forEach((item) => {
        pageText += item.str; // Concatenate text content
      });

      pdfContent.push(pageText)
    }

    setContentPdf(pdfContent)
  }

  const [showPopup, setShowPopup] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    // Get the click position
    const posX = e.pageX;
    const posY = e.pageY;

    // Update the state with the new position
    setClickPosition({ x: posX, y: posY });

    // Show the popup
    setShowPopup(!showPopup);

    // Clear highlighting
    clearHighlights();
  };

  const contentPopupSearch = () => {
    return (
      <div
        className="pop-search"
        style={{
          top: `${clickPosition.y + 15}px`,
          left: `${clickPosition.x}px`,
        }}
      >
        <div className="rpv-core__arrow rpv-core__arrow--bl rpv-core__popover-body-arrow"></div>
        <Search>
          {(renderSearchProps: RenderSearchProps) => {
            const [readyToSearch, setReadyToSearch] = useState(false);
            return (
              <>
                <div className="d-flex m-1">
                  <input
                    className="inputSearch"
                    placeholder="Enter to search"
                    type="text"
                    value={renderSearchProps.keyword}
                    onChange={(e) => {
                      setReadyToSearch(false);
                      if (e.target.value) {
                        renderSearchProps.setKeyword(e.target.value);
                      } else {
                        renderSearchProps.clearKeyword();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && renderSearchProps.keyword) {
                        renderSearchProps.search();
                        setTimeout(() => { setReadyToSearch(true); }, 1500)

                      }
                    }}
                  />
                  {(readyToSearch && renderSearchProps.keyword) && (
                    renderSearchProps.numberOfMatches > 0 ?
                      <div className="result">
                        {`${renderSearchProps.currentMatch}/${renderSearchProps.numberOfMatches}`}
                      </div> :
                      <div className="result">Not found</div>
                  )}
                </div>

                <div className="d-flex">
                  <Tooltip
                    position={Position.BottomCenter}
                    target={
                      <MinimalButton onClick={renderSearchProps.jumpToPreviousMatch}>
                        <PreviousIcon />
                      </MinimalButton>
                    }
                    content={() => 'Previous match'}
                    offset={{ left: 0, top: 8 }}
                  />
                  <Tooltip
                    position={Position.BottomCenter}
                    target={
                      <MinimalButton onClick={renderSearchProps.jumpToNextMatch}>
                        <NextIcon />
                      </MinimalButton>
                    }
                    content={() => 'Next match'}
                    offset={{ left: 0, top: 8 }}
                  />
                  <button className="btnCloseSearch" onClick={handleContextMenu}>Close</button>
                </div>
              </>
            );
          }}
        </Search>
      </div>
    )
  }

  return (
    <div>
      {url && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
          <div className="component-pdf">
            <div className="header-pdf" >
              <img src={iconSearch} alt="search" onClick={handleContextMenu} className="icon-search" />
              {showPopup && contentPopupSearch()}
              <Toolbar>{renderDefaultToolbar(transform)}</Toolbar><br />
              <div className="btn-closePdf">
                <img src={closePdf} alt="" onClick={() => setShowPdf(false)} />
              </div>
            </div>
            <div className="content-pdf">
              <Viewer
                fileUrl={url}
                plugins={[
                  toolbarPluginInstance,
                  searchPluginInstance,
                ]}
                scrollMode={ScrollMode.Vertical}
                onDocumentLoad={onDocumentLoadSuccess}
              />
            </div>
          </div>
        </Worker>
      )}
    </div>
  );
}
