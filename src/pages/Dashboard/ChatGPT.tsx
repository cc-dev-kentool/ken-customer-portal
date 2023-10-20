import classNames from "classnames";
import { useEffect, useState } from "react";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "langflow-chat": any;
    }
  }
}

export default function ChatGPT(props) {
  const { isShowPDF, isShowFullSidebar } = props;

  const [heightChat, setHeightChat] = useState<number>(document.body.scrollHeight - 300);
  const width = document.body.scrollWidth - 400
  const [widthChat, setWidthChat] = useState<number>(width);

  useEffect(() => {
    window.addEventListener('resize', function () {
      setHeightChat(document.body.scrollHeight - 300);
      setWidthChat(document.body.scrollWidth -400);
    });
  }, [])

  const sendIconStyle = {
    stroke: "#26ADC9"
  }

  const chatWindowStyle = {
    backgroundColor: "#26ADC9",
  }

  return (
    <div>
      <langflow-chat
        window_title=""
        flow_id="90cabdee-c30c-4e0a-a4a9-9dbda30feb24"
        chat_inputs='{"input":""}'
        chat_input_field="input"
        host_url="https://dev-kentool-langflow.azurewebsites.net/"
        style={{
          position: 'absolute',
          bottom: '10px',
          left: `${isShowFullSidebar ? '270px' : '140px'}`,
          zIndex: 10,
        }}
        height={heightChat}
        width={widthChat}
        chat_position='top-right'
        send_icon_style={JSON.stringify(sendIconStyle)}
        chat_trigger_style={JSON.stringify(chatWindowStyle)}
        bot_message_style={JSON.stringify(chatWindowStyle)}
        user_message_style={JSON.stringify(chatWindowStyle)}
      />
    </div>
  );
}
