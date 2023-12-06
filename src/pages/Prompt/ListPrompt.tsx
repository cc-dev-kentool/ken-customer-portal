import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { PopupDialog } from "components/Modals/PopUpDialog";
import { useAppDispatch, useAppSelector } from "hooks";
import { ContentTable } from "components/Table/ContentTable";
import { getListTopic } from "store/actions/prompt";
import { labelDisplay } from "helpers/until";
import { ReactTooltip } from "components/Tooltip/ReactTooltip";
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";
import AdminLayout from "layouts/Admin";
import EditPrompt from "./EditPrompt";
import './style.css';

interface DataType {
  uuid: string;
  name: string;
  prompts: any;
  update_at: string;
  updated_by: any;
}

// Defines a React functional component called "List" that takes props as its parameter
export default function ListPrompt(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();

  const [topics] = useAppSelector((state) => [
    state.prompts.topics,
  ]);

  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [currentPrompt, setCurrentPrompt] = useState<Object>({});

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getListTopic());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Topic',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'descend',
      sorter: {
        compare: (a, b) => {
          return a.name > b.name ? 1 : -1;
        },
      },
      width: '40%',
    },
    {
      title: 'Update By',
      dataIndex: 'updated_by',
      key: 'updated_by',
      sorter: {
        compare: (a, b) => {
          return a.updated_by?.email > b.updated_by?.email ? 1 : -1;
        },
      },
      render: (_, { updated_by }) => (
        <p>{updated_by?.email}</p>
      ),
      width: '30%',
    },
    {
      title: 'Update Date',
      dataIndex: 'update_at',
      sorter: {
        compare: (a, b) => {
          return a.update_at > b.update_at ? 1 : -1;
        },
      },
      render: (_, { update_at }) => (
        <p>{moment.utc(update_at).format("YYYY/MM/DD")}</p>
      ),
      className: "date-update",
      width: '20%',
    },
    {
      title: 'Action',
      width: '10%',
      render: (prompt) => (
        <i
          className="fa-solid fa-pen"
          style={{ color: "#26ADC9", cursor: "pointer" }}
          onClick={() => handleShowPopupEdit(prompt)}
        ></i>
      ),
    },
  ];

  const handleShowPopupEdit = (prompt) => {
    setCurrentPrompt(prompt)
    setIsShowEdit(true);
  }

  const getContentPopupEdit = () => {
    return <EditPrompt currentPrompt={currentPrompt} setIsShowEdit={setIsShowEdit} />;
  }

  // Returns JSX for rendering component on the page
  return (
    // Renders an AdminLayout component with a prop called `routeName`
    <AdminLayout routeName={props.routeName}>
      <div className="prompt-managerment">
        <Row>
          <Col sm={10} className="title">Prompt Management</Col>
          <Col sm={2} className="add-prompt"><button disabled>+</button></Col>
        </Row>
        <ContentTable
          columns={columns}
          listUser={topics}
          currentWidth={900}
        />

        <PopupDialog
          isShow={isShowEdit}
          title={"Edit Prompt"}
          content={getContentPopupEdit()}
          firstLabelButon={""}
          seconLabelButton={""}
          handleFirstButtonCalback={() => setIsShowEdit(false)}
          handleSeconButtonCalback={""}
          modalContentClass="modal-edit-prompt"
        />
      </div>
    </AdminLayout>
  );
}
