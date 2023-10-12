import classNames from "classnames";

export default function ChatGPT(props) {
    const { isShowMaxHeight, setIsShowMaxHeight} = props;
    return (
      <div className={classNames("chat-content", {"d-none" : isShowMaxHeight})}>
        <i className="fa-solid fa-xmark icon-close" onClick={() => setIsShowMaxHeight(true)}></i>
        <p className="title-chat">Connect to ChatGPT</p>
      </div>
    );
  }
  