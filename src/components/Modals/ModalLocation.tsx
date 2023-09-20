import { yupResolver } from "@hookform/resolvers/yup";
import { emotionRegex } from "constants/regex";
import { onInputNumber } from "helpers/until";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LocationValidate } from "schema/project";
import "./../../pages/Project/style.css";

// Define an interface (Props) with properties that this component needs to receive
type Props = {
  isCreate: boolean; // Boolean variable indicating if a new dataLocation is being created
  isDisableEdit?: boolean; // Optional boolean variable indicating whether edit functionality is disabled
  showModal: boolean; // Boolean variable indicating if the modal should be shown
  dataLocation: any; // The data for the location being edited or created
  setDataLocation?: any; // Function to set the data for the location being edited or created
  setShowMoalLocation: any; // Function to show/hide the modal
  setIsUpdateLocation?: any; // Optional function to indicate if the dataLocation has been updated
};

// Create a functional component called 'ModalLocation' which takes in props conforming to the interface defined above
export default function ModalLocation(props: Props) {
  // Destructure values from 'useForm' hook into separate constants
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LocationValidate), // Validation schema used by 'useForm'
    defaultValues: { ...props.dataLocation }, // Defaults for the input elements based on existing data
  });

  // Function called when the save button is clicked
  const onSave = () => {
    // Update the dataLocation object with new values
    props.setDataLocation({
      location_id: getValues("location_id"),
      location_description: getValues("location_description"),
      location_data_e_degree: getValues("location_data_e_degree"),
      location_data_e_minute: getValues("location_data_e_minute"),
      location_data_e_second: getValues("location_data_e_second"),
      location_data_n_degree: getValues("location_data_n_degree"),
      location_data_n_minute: getValues("location_data_n_minute"),
      location_data_n_second: getValues("location_data_n_second"),
      location_level: getValues("location_level"),
      location_chainage: getValues("location_chainage"),
      location_offset: getValues("location_offset"),
      location_invalid: false,
    });

    props.setIsUpdateLocation(true); // Indicate to parent component that dataLocation has been updated
    props.setShowMoalLocation(false); // Hide the modal
  };

  return (
    <Modal
      show={props.showModal}
      dialogClassName="modal-location modal-dialog-centered"
      backdrop="static"
      keyboard={false}
      size="lg"
      contentClassName="modalContent"
    >
      {/* This component displays the header of a modal and contains a title with
      a close button */}
      <Modal.Header>
        {/* This is the title of the modal header */}
        <Modal.Title>
          {/* This is the main heading of the title */}
          <h3 className="text-center">Physical Location</h3>
          {/* This is the close icon which will call the function to hide the modal when clicked */}
          <i
            className="fa fa-times btnColse"
            aria-hidden="true"
            onClick={() => props.setShowMoalLocation(false)} // Function to hide the modal
          ></i>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* generate Form to get all information we need */}
        <form onSubmit={handleSubmit(onSave)} noValidate>
          <div className="form-group">
            <div className="invalid-feedback">
              {errors.location_id?.message}
            </div>
            <br />
            <strong>Description</strong>
            <textarea
              {...register("location_description")}
              disabled={!props.isCreate || props.isDisableEdit}
              className={`form-control rounded-0 inputLocationDes ${
                errors.location_description ? "is-invalid" : ""
              }`}
              onBlur={(e: any) =>
                setValue(
                  "location_description",
                  e.target.value.trim().replace(emotionRegex, "")
                )
              }
              name="location_description"
            />
            <div className="invalid-feedback">
              {errors.location_description?.message}
            </div>
            <br />
            <strong>Data</strong>
            <Row>
              <Col>
                <strong>E </strong>
                <input
                  type="number"
                  {...register("location_data_e_degree")}
                  onWheelCapture={(event) => event.currentTarget.blur()}
                  onBlur={(e: any) =>
                    setValue(
                      "location_data_e_degree",
                      e.target.value
                        .trim()
                        .replace(e.target.value.indexOf(".") !== 1 && /^0+/, "")
                        .replace(emotionRegex, "")
                    )
                  }
                  onKeyDown={(evt) => onInputNumber(evt)}
                  onPaste={(event) => {
                    event.preventDefault();
                  }}
                  className={`form-control rounded-0 inputData ${
                    errors.location_data_e_degree ? "is-invalid" : ""
                  }`}
                  disabled={!props.isCreate || props.isDisableEdit}
                  name="location_data_e_degree"
                />
                <strong> &deg; </strong>
                <input
                  type="number"
                  {...register("location_data_e_minute")}
                  onWheelCapture={(event) => event.currentTarget.blur()}
                  onBlur={(e: any) =>
                    setValue(
                      "location_data_e_minute",
                      e.target.value
                        .trim()
                        .replace(e.target.value.indexOf(".") !== 1 && /^0+/, "")
                        .replace(emotionRegex, "")
                    )
                  }
                  onKeyDown={(evt) => onInputNumber(evt)}
                  onPaste={(event) => {
                    event.preventDefault();
                  }}
                  className={`form-control rounded-0 inputData ${
                    errors.location_data_e_minute ? "is-invalid" : ""
                  }`}
                  disabled={!props.isCreate || props.isDisableEdit}
                  name="location_data_e_minute"
                />
                <strong> &prime; </strong>
                <input
                  type="number"
                  {...register("location_data_e_second")}
                  onWheelCapture={(event) => event.currentTarget.blur()}
                  onBlur={(e: any) =>
                    setValue(
                      "location_data_e_second",
                      e.target.value
                        .trim()
                        .replace(e.target.value.indexOf(".") !== 1 && /^0+/, "")
                        .replace(emotionRegex, "")
                    )
                  }
                  onKeyDown={(evt) => onInputNumber(evt)}
                  onPaste={(event) => {
                    event.preventDefault();
                  }}
                  className={`form-control rounded-0 inputData ${
                    errors.location_data_e_second ? "is-invalid" : ""
                  }`}
                  disabled={!props.isCreate || props.isDisableEdit}
                  name="location_data_e_second"
                />
                <strong> &Prime; </strong>
                <div className="invalid-feedback">
                  {errors.location_data_e_degree?.message}
                  {!errors.location_data_e_degree?.message &&
                    errors.location_data_e_minute?.message}
                  {!errors.location_data_e_degree?.message &&
                    !errors.location_data_e_minute?.message &&
                    errors.location_data_e_second?.message}
                </div>
              </Col>
              <Col>
                <strong>N </strong>
                <input
                  type="number"
                  {...register("location_data_n_degree")}
                  onWheelCapture={(event) => event.currentTarget.blur()}
                  onBlur={(e: any) =>
                    setValue(
                      "location_data_n_degree",
                      e.target.value
                        .trim()
                        .replace(e.target.value.indexOf(".") !== 1 && /^0+/, "")
                        .replace(emotionRegex, "")
                    )
                  }
                  onKeyDown={(evt) => onInputNumber(evt)}
                  onPaste={(event) => {
                    event.preventDefault();
                  }}
                  className={`form-control rounded-0 inputData ${
                    errors.location_data_n_degree ? "is-invalid" : ""
                  }`}
                  disabled={!props.isCreate || props.isDisableEdit}
                  name="location_data_n_degree"
                />
                <strong> &deg; </strong>
                <input
                  type="number"
                  {...register("location_data_n_minute")}
                  onWheelCapture={(event) => event.currentTarget.blur()}
                  onBlur={(e: any) =>
                    setValue(
                      "location_data_n_minute",
                      e.target.value
                        .trim()
                        .replace(e.target.value.indexOf(".") !== 1 && /^0+/, "")
                        .replace(emotionRegex, "")
                    )
                  }
                  onKeyDown={(evt) => onInputNumber(evt)}
                  onPaste={(event) => {
                    event.preventDefault();
                  }}
                  className={`form-control rounded-0 inputData ${
                    errors.location_data_n_minute ? "is-invalid" : ""
                  }`}
                  disabled={!props.isCreate || props.isDisableEdit}
                  name="location_data_n_minute"
                />
                <strong> &prime; </strong>
                <input
                  type="number"
                  {...register("location_data_n_second")}
                  onWheelCapture={(event) => event.currentTarget.blur()}
                  onBlur={(e: any) =>
                    setValue(
                      "location_data_n_second",
                      e.target.value
                        .trim()
                        .replace(e.target.value.indexOf(".") !== 1 && /^0+/, "")
                        .replace(emotionRegex, "")
                    )
                  }
                  onKeyDown={(evt) => onInputNumber(evt)}
                  onPaste={(event) => {
                    event.preventDefault();
                  }}
                  className={`form-control rounded-0 inputData ${
                    errors.location_data_n_second ? "is-invalid" : ""
                  }`}
                  disabled={!props.isCreate || props.isDisableEdit}
                  name="location_data_n_second"
                />
                <strong> &Prime; </strong>
                <div className="invalid-feedback">
                  {errors.location_data_n_degree?.message}
                  {!errors.location_data_n_degree?.message &&
                    errors.location_data_n_minute?.message}
                  {!errors.location_data_n_degree?.message &&
                    !errors.location_data_n_minute?.message &&
                    errors.location_data_n_second?.message}
                </div>
              </Col>
            </Row>
            <Row className="dataLCO">
              <Col>
                <strong>Level </strong>
                <input
                  type="number"
                  {...register("location_level")}
                  onWheelCapture={(event) => event.currentTarget.blur()}
                  onBlur={(e: any) =>
                    setValue(
                      "location_level",
                      e.target.value
                        .trim()
                        .replace(e.target.value.indexOf(".") !== 1 && /^0+/, "")
                        .replace(emotionRegex, "")
                    )
                  }
                  onKeyDown={(evt) => onInputNumber(evt)}
                  onPaste={(event) => {
                    event.preventDefault();
                  }}
                  className={`form-control rounded-0 inputLCO ${
                    errors.location_level ? "is-invalid" : ""
                  }`}
                  disabled={!props.isCreate || props.isDisableEdit}
                  name="location_level"
                />
                <strong> m</strong>
                <div className="invalid-feedback">
                  {errors.location_level?.message}
                </div>
              </Col>
              <Col>
                <strong>Chainage </strong>
                <input
                  type="number"
                  {...register("location_chainage")}
                  onWheelCapture={(event) => event.currentTarget.blur()}
                  onBlur={(e: any) =>
                    setValue(
                      "location_chainage",
                      e.target.value
                        .trim()
                        .replace(e.target.value.indexOf(".") !== 1 && /^0+/, "")
                        .replace(emotionRegex, "")
                    )
                  }
                  onKeyDown={(evt) => onInputNumber(evt)}
                  onPaste={(event) => {
                    event.preventDefault();
                  }}
                  className={`form-control rounded-0 inputLCO ${
                    errors.location_chainage ? "is-invalid" : ""
                  }`}
                  disabled={!props.isCreate || props.isDisableEdit}
                  name="location_chainage"
                />
                <strong> m</strong>
                <div className="invalid-feedback">
                  {errors.location_chainage?.message}
                </div>
              </Col>
              <Col>
                <strong>Offset </strong>
                <input
                  type="number"
                  {...register("location_offset")}
                  onWheelCapture={(event) => event.currentTarget.blur()}
                  onBlur={(e: any) =>
                    setValue(
                      "location_offset",
                      e.target.value
                        .trim()
                        .replace(e.target.value.indexOf(".") !== 1 && /^0+/, "")
                        .replace(emotionRegex, "")
                    )
                  }
                  onKeyDown={(evt) => onInputNumber(evt)}
                  onPaste={(event) => {
                    event.preventDefault();
                  }}
                  className={`form-control rounded-0 inputLCO ${
                    errors.location_offset ? "is-invalid" : ""
                  }`}
                  disabled={!props.isCreate || props.isDisableEdit}
                  name="location_offset"
                />
                <strong> m</strong>
                <div className="invalid-feedback">
                  {errors.location_offset?.message}
                </div>
              </Col>
            </Row>
          </div>
          <div className="btnPopup">
            <Button
              onClick={() => props.setShowMoalLocation(false)}
              className="backBtn rounded-0"
            >
              Cancel
            </Button>
            {props.isCreate && !props.isDisableEdit && (
              <Button
                variant="danger"
                className="btnSavePopup rounded-0"
                type="submit"
              >
                Save
              </Button>
            )}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
