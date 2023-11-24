import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
/**
 * The popup dialog.
 * @param param0
 * @returns
 */
// Type declaration for the props object passed to ReactTooltip component.
type Props = {
  // Unique identifier for the tooltip.
  id: string;

  // Content to be displayed in the tooltip.
  content: string;

  // Optional number variable to specify the width of the tooltip.
  widthTooltip?: number;
}

// ReactTooltip component that renders a tooltip with provided content.
export function ReactTooltip(props: Props) {
  const { id, content, widthTooltip } = props

  // State variable to store the current width of the tooltip.
  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth - 500);

  // useEffect hook to update the width of the tooltip when window is resized.
  useEffect(() => {
    window.addEventListener('resize', function () {
      setCurrentWidth(this.window.innerWidth - 500);
    });
  }, [])

  // Render the tooltip component with provided id, placement, content, and style.
  return (
    <Tooltip
      id={id}
      place="bottom"
      content={content}
      style={{
        width: `${widthTooltip ?? currentWidth}px`,
        zIndex: 10,
        wordBreak: "break-word"
      }}
    />
  )
}
