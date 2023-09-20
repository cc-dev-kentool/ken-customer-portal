import React from "react";
import { Table } from "react-bootstrap";
import "./style.css";

export default function ModalTestType(props) {
  const {
    material,
    searchField,
    newTestType,
    onClearSearch,
    searchTestType,
    toggleSelectAllTestTypes,
    toggleSelectTestType,
    setOtherTests,
    isHasOtherTests,
    heightTable,
  } = props;

  return (
    <div>
      <div className="row">
        <div className={"searchTestType"}>
          {searchField.current?.value && (
            <i
              onClick={onClearSearch}
              data-toggle="tooltip"
              data-placement="bot"
              className="iconCloseSearch"
            >
              ✕
            </i>
          )}
          <input
            ref={searchField}
            type="text"
            placeholder={"Search"}
            aria-label="Search Input"
            onChange={(e) => searchTestType(e)}
            className={"border-0"}
          />
        </div>
      </div>
      <div className="table-testing" style={{height: `${heightTable}vh`}}>
        <Table className="table">
          <thead style={{ background: "#e9ecef" }}>
            <tr>
              {newTestType
                .filter(
                  (item) =>
                    item.material_id === material && item?.test_types.length
                )
                .map((category, index) => (
                  <th key={category.uuid}>
                    <input
                      type="checkbox"
                      id={`group-${index}`}
                      checked={category.test_types.every((m) => m.selected)}
                      onChange={(e) => toggleSelectAllTestTypes(e, category)}
                      className="form-check-input iconCheck"
                    />
                    <label
                      htmlFor={`group-${index}`}
                      className={`text-break testTypeName`}
                    >
                      {" "}
                      {category.test_group_name}
                    </label>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {newTestType
                .filter(
                  (item) =>
                    item.material_id === material && item.test_types.length
                )
                .map((category, index) => (
                  <td key={category.uuid}>
                    {category.test_types.map((test, ind) => (
                      <p key={test.uuid}>
                        <input
                          type="checkbox"
                          id={`test-${index}-${ind}`}
                          checked={test.selected}
                          onChange={(e) =>
                            toggleSelectTestType(e, category, test)
                          }
                          className="form-check-input iconCheck"
                        />
                        <label
                          htmlFor={`test-${index}-${ind}`}
                          className={`text-break testTypeName`}
                        >
                          {" "}
                          {test.test_type_method !== "N/A" &&
                            test.test_type_method}{" "}
                          {test.test_type_name}
                        </label>
                      </p>
                    ))}
                  </td>
                ))}
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="btn-radio" onChange={(e) => setOtherTests(e)}>
        <span>
          The testing type that you intend to choose is not here? Choose another
          test:{" "}
        </span>
        <input
          className="btnYN form-check-input"
          type="radio"
          value="Yes"
          name="addType"
          id="addTypeYes"
          checked={isHasOtherTests}
        />
        <label className="labelYN" htmlFor="addTypeYes">
          Yes
        </label>
        <input
          className="btnYN form-check-input"
          type="radio"
          value="No"
          name="addType"
          id="addTypeNo"
          checked={!isHasOtherTests}
        />
        <label className="labelYN" htmlFor="addTypeNo">
          No
        </label>
      </div>
    </div>
  );
}
