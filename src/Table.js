import React from "react";
import numeral from "numeral";
import "./Table.css";

const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>{numeral(cases).format()}</td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
