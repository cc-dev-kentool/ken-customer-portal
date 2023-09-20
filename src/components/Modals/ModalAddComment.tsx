import { title_modal } from "constants/projects";
import "./style.css";

export default function ModalAddInstruction(props) {
  const { title, value, setComment, isDisabled, isReason = false} = props;

  return (
    <div>
      {title === title_modal.instruction && (
        <p>
          {" "}
          Please include any testing instructions or reporting requirements
          below.
        </p>
      )}
      <label className="lableComment">{isReason ? "Reason" : "Comment"}</label>
      {isReason && <span className="required"> *</span>}
      <textarea
        rows={10}
        className="form-control rounded-0 textarea"
        defaultValue={value}
        onChange={(e) => setComment(e.target.value.trim() || null)}
        disabled={isDisabled}
      />
    </div>
  );
}
