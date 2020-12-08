import React, {useMemo} from "react";
import {useTable, useFilters} from "react-table";
import LynnAPI from './LynnAPI.json'
import {COLUMNS} from './columns'


export default function TableBuild() {
  const columns = useMemo( () => COLUMNS, [])
  const data = useMemo( () => LynnAPI, [])
  const tableInstance = useTable({
    columns,
    data
  }, useFilters)

  const { getTableProps, getTableBodyProps, headerGroups,rows, prepareRow } = tableInstance

  return (
    <table {...getTableProps}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}