import React from "react";
import numeral from "numeral";
import "./Table.css";

const Table = ({ countries }) => {
  return (
    <div className="table">
      <table>
        <tbody>
          {countries.map(({ country, cases }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>{numeral(cases).format()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
