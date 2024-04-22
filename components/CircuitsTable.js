"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import Link from "next/link";
import React, { useState } from "react";

const CircuitsTable = ({ data }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const columns = [
    {
      header: "City",
      accessorKey: "cityName",
    },
    {
      header: "Departure Monument",
      accessorKey: "departureMonumentName",
    },
    {
      header: "Departure Date",
      accessorKey: "departureTime",
      cell: (info) =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: "Action",
      accessorKey: "circuitId",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination, sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-5">
        <div className="pb-4 bg-white dark:bg-gray-900">
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mx-3 mt-2">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block pt-2 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by keyword"
              onChange={(event) => setFiltering(event.target.value)}
            />
          </div>
        </div>

        <table className="w-full text-lg text-left rtl:text-right text-gray-900 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.column.id !== "circuitId") {
                    return (
                      <th
                        scope="col"
                        className="p-6"
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          { asc: "⬆️", desc: "⬇️" }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </th>
                    );
                  } else {
                    return (
                      <th scope="col" className="p-6" key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    );
                  }
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {data
              ? table.getRowModel().rows.map((row) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (cell.column.id !== "circuitId") {
                        return (
                          <td
                            className={
                              cell.column.id === "cityName"
                                ? "px-6 py-4 uppercase"
                                : "px-6 py-4"
                            }
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      } else {
                        return (
                          <td className="px-6 py-4" key={cell.id}>
                            <button
                              className="font-medium text-green-600 dark:text-green-500 hover:underline mr-3"
                              onClick={() =>
                                console.log(cell.getContext().getValue())
                              }
                            >
                              View
                            </button>
                            <button
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                              onClick={() =>
                                console.log(cell.getContext().getValue())
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="font-medium text-red-600 dark:text-red-500 hover:underline mr-3"
                              onClick={() =>
                                console.log(cell.getContext().getValue())
                              }
                            >
                              Delete
                            </button>
                          </td>
                        );
                      }
                    })}
                  </tr>
                ))
              : null}
            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">Fes</td>
              <td className="px-6 py-4">XYZ</td>
              <td className="px-6 py-4">X/Y/Z date</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-green-600 dark:text-green-500 hover:underline mr-3"
                >
                  View
                </a>
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline mr-3"
                >
                  Delete
                </a>
              </td>
            </tr> */}
          </tbody>
        </table>

        {data ? (
          <nav
            className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block"></div>
            <div className="flex justify-between sm:justify-end space-x-2">
              <button
                className={
                  "relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                }
                onClick={() => table.setPageIndex(0)}
              >
                First
              </button>
              <button
                className={
                  !table.getCanPreviousPage()
                    ? "relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-md bg-gray-50"
                    : "relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                }
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                Previous
              </button>

              {/* <a
              href="#"
              aria-current="page"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-600 dark:text-white border border-blue-300 dark:border-blue-600 rounded-md"
            >
              3
            </a> */}

              <button
                className={
                  !table.getCanNextPage()
                    ? "relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-md bg-gray-50"
                    : "relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                }
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                Next
              </button>
              <button
                className={
                  "relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                }
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                Last
              </button>
            </div>
          </nav>
        ) : null}
      </div>
    </>
  );
};

export default CircuitsTable;
