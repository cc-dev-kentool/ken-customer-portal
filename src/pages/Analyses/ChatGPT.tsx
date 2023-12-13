import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { postConversation } from "store/actions/chatGpt";
import { CircularProgress } from "@mui/material";
import { progressText } from "helpers/until";
import icon_send from "assets/icon/icon_send.svg";
import classNames from "classnames";

export default function ChatGPT(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();
  const { isShowFullChat, fileUploadId, setShowChat, setIsShowFullChat } = props;

  const [message, setMessage] = useState<string>("")
  const [message2, setMessage2] = useState<string>("")
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [isDisabledBtnSend, setIsDisabledBtnSend] = useState<boolean>(true);
  const [dataConversation, setDataConversation] = useState<any>([]);

  // Retrieves the conversation array from the Redux store's state
  const [conversation, getConversationSuccess] = useAppSelector((state) => [
    state.conversation.conversation,
    state.conversation.getConversationSuccess,
  ]);

  // Effect hook to scroll to bottom of messages container whenever enquiry state changes.
  useEffect(() => {
    if (getConversationSuccess) {
      setShowLoading(false);
      setIsSendMessage(false);
      setDataConversation(conversation)
      setMessage("");
      setMessage2("");
      scrollToBottom();
    }
  }, [getConversationSuccess, conversation]);

  useEffect(() => {
    if (dataConversation.length > 0 || isSendMessage) {
      scrollToBottom();
    }
  }, [dataConversation.length, isSendMessage])

  const scrollToBottom = () => {
    const element = window.document.getElementById("conversation");
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }

  const handleCloseChat = () => {
    // Closes the chat window and sets isShowFullChat to false
    setShowChat(false);
    setIsShowFullChat(false);
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Sets loading state to true and dispatches a postConversation action with the fileUploadId and message value
      setShowLoading(true);
      setIsSendMessage(true);
      setIsDisabledBtnSend(true);
      dispatch(postConversation(fileUploadId, message.trim()));
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
      setMessage2(e.target.value.trim());
    }
  };

  const onChangeTextarea = (value) => {
    setMessage(value)
    value.trim() ? setIsDisabledBtnSend(false) : setIsDisabledBtnSend(true);
  }

  return (
    <div className={classNames("chat-content", { "full-chat": isShowFullChat })}>
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
      <div id="conversation" className={classNames("conversation", { "height-full": isShowFullChat })}>
        {dataConversation?.map(item => {
          return (
            // Renders each conversation item with question and answer labels
            <div key={item.uuid}>
              <p className="question">
                <label className="question-content">{progressText(item.question)}</label>
              </p>
              <p className="answer">
                <label className="answer-content">{progressText(item.answer)}</label>
              </p>
            </div>
          )
        })}
        {showLoading &&
          <>
            {/* Renders the user's message and a loading animation when showChat and showLoading are true */}
            <p className="question">
              <label className="question-content">{message2 || message}</label>
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
        {/* Sends the message when the send button is clicked */}
        <button
          type="submit"
          onClick={handleSendMessage}
          className={classNames("iconSend", {"disabled-icon-send" : isDisabledBtnSend})}
          disabled={isDisabledBtnSend}
        >
          <img src={icon_send} alt="" />
        </button>
        <textarea
          rows={isShowFullChat ? 2 : 1}
          className="field-input form-control"
          value={showLoading ? "" : message}
          onChange={(e) => onChangeTextarea(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {!isSendMessage && !getConversationSuccess &&
        <div className="text-center iconLoading"><CircularProgress color="inherit" /></div>
      }

    </div>
  )
}
