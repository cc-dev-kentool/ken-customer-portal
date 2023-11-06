import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { PopupDialog } from "components/Modals/PopUpDialog";
import { useAppDispatch, useAppSelector } from "hooks";
import { ContentTable } from "components/Table/ContentTable";
import { getListPrompt } from "store/actions/prompt";
import { labelDisplay } from "helpers/until";
import { ReactTooltip } from "components/Tooltip/ReactTooltip";
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";
import AdminLayout from "layouts/Admin";
import EditPrompt from "./EditPrompt";
import './style.css';

interface DataType {
  uuid: string;
  topic_name: string;
  prompt_text_1: string;
  prompt_text_2: string;
  prompt_text_3: string;
  update_at: string;
  user_email: string;
}

// Defines a React functional component called "List" that takes props as its parameter
export default function ListPrompt(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();

  const [listPrompt] = useAppSelector((state) => [
    state.prompts.listPrompt,
  ]);

  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [currentPrompt, setCurrentPrompt] = useState<Object>({});

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getListPrompt());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Topic',
      dataIndex: 'topic_name',
      key: 'topic_name',
      defaultSortOrder: 'descend',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          return a.topic_name > b.topic_name ? 1 : -1;
        },
      },
    },
    {
      title: 'Text 1',
      dataIndex: 'prompt_text_1',
      key: 'prompt_text_1',
      sorter: {
        compare: (a, b) => {
          return a.prompt_text_1 > b.prompt_text_1 ? 1 : -1;
        },
      },
      render: (_, { prompt_text_1, uuid }) => {
        return <>
          <p data-tooltip-id={`tooltip-1-${uuid}`}>
            {prompt_text_1?.length > 100 ? labelDisplay(prompt_text_1, 100) : prompt_text_1}
          </p>
          {prompt_text_1?.length > 100 &&
            <ReactTooltip
              id={`tooltip-1-${uuid}`}
              content={prompt_text_1}
            />}
        </>
      }
    },
    {
      title: 'Text 2',
      dataIndex: 'prompt_text_2',
      key: 'prompt_text_2',
      sorter: {
        compare: (a, b) => {
          return a.prompt_text_2 > b.prompt_text_2 ? 1 : -1;
        },
      },
      render: (_, { prompt_text_2, uuid }) => {
        return <>
          <p data-tooltip-id={`tooltip-2-${uuid}`}>
            {prompt_text_2?.length > 100 ? labelDisplay(prompt_text_2, 100) : prompt_text_2}
          </p>
          {prompt_text_2?.length > 100 &&
            <ReactTooltip
              id={`tooltip-2-${uuid}`}
              content={prompt_text_2}
            />}
        </>
      }
    },
    {
      title: 'Text 3',
      dataIndex: 'prompt_text_3',
      key: 'prompt_text_3',
      sorter: {
        compare: (a, b) => {
          return a.prompt_text_3 > b.prompt_text_3 ? 1 : -1;
        },
      },
      render: (_, { prompt_text_3, uuid }) => {
        return <>
          <p data-tooltip-id={`tooltip-3-${uuid}`}>
            {prompt_text_3?.length > 100 ? labelDisplay(prompt_text_3, 100) : prompt_text_3}
          </p>
          {prompt_text_3?.length > 100 &&
            <ReactTooltip
              id={`tooltip-3-${uuid}`}
              content={prompt_text_3}
            />}
        </>
      }
    },
    {
      title: 'Update by',
      dataIndex: 'user_email',
      key: 'user_email',
      width: '10%',
      sorter: {
        compare: (a, b) => {
          return a.user_email > b.user_email ? 1 : -1;
        },
      },
    },
    {
      title: 'Update Date',
      dataIndex: 'update_at',
      width: '11%',
      sorter: {
        compare: (a, b) => {
          return a.update_at > b.update_at ? 1 : -1;
        },
      },
      render: (_, { update_at }) => (
        <p>{moment.utc(update_at).format("YYYY/MM/DD")}</p>
      ),
      className: "date-update"
    },
    {
      title: 'Action',
      width: '7%',
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
      <div className="user-managerment">
        <Row>
          <Col sm={10} className="title">Prompt Management</Col>
          <Col sm={2} className="add-prompt"><button disabled>+</button></Col>
        </Row>
        <ContentTable
          columns={columns}
          listUser={listPrompt}
          currentWidth={900}
        />

        <PopupDialog
          isShow={isShowEdit}
          title={"Edit prompt"}
          content={getContentPopupEdit()}
          firstLabelButon={""}
          seconLabelButton={""}
          handleFirstButtonCalback={() => setIsShowEdit(false)}
          handleSeconButtonCalback={""}
        />
      </div>
    </AdminLayout>
  );
}
