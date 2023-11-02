import { useEffect, useState } from "react";
import "./style.css";
import { Table } from 'antd';
/**
 * The popup dialog.
 * @param param0
 * @returns
 */
type Props = {
  columns: object[];
  listUser: object[];
  currentHeight?: number;
  currentWidth?: number;
}

export function ContentTable(props: Props) {
  const { columns, listUser, currentHeight, currentWidth } = props

  const [heightTable, setHeightTable] = useState<number>(window.innerHeight - 310);

  useEffect(() => {
    window.addEventListener('resize', function () {
      setHeightTable(this.window.innerHeight - 310);
    });
  }, [])

  const height = currentHeight ?? heightTable;
  const Width = currentWidth ?? 600;

  // Return html dialog modal.
  return (
    <Table
      columns={columns}
      dataSource={listUser}
      className="table-user"
      scroll={{ x: Width, y: height }}
    />
  )
}
