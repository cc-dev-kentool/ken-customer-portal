import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import { StepIconProps } from '@mui/material/StepIcon';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { labelDisplay } from 'helpers/until';
import { ReactTooltip } from 'components/Tooltip/ReactTooltip';
import "./style.css"


export default function AnalysisProgress(props) {

  const topics = [
    {
      topic: 'War',
      status: 'success'
    },
    {
      topic: 'Unused definitions',
      status: 'error'
    },
    {
      topic: 'Sanctions',
      status: 'success'
    },
    {
      topic: 'Readability',
      status: 'success'
    },
    {
      topic: 'RUB',
      status: 'success'
    },
    {
      topic: 'Interaction between court jurisdiction and arbitration',
      status: 'success'
    },
    {
      topic: 'Governing law',
      status: 'success'
    },
    {
      topic: 'Cyber',
      status: 'success'
    },
    {
      topic: 'Court jurisdiction',
      status: 'open'
    },
    {
      topic: 'Communicable disease',
      status: ''
    },
    {
      topic: 'CBR',
      status: ''
    },
    {
      topic: 'Arbitration',
      status: ''
    },
  ]

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 20,
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
    width: 40,
    height: 40,
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
        <i className="fa-solid fa-ellipsis fa-2xl" style={{ color: "#F4952C" }}></i>
      </ColorlibStepIconRoot>
    );
  }

  const iconSuccess = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        <i className="fa-solid fa-circle-check fa-2xl" style={{ color: "#5cc200" }}></i>
      </ColorlibStepIconRoot>
    );
  }

  const iconError = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        <i className="fa-solid fa-circle-xmark fa-2xl" style={{ color: "#ff543a" }}></i>
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

  const contentStep = (topic) => {
    let icon;
    switch (topic.status) {
      case 'success':
        icon = iconSuccess;
        break;
      case 'error':
        icon = iconError;
        break;
      case 'open':
        icon = iconOpen;
        break;
      default:
        icon = iconNone;
        break;
    }

    return (
      <StepLabel StepIconComponent={icon}>
        <p data-tooltip-id={`tooltip-${topic.topic}`}>
          {topic.topic.length > 5 ? labelDisplay(topic.topic, 5) : topic.topic}
        </p>
        {topic.topic.length > 5 &&
          <ReactTooltip
            id={`tooltip-${topic.topic}`}
            content={topic.topic}
            widthTooltip={200}
          />}
      </StepLabel>
    )
  }

  // Return html dialog modal.
  return (
    <div>
      <Stepper alternativeLabel activeStep={5} connector={<ColorlibConnector />}>
        {topics.map((topic, index) => (
          (index < 6) && (<Step key={index}>
            {contentStep(topic)}
          </Step>)

        ))}
      </Stepper>
      <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />}>
        {topics.map((topic, index) => (
          (index >= 6) && (<Step key={index}>
            {contentStep(topic)}
          </Step>)

        ))}
      </Stepper>
    </div>
  );
}
