import { FileUploader } from "react-drag-drop-files";
import image from "assets/icon/icon_image.svg";
import warn from "assets/icon/icon_warning.svg";

// Define a function called "UploadFile" which receives a single parameter called "props"
export default function UploadFile(props) {
  const {file, setFile} = props;
  const fileTypes = ["pdf"];

  // Define a function called "handleChange" that sets the selected file using the setFile function
  const handleChange = (file) => {
    setFile(file);
  };

  // Return the following JSX
  return (
    <div className="content-popup-upload">
      <p>The deal document uploaded into the system will automatically be analyzed for risk by the solution.</p>
      <div className="area-upload text-center p-2">
        <FileUploader handleChange={handleChange} types={fileTypes}>
          <img className="mt-2" src={image} alt="" />
          <p>Drag and Drop Files here or</p>
          <button className="btn-upload">Browse File</button>
          <p className="file-type">Supported file types: *.pdf</p>
          {file && <p className="file-name">File name: {file.name}</p>}
        </FileUploader>
      </div>
      <div className="mt-3 mb-3">
        <img src={warn} alt="" />
        <span className="content-warn"> By Browsing the file and uploading, this will submit the files automatically.</span>
      </div>
    </div>
  );
}
