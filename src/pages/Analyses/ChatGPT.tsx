import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { postConversation } from "store/actions/chatGpt";
import icon_send from "assets/icon/icon_send.svg";
import classNames from "classnames";

export default function ChatGPT(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();
  const { showChat, isShowFullChat, fileUploadId, setShowChat, setIsShowFullChat } = props;

  const [message, setMessage] = useState<string>("")
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const [conversation] = useAppSelector((state) => [
    state.conversation.conversation,
  ]);

  useEffect(() => {
    setShowLoading(false);
    setMessage("")
  }, [conversation])

  const handleCloseChat = () => {
    setShowChat(false);
  }

  const handleSendMessage = () => {
    setShowLoading(true);
    dispatch(postConversation(fileUploadId, message.trim()));
  }

  return (
    <div className={classNames("chat-content", {"full-chat" : isShowFullChat})}>
      <i
        className="fa fa-times icon-close"
        aria-hidden="true"
        onClick={handleCloseChat}
      ></i>
      {!isShowFullChat
        ? <i
          className="fa-solid fa-expand icon-expand"
          onClick={() => setIsShowFullChat(true)}
        />
        : <i 
        className="fa-solid fa-minus icon-expand" 
        onClick={() => setIsShowFullChat(false)}
      />}
      <div className={classNames("conversation", {"height-full" : isShowFullChat})}>
        {conversation?.map(item => {
          return (
            <div key={item.uuid}>
              <p className="question">
                <label className="question-content">{item.question}</label>
              </p>
              <p className="answer">
                <label className="answer-content">{item.answer}</label>
              </p>
            </div>
          )
        })}
        {showChat && showLoading &&
          <>
            <p className="question">
              <label className="question-content">{message}</label>
            </p>
            <div className="dot-container">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </>
        }
      </div>
      <div className="area-input">
        <button
          type="submit"
          onClick={handleSendMessage}
          className="iconSend"
          disabled={props.isDisabled}
        >
          <img src={icon_send} alt="" />
        </button>
        <input
          type="text"
          className="field-input form-control"
          value={showLoading ? "" : message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(event) => {
            event.key === 'Enter' && handleSendMessage()
          }}
        />
      </div>
    </div>
  )
}
