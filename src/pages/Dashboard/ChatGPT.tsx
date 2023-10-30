import { useEffect, useState } from "react";
import { useAppSelector } from "hooks";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "langflow-chat": any;
    }
  }
}

export default function ChatGPT(props) {
  const { isShowFullSidebar } = props;
  const [filePath] = useAppSelector((state) => [state.analysis.filePath]);

  //Move to env variable later
  const getTweaks = () => {
    return {
      "RecursiveCharacterTextSplitter-2h57a": {},
      "OpenAIEmbeddings-NgnlA": {},
      "Chroma-5fJPZ": {},
      "ChatOpenAI-0PCKA": {},
      "CombineDocsChain-YGAcN": {},
      "RetrievalQA-zoGLL": {
        return_source_documents: false,
      },
      "PyPDFLoader-Uz4Cg": {
        file_path: filePath,
      },
    };
  };
  const [heightChat, setHeightChat] = useState<number>(
    document.body.scrollHeight - 300
  );
  const width = document.body.scrollWidth - 400;
  const [widthChat, setWidthChat] = useState<number>(width);

  useEffect(() => {
    window.addEventListener("resize", function () {
      setHeightChat(document.body.scrollHeight - 300);
      setWidthChat(document.body.scrollWidth - 400);
    });
  }, []);

  const sendIconStyle = {
    stroke: "#26ADC9",
  };

  const chatWindowStyle = {
    backgroundColor: "#26ADC9",
  };

  return (
    <div>
      {filePath &&
      (
        <langflow-chat
          flow_id={process.env.REACT_APP_LANGFLOW_ID}
          chat_inputs='{"input":""}'
          chat_input_field="query"
          tweaks={JSON.stringify(getTweaks())}
          chat_output_field="result"
          host_url={process.env.REACT_APP_LANGFLOW_HOST_URL}
          window_title=""
          style={{
            position: "absolute",
            bottom: "10px",
            left: `${isShowFullSidebar ? "270px" : "140px"}`,
            zIndex: 10,
          }}
          height={heightChat}
          width={widthChat}
          chat_position="top-right"
          send_icon_style={JSON.stringify(sendIconStyle)}
          chat_trigger_style={JSON.stringify(chatWindowStyle)}
          bot_message_style={JSON.stringify(chatWindowStyle)}
          user_message_style={JSON.stringify(chatWindowStyle)}
        />
      )}
    </div>
  );
}
