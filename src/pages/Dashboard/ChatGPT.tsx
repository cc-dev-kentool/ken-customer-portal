import classNames from "classnames";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "langflow-chat": any;
    }
  }
}

export default function ChatGPT(props) {
  const { isShowMaxHeight, setIsShowMaxHeight } = props;

  return (
    <div className={classNames("chat-content", { "d-none": isShowMaxHeight })}>
      <i className="fa-solid fa-xmark icon-close" onClick={() => setIsShowMaxHeight(true)}></i>
      <p className="title-chat">Connect to ChatGPT</p>
      <langflow-chat
        flow_id="90cabdee-c30c-4e0a-a4a9-9dbda30feb24"
        chat_inputs='{"input":""}'
        chat_input_field="input"
        host_url="https://dev-kentool-langflow.azurewebsites.net/"
        style={{ position: 'fixed', bottom: '10px', right: '20px', zIndex: 10 }}
      />
    </div>
  );
}
