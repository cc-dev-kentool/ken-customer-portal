import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { postConversation } from "store/actions/chatGpt";
import icon_send from "assets/icon/icon_send.svg";

export default function ChatGPT(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();
  const { showChat, fileUploadId, setShowChat } = props;

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
    <div className="chat-content">
      <i
        className="fa fa-times icon-close"
        aria-hidden="true"
        onClick={handleCloseChat}
      ></i>
      <div className="conversation">
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
