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
}

export function ReactTooltip(props: Props) {
  const { id, content } = props

  const [widthTooltip, setWidthTooltip] = useState<number>(window.innerWidth - 500);

  useEffect(() => {
    window.addEventListener('resize', function () {
      setWidthTooltip(this.window.innerWidth - 500);
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
        width: `${widthTooltip}px`,
        zIndex: 10,
      }}
    />
  )
}
