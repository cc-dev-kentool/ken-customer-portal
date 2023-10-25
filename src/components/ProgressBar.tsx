import { Box } from "@mui/material";

type Props = {
  currentStatus: string;
}

export default function Progressbar(props: Props) {
  const { currentStatus } = props;

  // Return html dialog modal.
  return (
    <Box sx={{ width: '20%' }}>
      <div className="progress" style={{ borderRadius: "10px", background: "transparent" }}>
        <div className="progress-bar" style={{ width: "30%", backgroundColor: "transparent", borderRadius: "10px" }}>
          Upload PDF
        </div>
        {currentStatus !== "upload" && (
          <div className="progress-bar" style={{ width: "60%", backgroundColor: "transparent", borderRadius: "10px" }}>
            Analysis
          </div>)}
      </div>
      <div className="progress">
        {currentStatus === "upload" ?
          (<div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: "30%", backgroundColor: "#229bb5" }}
          />) :
          (<>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: "30%", backgroundColor: "#229bb5" }}
            />
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: "60%", backgroundColor: "#229bb5", borderLeft: "1px solid #fff" }}>
            </div>
          </>)
        }
      </div>
    </Box>
  );
}
