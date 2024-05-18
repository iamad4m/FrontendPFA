import { DateTime } from "luxon";
import React from "react";

const Comments = ({ commentsTmp }) => {
  return (
    <>
      <h1 className="text-2xl md:text-3xl pl-2 border-l-4  font-sans font-bold border-indigo-600  dark:text-gray-200 mx-5 my-3">
        Comments
      </h1>
      <div className="ml-20 mr-20">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
                <th scope="col" className="px-6 py-3">
                  Tourist
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            {/* the body */}
            <tbody>
              {commentsTmp.map((comment) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{comment.content}</td>
                  <td className="px-6 py-4">
                    {comment.tourist.firstName} {comment.tourist.lastName}
                  </td>
                  <td className="px-6 py-4">
                    {DateTime.fromISO(comment.createdAt).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => console.log(comment.id)}
                    >
                      Validate
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => console.log(comment.id)}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Comments;
