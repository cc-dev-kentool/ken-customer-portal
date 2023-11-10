import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { StepIconProps } from '@mui/material/StepIcon';
import { labelDisplay } from 'helpers/until';
import { ReactTooltip } from 'components/Tooltip/ReactTooltip';
import { useAppSelector } from 'hooks';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import icon_success from "assets/icon/icon_success.svg";
import icon_error from "assets/icon/icon_error.svg";
import icon_loading from "assets/icon/icon_loading.svg";
import "./style.css"


export default function AnalysisProgress(props) {
  const { dataTopics, currentStatus } = props;

  const [listPrompt] = useAppSelector((state) => [
    state.prompts.listPrompt,
  ]);

  const [dataProgress, setDataProgress] = useState<any>([])

  useEffect(() => {
    if (dataTopics?.length > 0) {
      if (currentStatus === 'running') {
        const findIndex = dataTopics.every(data =>  data.executed_status !== 'running')
        if (findIndex) {
          dataTopics.find(item => item.topic_order === 1).executed_status = 'running';
          setDataProgress(dataTopics)
        }
      }
    }
    setDataProgress(dataTopics)
  }, [currentStatus, dataTopics])

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

  const iconLoading = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        <img src={icon_loading} alt="" width="20px"/>
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

  const contentStep = (prompt) => {
    let icon = iconNone;
    const findTopic = dataProgress.find(topic => topic.topic === prompt.topic_id)

    if (findTopic) {
      switch (findTopic.executed_status) {
        case 'success':
          icon = iconSuccess;
          break;
        case 'error':
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
