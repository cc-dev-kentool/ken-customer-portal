import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { postConversation } from "store/actions/chatGpt";
import { CircularProgress } from "@mui/material";
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
  const [heightTextarea, setHeightTextarea] = useState(30);
  const [heightConversation, setHeightConversation] = useState(0);

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
  }, [dataConversation.length, isSendMessage, isShowFullChat])

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

  const elementCon = document.getElementById('chat-content')?.scrollHeight
  useEffect(() => {
    if (elementCon) {
      setHeightConversation(elementCon - 80)
    }
  }, [elementCon, isShowFullChat])

  const handleExpandChat = () => {
    setIsShowFullChat(!isShowFullChat);
    setHeightTextarea(0);
    setHeightConversation(0);
  }

  const handleMouseDown = (e) => {
    const startY = e.clientY;
    const startHeight = heightTextarea;
    const maxHeight = isShowFullChat ? 400 : 100

    const doMouseMove = (e) => {
      const newHeight = startHeight - (e.clientY - startY);
      const height = Math.max(newHeight > maxHeight ? maxHeight : newHeight, 30);
      setHeightTextarea(height);
      let element = document.getElementById('chat-content')?.scrollHeight
      element && setHeightConversation(element - (height + 50))
    };

    const doMouseUp = () => {
      document.removeEventListener('mousemove', doMouseMove);
      document.removeEventListener('mouseup', doMouseUp);
    };

    document.addEventListener('mousemove', doMouseMove);
    document.addEventListener('mouseup', doMouseUp);
  };


  return (
    <div id={"chat-content"} className={classNames("chat-content", { "full-chat": isShowFullChat })}>
      <i
        className="fa fa-times icon-close"
        aria-hidden="true"
        onClick={handleCloseChat}
      ></i>
      <i
        className={`fa-solid ${isShowFullChat ? 'fa-minus' : 'fa-expand'}  icon-expand`}
        onClick={handleExpandChat}
      />
      <div id="conversation" className="conversation" style={{ height: `${heightConversation}px` }}>
        {dataConversation?.map(item => {
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
        <div className="resize-icon" onMouseDown={handleMouseDown}>⇱</div>
        <textarea
          className="field-input form-control"
          value={showLoading ? "" : message}
          onChange={(e) => onChangeTextarea(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ height: `${heightTextarea}px` }}
        >
        </textarea>
        {/* Sends the message when the send button is clicked */}
        <button
          type="submit"
          onClick={handleSendMessage}
          className={classNames("iconSend", { "disabled-icon-send": isDisabledBtnSend })}
          disabled={isDisabledBtnSend}
        >
          <img src={icon_send} alt="" />
        </button>
      </div>

      {!isSendMessage && !getConversationSuccess &&
        <div className="text-center iconLoading"><CircularProgress color="inherit" /></div>
      }

    </div>
  )
}
