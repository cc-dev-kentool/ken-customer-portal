import { Worker, Viewer, ScrollMode } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";
import { ToolbarSlot, TransformToolbarSlot, toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { useEffect } from "react";
import close from "assets/icon/icon_close.svg";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function PdfDocument(props) {
  const { url, valueSearch, setShowPdf } = props;

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

  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const searchPluginInstance = searchPlugin();
  const { highlight } = searchPluginInstance;

  const onHighlight = (valueSearch) => {
    highlight([
      {
        keyword: valueSearch,
        matchCase: true,
      },
    ]);
  };

  useEffect(() => {
    if (valueSearch) {
      onHighlight(valueSearch);
    }
  }, [valueSearch])

  return (
    <div>
      {url && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
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
