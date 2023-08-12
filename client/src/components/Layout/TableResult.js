import React from "react";

const TableComponent = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Category Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((result) => (
          <tr key={result._id}>
            <td>{result._id}</td>
            <td>
              {Object.keys(result.categoryNameandScore).map((category) => (
                <div key={category}>{category}</div>
              ))}
            </td>
            <td>
              {Object.values(result.categoryNameandScore).map((score) => (
                <div key={score}>{score}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
