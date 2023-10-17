import { FileUploader } from "react-drag-drop-files";
import { PDFDocument } from 'pdf-lib';
import { useAppDispatch } from "hooks";
import { add as addAlert, remove as removeAlert } from "store/actions/alert"
import image from "assets/icon/icon_image.svg";
import warn from "assets/icon/icon_warning.svg";

// Define a function called "UploadFile" which receives a single parameter called "props"
export default function UploadFile(props) {
  const dispatch = useAppDispatch();
  const { file, setFile, setEnableBtnAnalyze } = props;

  // Define a function called "handleChange" that sets the selected file using the setFile function
  const handleChange = async (file) => {
    dispatch(removeAlert());
    if (file) {
      if (file.type !== "application/pdf") {
        setEnableBtnAnalyze(false);
        return dispatch(addAlert("Invalid file, only .pdf file uploads are accepted.", "danger"))
      }

      const arrayBuffer = await readFile(file) as ArrayBuffer;
      const pdf = await PDFDocument.load(arrayBuffer);
      if (pdf.getPageCount() > 150) {
        setEnableBtnAnalyze(false);
        return dispatch(addAlert("Unable to upload. The number of pages in the file exceeds the allowed limit (150 pages).", "danger"))
      }

      setEnableBtnAnalyze(true);
      setFile(file);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  // Return the following JSX
  return (
    <div className="content-popup-upload">
      <p>The deal document uploaded into the system will automatically be analyzed for risk by the solution.</p>
      <div className="area-upload text-center p-2">
        <FileUploader handleChange={handleChange}>
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
