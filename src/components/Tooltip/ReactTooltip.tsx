import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
/**
 * The popup dialog.
 * @param param0
 * @returns
 */
type Props = {
  id: string;
  content: string;
  widthTooltip?: number;
}

export function ReactTooltip(props: Props) {
  const { id, content, widthTooltip } = props

  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth - 500);

  useEffect(() => {
    window.addEventListener('resize', function () {
      setCurrentWidth(this.window.innerWidth - 500);
    });
  }, [])


  // Return html dialog modal.
  return (
    <Tooltip
      id={id}
      place="bottom"
      content={content}
      className="table-tooltip"
      style={{ 
        width: `${widthTooltip ?? currentWidth}px`,
        zIndex: 10,
      }}
    />
  )
}
