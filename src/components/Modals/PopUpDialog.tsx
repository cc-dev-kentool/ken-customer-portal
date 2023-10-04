import { Button, Modal } from "react-bootstrap";
import { useEffect, useRef } from "react";
import "./style.css";

/**
 * The popup dialog.
 * @param param0
 * @returns
 */
type Props = {
  // Is show flag.
  isShow: boolean,

  // The title.
  title: string,

  // The content of dialog.
  content: any,

  // The first label button.
  firstLabelButon: any,

  // The send label button.
  seconLabelButton: any,

  // Handler when click on the first button.
  handleFirstButtonCalback: any,

  // Handler when click on the second button.
  handleSeconButtonCalback: any,

  // enable second button flag.
  enableSecondButton?: boolean

  showSecondButton?: boolean,

  // Customized classes.
  customizedClass?: string,

  modalContentClass?: string,

  size?: string,

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
