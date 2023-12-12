import { useEffect, useState } from "react";
import { Table } from 'antd';
import "./style.css";
/**
 * The popup dialog.
 * @param param0
 * @returns
 */
// Type declaration for the props object passed to ContentTable component.
type Props = {
  // An array of objects representing columns of the table.
  columns: object[];
  
  // An array of objects representing list of users.
  listUser: object[];
  
  // Optional number variable to specify the current height of the table.
  currentHeight?: number;
  
  // Optional number variable to specify the current width of the table.
  currentWidth?: number;
  
  // Optional callback function to handle data changes in the table.
  onChange?: any;

  defaultHeightTop?: number;
}

// ContentTable component that renders a table with provided columns and user list.
export function ContentTable(props: Props) {
  const { columns, listUser, currentHeight, currentWidth, onChange, defaultHeightTop } = props

  // State variable to store the height of the table.
  const [heightTable, setHeightTable] = useState<number>(window.innerHeight - (defaultHeightTop ?? 310) );

  // useEffect hook to update the height of the table when window is resized.
  useEffect(() => {
    window.addEventListener('resize', function () {
      setHeightTable(window.innerHeight - (defaultHeightTop ?? 310));
    });
  }, [])

  // Variable to store the actual height of the table.
  const height = currentHeight ?? heightTable;

  // Variable to store the actual width of the table.
  const Width = currentWidth ?? 600;

  // Render the table component with provided columns, user data, and other props.
  return (
    <Table
      columns={columns}
      dataSource={listUser}
      className="table-user"
      scroll={{ x: Width, y: height }}
      onChange={onChange}
    />
  )
}
