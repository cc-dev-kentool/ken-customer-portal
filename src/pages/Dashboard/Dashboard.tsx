import AdminLayout from "layouts/Admin";
import "./style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { searchPlugin } from "@react-pdf-viewer/search";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { ScrollMode } from "@react-pdf-viewer/core";
import { useState } from "react";
import { Button } from "react-bootstrap";

// Define a function called "Dashboard" which receives a single parameter called "props"
export function Dashboard(props) {
  const [url, setUrl] = useState("");
  const searchPluginInstance = searchPlugin();
  const { highlight } = searchPluginInstance;
  const [key, setKey] = useState("");
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const [data, setData] = useState([
    {
      key: "governing_law",
      name: "Governing law",
      comment: "",
      source: "",
      status: "",
    },
  ]);

  const onHighlight = () => {
    highlight([
      {
        keyword: key,
        matchCase: true,
      },
    ]);
  };

  const columns = [
    {
      title: "Topic",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const onChange = (e) => {
    const files = e.target.files;
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };
  // Return the following JSX
  return (
    // Wrap all elements inside an AdminLayout component
    <AdminLayout routeName={props.routeName}>
      {/* Start of container */}
      <div className="container-fluid-padding-default">
        <Row>
          <Col sm={4}>
            <input type="file" accept=".pdf" onChange={onChange} />
            {url ? (
              <div>
                Highlight text:{" "}
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
                <Button
                  variant="success"
                  style={{ marginTop: "10px" }}
                  onClick={onHighlight}
                >
                  Click to Highlight
                </Button>
              </div>
            ) : null}
          </Col>
          <Col sm={8}>
            <div>
              {url ? (
                <div id="div_iframe">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
                    <div
                      className="rpv-core__viewer"
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          backgroundColor: "#eeeeee",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                          display: "flex",
                          padding: "4px",
                        }}
                      >
                        <Toolbar />
                      </div>
                      <div
                        style={{
                          flex: 1,
                          overflow: "hidden",
                        }}
                      >
                        <Viewer
                          fileUrl={url}
                          plugins={[
                            toolbarPluginInstance,
                            searchPluginInstance,
                          ]}
                          scrollMode={ScrollMode.Vertical}
                        />
                        ;
                      </div>
                    </div>
                  </Worker>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
}
