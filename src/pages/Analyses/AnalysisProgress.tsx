import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import { StepIconProps } from '@mui/material/StepIcon';
import { labelDisplay } from 'helpers/until';
import { ReactTooltip } from 'components/Tooltip/ReactTooltip';
import { useAppSelector } from 'hooks';
import { CircularProgress } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import icon_success from "assets/icon/icon_success.svg";
import icon_error from "assets/icon/icon_error.svg";
import icon_loading from "assets/icon/icon_loading.svg";
import "./style.css"

export default function AnalysisProgress(props) {
  // Destructure props
  const { showPdf, dataTopics, currentStatus } = props;

  // Get listPrompt from app state using useAppSelector hook
  const [listPrompt] = useAppSelector((state) => [
    state.prompts.listPrompt,
  ]);

  const defaultLengthText = showPdf ? 10 : 20

  // Sort the listPrompt array based on topic_order property
  listPrompt.sort(function (a, b) {
    if (a.topic_order < b.topic_order) {
      return -1;
    }
    if (a.topic_order > b.topic_order) {
      return 1;
    }
    return 0;
  });

  // Define ColorlibConnector styled component using StepConnector
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 16,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg, #d4eff4 0%, #a8dee9 50%, #26adc9 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg, #d4eff4 0%, #a8dee9 50%, #26adc9 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  // Define ColorlibStepIconRoot styled component for StepIcons
  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 34,
    height: 34,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundColor: "#d4eff4",
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundColor: "#d4eff4",
    }),
  }));

  // Define custom icons for different StepIcon states
  const iconLoading = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        <img src={icon_loading} alt="" width="20px" />
      </ColorlibStepIconRoot>
    );
  }

  const iconSuccess = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        <img src={icon_success} alt="" />
      </ColorlibStepIconRoot>
    );
  }

  const iconError = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        <img src={icon_error} alt="" />
      </ColorlibStepIconRoot>
    );
  }

  const iconNone = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      </ColorlibStepIconRoot>
    );
  }

  // Return the content for each step based on the dataProgress and listPrompt
  const contentStep = (prompt) => {
    let icon = iconNone;
    const findTopic = dataTopics.find(topic => topic.topic === prompt.topic_id)

    if (findTopic) {
      switch (findTopic.executed_status) {
        case 'success':
          icon = iconSuccess;
          break;
        case 'failure':
          icon = iconError;
          break;
        case 'running':
          icon = iconLoading;
          break;
        default:
          icon = iconNone;
          break;
      }
    }

    return (
      <StepLabel StepIconComponent={icon}>
        <p data-tooltip-id={`tooltip-${prompt.uuid}`} style={{ cursor: "pointer", fontSize: "13px" }}>
          {prompt?.topic_name.length > defaultLengthText ? labelDisplay(prompt?.topic_name, defaultLengthText) : prompt?.topic_name}
        </p>
        {prompt?.topic_name.length > defaultLengthText &&
          <ReactTooltip
            id={`tooltip-${prompt?.uuid}`}
            content={prompt?.topic_name}
            widthTooltip={200}
          />}
      </StepLabel>
    )
  }

  const isReadFilePdf = () => {
    const waitting = dataTopics.every(topic => topic.executed_status === 'wait_to_run')

    return waitting && currentStatus === 'running';
  }

  // Return the HTML for the AnalysisProgress component
  return (
    <div>
      {isReadFilePdf() ?
      <>
        <p className="messUploading">Uploading this file and extracting the content is in progress to prepare for analysis...</p>
        <div className="text-center m-5"><CircularProgress color="success" /></div>
      </> :
      <>
        <Stepper alternativeLabel activeStep={5} connector={<ColorlibConnector />}>
          {listPrompt.map((prompt, index) => (
            (index < 6) && (<Step key={prompt.uuid}>
              {contentStep(prompt)}
            </Step>)

          ))}
        </Stepper>
        <Stepper alternativeLabel activeStep={5} connector={<ColorlibConnector />}>
          {listPrompt.map((prompt, index) => (
            (index >= 6) && (<Step key={prompt.uuid}>
              {contentStep(prompt)}
            </Step>)

          ))}
        </Stepper>
      </>
      }
    </div>
  );
}
