import { Button, Modal } from "react-bootstrap";
import { useEffect, useRef } from "react";
import "./style.css";

/**
 * The popup dialog.
 * @param param0
 * @returns
 */
type Props = {
  // Boolean variable to determine if the dialog is shown or not.
  isShow: boolean,

  // A string variable to store the title of the dialog.
  title: string,

  // Any variable to store the content of the dialog. It can be of any type.
  content: any,

  // Any variable to store the label of the first button. It can be of any type.
  firstLabelButon: any,

  // Any variable to store the label of the second button. It can be of any type.
  seconLabelButton: any,

  // Callback function to handle click events on the first button.
  handleFirstButtonCalback: any,

  // Callback function to handle click events on the second button.
  handleSeconButtonCalback: any,

  // Optional boolean variable to enable/disable the second button.
  enableSecondButton?: boolean

  // Optional boolean variable to determine if the second button should be shown or not.
  showSecondButton?: boolean,

  // Optional string variable to add custom classes to the dialog component.
  customizedClass?: string,

  // Optional string variable to add custom classes to the content of the dialog.
  modalContentClass?: string,

  // Optional string variable to specify the size of the dialog.
  size?: string,

  // Optional boolean variable to determine if the close icon should be shown or not.
  showIconClose?: boolean,
}

export function PopupDialog(props: Props) {
  const {
    isShow,
    title,
    content,
    firstLabelButon,
    seconLabelButton,
    handleFirstButtonCalback,
    handleSeconButtonCalback,
    enableSecondButton = true,
    showSecondButton = true,
    customizedClass = "",
    modalContentClass = "modal-instruction",
    size = "xl",
    showIconClose = true,
  } = props
  const grBtnRef: any = useRef(null);

  // Return html dialog modal.
  return (
    <Modal
      show={isShow}
      size={size === "xl" ? "xl" : size === "sm" ? "sm" : "lg"}
      dialogClassName={`${customizedClass} modal-dialog-centered`}
      contentClassName={`${modalContentClass} modalContent`}
    >
      <Modal.Header className="modalHeader">
        <Modal.Title className="titlePopup">
          {title}
          {showIconClose && <i
            className="fa fa-times btn-Colse"
            aria-hidden="true"
            onClick={handleFirstButtonCalback}
          ></i>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
        <div className="btnPopup item-content-center" ref={grBtnRef}>
          {firstLabelButon && (
            <Button
              onClick={handleFirstButtonCalback}
              className="btnCancel rounded-0"
            >
              {firstLabelButon}
            </Button>
          )}
          {(seconLabelButton && showSecondButton) && (
            <Button
              onClick={handleSeconButtonCalback}
              className="btnSubmitPopup"
              disabled={!enableSecondButton}
            >
              {seconLabelButton}
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
