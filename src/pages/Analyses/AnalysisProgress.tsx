import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import { StepIconProps } from '@mui/material/StepIcon';
import { labelDisplay } from 'helpers/until';
import { ReactTooltip } from 'components/Tooltip/ReactTooltip';
import { useAppSelector } from 'hooks';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import "./style.css"


export default function AnalysisProgress(props) {
  const { dataTopics } = props;

  const [listPrompt] = useAppSelector((state) => [
    state.prompts.listPrompt,
  ]);

  listPrompt.sort(function (a, b) {
    if (a.topic_order < b.topic_order) {
      return -1;
    }
    if (a.topic_order > b.topic_order) {
      return 1;
    }
    return 0;
  });

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

  const iconOpen = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        <i className="fa-solid fa-ellipsis fa-xl" style={{ color: "#F4952C" }}></i>
      </ColorlibStepIconRoot>
    );
  }

  const iconSuccess = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        <i className="fa-solid fa-circle-check fa-xl" style={{ color: "#5cc200" }}></i>
      </ColorlibStepIconRoot>
    );
  }

  const iconError = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        <i className="fa-solid fa-circle-xmark fa-xl" style={{ color: "#ff543a" }}></i>
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

  const contentStep = (prompt) => {
    let icon = iconNone;

    const findTopic = dataTopics.find(topic => topic.topic === prompt.topic_id)

    if (findTopic) {
      switch (findTopic.executed_status) {
        case 'success':
          icon = iconSuccess;
          break;
        case 'error':
          icon = iconError;
          break;
        case 'running':
          icon = iconOpen;
          break;
        default:
          icon = iconNone;
          break;
      }
    }

    return (
      <StepLabel StepIconComponent={icon}>
        <p data-tooltip-id={`tooltip-${prompt.uuid}`} style={{ cursor: "pointer" }}>
          {prompt?.topic_name.length > 5 ? labelDisplay(prompt?.topic_name, 5) : prompt?.topic_name}
        </p>
        {prompt?.topic_name.length > 5 &&
          <ReactTooltip
            id={`tooltip-${prompt?.uuid}`}
            content={prompt?.topic_name}
            widthTooltip={200}
          />}
      </StepLabel>
    )
  }

  // Return html dialog modal.
  return (
    <div>
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
    </div>
  );
}
