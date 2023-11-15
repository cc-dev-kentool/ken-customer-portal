import { Worker, Viewer, ScrollMode } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";
import { ToolbarSlot, TransformToolbarSlot, toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { useEffect, useState } from "react";
import { add as addAlert, remove } from "store/actions/alert";
import { useAppDispatch } from "hooks";
import closePdf from "assets/icon/icon_close.svg";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Define a function component named "PdfDocument" and receive a single parameter called "props"
export default function PdfDocument(props) {
  const dispatch = useAppDispatch();
  // Destructure the "url", "valueSearch", and "setShowPdf" props from the "props" object
  const { url, valueSearch, setShowPdf } = props;

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
  const { highlight, clearHighlights } = searchPluginInstance;

  const [contentPdf, setContentPdf] = useState<any>([])

  function calcLength(searchText) {
    let len = searchText.length;
    while (len > 100) {
      len = len / 2;
    }

    return len;
  }

  function splitSentence(text: string) {
    let startIndex = 0;
    const len = calcLength(text);

    const result: any = [];
    while (startIndex < text.length) {
      const endIndex = startIndex + len < text.length ? startIndex + len : text.length - 1;
      result.push(text.substring(startIndex, endIndex));
      startIndex += len;
    }

    return result;
  }

  function searchSentence(searchText) {
    // Make a regex from the needle...
    let regex = "";
    // ..split the needle into words...
    const words = searchText.trim().split(/\s+/);

    function getRightChar(charVal) {
      const specialChars = ['(', ')'];
      return specialChars.find(p => p === charVal) ? "\\" + charVal : charVal;
    }

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
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

  // Define an onHighlight function that takes a value to search for and highlights it
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
        // page i.
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
        highlight([
          {
            keyword: element.replace(/\s+/g, ' '),
            matchCase: true,
          },
        ]);
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
  }

  // Use the useEffect hook to perform the highlight when the valueSearch changes
  useEffect(() => {
    if (valueSearch) {
      onHighlight(valueSearch);
    }
  }, [valueSearch])

  const onDocumentLoadSuccess = async (doc) => {
    const totalNumPages = doc.doc.numPages;

    let pdfContent: any = [];

    const pdfDoc = doc.doc;

    const render_options = {
      //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      normalizeWhitespace: false,
      //do not attempt to combine same line TextItem's. The default value is `false`.
      disableCombineTextItems: false
    };

    // Loop through each page of the document
    for (let i = 0; i < totalNumPages; i++) {
      let pageText = '';

      const page = await pdfDoc.getPage(i + 1);

      // Extract text content from each page
      const textContent = await page.getTextContent(render_options);

      textContent.items.forEach((item) => {
        pageText += item.str; // Concatenate text content
      });

      pdfContent.push(pageText)

    }

    setContentPdf(pdfContent)
  }

  // Return the following JSX
  return (
    <div>
      {url && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
          <div className="component-pdf">
            <div className="header-pdf" >
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
