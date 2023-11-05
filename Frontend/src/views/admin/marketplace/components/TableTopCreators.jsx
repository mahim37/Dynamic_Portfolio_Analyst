import Card from "components/card";
import Progress from "components/progress";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function TopCreatorTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  return (
    <Card extra={"h-[600px] w-full"}>
      {/* Top Creator Header */}
      <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          Stocks
        </h4>
        {/* <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          See all
        </button> */}
      </div>

      {/* Top Creator Heading */}
      <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="w-full min-w-[500px] overflow-x-scroll"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                  >
                    <div className="flex items-center justify-between pt-4 pb-2 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} className="px-4">
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "SYMBOL") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className="h-[30px] w-[30px] rounded-full">
                            
                          </div>
                          <p className="text-sm font-medium text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "NAME") {
                      data = (
                        <p className="text-md font-medium text-gray-600 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "QUANTITY") {
                      data = (
                        <div className="mx-2 flex font-bold">
                          <span>{cell.value}</span>
                        </div>
                      );
                    }
                    else if (cell.column.Header === "LINK") {
                      data = (
                        <div className="mx-2 flex font-bold">
                          <Link to={cell.value}>
                            <button className="px-3 py-1 bg-blue-500 text-white rounded-md">Analysis</button>
                          </Link>
                        </div>
                      );
                    }
                    
                    
                    return (
                      <td
                        className="py-3 text-sm"
                        {...cell.getCellProps()}
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default TopCreatorTable;
