import { Worker, Viewer } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";
import { ToolbarSlot, TransformToolbarSlot, toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { ScrollMode } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import { Button } from "react-bootstrap";
// import { useState } from "react";

export default function PdfDocument(props) {
  const { url } = props;

  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    EnterFullScreen: () => <></>,
    SwitchTheme: () => <></>,
    GoToPreviousPage: () => <></>,
    GoToNextPage: () => <></>,
    Rotate: () => <></>,
    Search: () => <></>,
    Download: () => <></>,
  })

  const searchPluginInstance = searchPlugin();
  // const { highlight } = searchPluginInstance;

  // const [key, setKey] = useState("");

  // const onHighlight = () => {
  //   highlight([
  //     {
  //       keyword: key,
  //       matchCase: true,
  //     },
  //   ]);
  // };

  return (
    <div className="pdf-document">
      {url && (
        <div id="div_iframe">
          {/* <div className="p-3">
            Highlight text:{" "}
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <Button
              variant="success"
              style={{ marginLeft: "10px" }}
              onClick={onHighlight}
            >
              Click to Highlight
            </Button>
            rpv-core__viewer
          </div> */}
          

          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div className="component-pdf">
              <div className="header-pdf" >
                <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
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
        </div>
      )}
    </div>
  );
}
