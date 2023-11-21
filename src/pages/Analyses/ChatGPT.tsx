import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { postConversation } from "store/actions/chatGpt";
import { CircularProgress } from "@mui/material";
import icon_send from "assets/icon/icon_send.svg";
import classNames from "classnames";

export default function ChatGPT(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();
  const { showChat, isShowFullChat, fileUploadId, setShowChat, setIsShowFullChat } = props;

  const [message, setMessage] = useState<string>("")
  const [showLoading, setShowLoading] = useState<boolean>(false);

  // Retrieves the conversation array from the Redux store's state
  const [conversation, getConversationSuccess] = useAppSelector((state) => [
    state.conversation.conversation,
    state.conversation.getConversationSuccess,
  ]);

  useEffect(() => {
    // Resets loading state and message input when conversation changes
    setShowLoading(false);
    setMessage("")
  }, [conversation])

  const handleCloseChat = () => {
    // Closes the chat window and sets isShowFullChat to false
    setShowChat(false);
    setIsShowFullChat(false);
  }

  const handleSendMessage = () => {
    // Sets loading state to true and dispatches a postConversation action with the fileUploadId and message value
    setShowLoading(true);
    dispatch(postConversation(fileUploadId, message.trim()));
  }

  return (
    <div className={classNames("chat-content", { "full-chat": isShowFullChat })}>
      <i
        className="fa fa-times icon-close"
        aria-hidden="true"
        onClick={handleCloseChat}
      ></i>
      {getConversationSuccess
        ? <>
          {!isShowFullChat
            ? <i
              className="fa-solid fa-expand icon-expand"
              onClick={() => setIsShowFullChat(true)}
            />
            : <i
              className="fa-solid fa-minus icon-expand"
              onClick={() => setIsShowFullChat(false)}
            />}
          <div className={classNames("conversation", { "height-full": isShowFullChat })}>
            {conversation?.map(item => {
              return (
                // Renders each conversation item with question and answer labels
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
                {/* Renders the user's message and a loading animation when showChat and showLoading are true */}
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
            {/* Sends the message when the send button is clicked */}
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
        </>
        : <div className="text-center iconLoading"><CircularProgress color="inherit" /></div>
      }

    </div>
  )
}
