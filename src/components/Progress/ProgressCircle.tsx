import ProgressBar from 'react-customizable-progressbar';
import "./style.css";

export default function ProgressCircle(props) {
  const { progress, strokeColor, classIndicator, label } = props;

  // Return html dialog modal.
  return (
    <>
      <ProgressBar
        radius={100}
        progress={progress}
        strokeWidth={17}
        strokeColor={strokeColor}
        trackStrokeWidth={0}
        initialAnimation={true}
        initialAnimationDelay={200}
      >
        <div className={classIndicator}>
          <div>{progress}<span className="unit">%</span></div>
        </div>
      </ProgressBar>
      <p className='label-pg'>{label}</p>
    </>
  );
}
