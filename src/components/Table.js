import React, { useContext } from "react";
import Body from "./Body";
import "../styles/Table.css";
import DataAreaContext from "../utils/DataAreaContext";

const Table = () => {
  const context = useContext(DataAreaContext);

  return (
    <div className="datatable mt-5">
      <table
        id="table"
        className="table table-striped table-hover table-condensed"
      >
        <thead>
          <tr>
            {context.developerState.headings.map(({ name, width }) => {
              return (
                <th
                  className="col"
                  key={name}
                  style={{ width }}
                  onClick={() => {
                    // context.handleSort(name.toLowerCase());
                    context.handleSort(name);
                  }}
                >
                  {name}
                  <span className="pointer"></span>
                </th>
              );
            })}
          </tr>
        </thead>

        <Body />
      </table>
    </div>
  );
};

export default Table;
