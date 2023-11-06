import { Worker, Viewer, ScrollMode } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";
import { ToolbarSlot, TransformToolbarSlot, toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { useEffect } from "react";
import JumpToPagePlugin from '../../components/JumpToPagePlugin';
import close from "assets/icon/icon_close.svg";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

// Define a function component named "PdfDocument" and receive a single parameter called "props"
export default function PdfDocument(props) {
  // Destructure the "url", "valueSearch", and "setShowPdf" props from the "props" object
  const { url, isJump, pageNumber, valueSearch, setShowPdf, setIsJump } = props;

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
      // ShowSearchPopover: () => <></>,
      NumberOfPages: () => <span className="text-white">/ <NumberOfPages /></span>
    }
  }

  // Create an instance of the toolbar plugin and get the renderDefaultToolbar and Toolbar components
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  // Create an instance of the search plugin and get the highlight method
  const searchPluginInstance = searchPlugin();
  const { highlight } = searchPluginInstance;

  const jumpToPagePluginInstance = JumpToPagePlugin();
  const { jumpToPage } = jumpToPagePluginInstance;

  useEffect(() => {
    if (isJump) {
      jumpToPage(pageNumber)
      setIsJump(false);
    }
  }, [isJump])

  // Define an onHighlight function that takes a value to search for and highlights it
  const onHighlight = (searchText) => {
    const pages = document.querySelectorAll('.rpv-core__page-layer');

    let includedText = "";
    let includeElements: any = [];
    pages.forEach(page => {
      const textLayer = page.querySelector('.rpv-core__text-layer');
      if (textLayer) {
        const paragraphs = textLayer.children;
        let spanValue = "";

        for (let i = 0; i < paragraphs.length; i++) {
          let element = paragraphs[i];

          if (element.tagName.toLocaleLowerCase() === 'br') {
            spanValue += " ";
          } else {
            spanValue += element.innerHTML
          }
        }

        if (spanValue.includes(searchText)) {
          includeElements.push(textLayer.innerHTML);
          includedText = spanValue;
        }
      }
    });

    highlight([
      {
        keyword: valueSearch,
        matchCase: true,
      },
    ]);
  };

  // Use the useEffect hook to perform the highlight when the valueSearch changes
  useEffect(() => {
    if (valueSearch) {
      onHighlight(valueSearch);
    }
  }, [valueSearch])

  // Return the following JSX
  return (
    <div>
      {url && (
        <Worker workerUrl="assets/js/pdf.worker.min.js">
          <div className="component-pdf">
            <div className="header-pdf" >
              <Toolbar>{renderDefaultToolbar(transform)}</Toolbar><br />
              <div className="btn-closePdf">
                <img src={close} alt="" onClick={() => setShowPdf(false)} />
              </div>
            </div>
            <div className="content-pdf">
              <Viewer
                fileUrl={url}
                plugins={[
                  toolbarPluginInstance,
                  searchPluginInstance,
                  jumpToPagePluginInstance
                ]}
                scrollMode={ScrollMode.Vertical}
              />
            </div>
          </div>
        </Worker>
      )}
    </div>
  );
}
