// Importing moment and Popup libraries
import moment from "moment";
import Popup from "reactjs-popup";

// Function to capitalize the first letter of each word in a sentence
export const upperFistChar = (text) => {
  let sentence = text?.toLowerCase().split(" ");
  for (let i = 0; i < sentence?.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence?.join(" ");
};

// Function to compare changes made in two objects
export const compareChanges = (a, b) =>
  Object.entries(a).some(([key, value]) => value !== b[key]);

// Function to format DateTime based on timezone
export const formatDateTime = (dateTime) => {
  return moment.utc(dateTime).local().format("DD-MM-YYYY");
};

// Function to display the label in shortened form with an ellipsis (...) after a certain length
export const labelDisplay = (text, len): string =>
  text && text.length > len ? text.substring(0, len) + "..." : text;

// Function that prevents non-numeric inputs in a float input field
export const onInputFloat = (evt) => {
  evt = evt || window.event;
  let charCode = typeof evt.which === "undefined" ? evt.keyCode : evt.which;
  let charStr = String.fromCharCode(charCode);
  let exclude = [
    8, 190, 9, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 45, 46, 35, 40, 34,
    37, 12, 39, 36, 38, 33, 110,
  ];
  if (!charStr.match(/^[0-9]+$/) && !exclude.includes(charCode))
    evt.preventDefault();
};

// Function that prevents form submission when the Enter key is pressed
export const preventPressEnter = (evt) => {
  if (evt.keyCode === 13 || evt.code === "Enter") {
    evt.preventDefault();
  }
};

// Function that prevents non-numeric inputs in a number input field
export const onInputNumber = (evt) => {
  if (evt.keyCode === 13 || evt.code === "Enter") {
    evt.preventDefault();
  }
  if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(evt.key)) {
    evt.preventDefault();
  }
};

export const onInputTel = (evt) => {
  if (
    ![
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102,
      103, 104, 105, 110, 188, 190, 8
    ].includes(evt.keyCode)
  ) {
    evt.preventDefault();
  }
};

// Function that formats long text with a tooltip popup
export const rowFormat = (length, position, data) => {
  return (
    <span>
      {data?.length > length ? (
        <Popup
          trigger={
            <span className="breakText">{labelDisplay(data, length)}</span>
          }
          position={position}
          on="hover"
        >
          <span className="text-break popup">{data}</span>
        </Popup>
      ) : (
        data
      )}
    </span>
  );
};

// Function that displays sort order icons (ascending or descending)
export const sortColum = (order) => {
  if (!order) return null;
  else if (order === "asc")
    return <i style={{ marginLeft: "5px" }} className="fa fa-sort-asc"></i>;
  else if (order === "desc")
    return <i style={{ marginLeft: "5px" }} className="fa fa-sort-desc"></i>;
  return null;
};

// Function that hides part of the text with asterisks (*)
export const hideText = (text, len) => {
  return text ? text.substring(0, len) + "******" : "";
};

// Check if the device is a tablet or iPad
export const isOnTabletOrIpad = () => {
  return /iPad|Android/.test(navigator.userAgent);
};

// Returns the DD - MM -YYY
export const getLocalDate = (dateTime) => {
  return moment.utc(dateTime).local().format("DD-MM-YYYY");
};