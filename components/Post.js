import { DateTime } from "luxon";
import Link from "next/link";
import React, { useState } from "react";
import MapPost from "./MapPost";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ({
  post,
  setIsClosed,
  email,
  setHide,
  setSuccessFork,
  setLoad,
  innerRef,
}) {
  const [votes, setVotes] = useState(post.votes);
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  const schemaComment = yup.object().shape({
    comment: yup.string().trim().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schemaComment),
  });

  const mutationComment = useMutation({
    mutationFn: (data) => {
      return axios.post(
        `/api/createComment?email=${email}&postId=${post.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onMutate: (variables) => {
      console.log("posting...");
    },
    onSuccess: (data, variables, context) => {
      console.log("comment posted");
      document.getElementById("cmtArea" + post.id).value = "";
      setHide(false);
    },
    onError: (err, variables, context) => {
      console.log(err.message);
    },
  });

  const mySubmitComment = (data) => {
    mutationComment.mutate(data);
  };
  return (
    <>
      <div className="leading-10 p-3 flex justify-center" ref={innerRef}>
        <div className="w-3/4 bg-white border border-indigo-700 rounded-lg shadow">
          <div className="flex items-center justify-between py-4 px-3">
            <div className="flex items-center">
              <img
                className="rounded-full w-10 h-10 border-2 border-indigo-700"
                src={`https://api.dicebear.com/8.x/thumbs/svg?radius=50&backgroundType=gradientLinear&seed=${post.owner.email}`}
              />
              <div className="pl-2">
                <div className="font-semibold">
                  <p>
                    {post.owner.firstName} {post.owner.lastName}
                  </p>
                </div>
              </div>
              <div className="pl-2 text-black/60 font-extrabold text-xl">
                <p>·</p>
              </div>
              <div className="pl-2 text-black/60">
                <p>
                  {DateTime.fromISO(post.createdAt).toLocaleString(
                    DateTime.DATE_MED
                  )}
                </p>
              </div>
            </div>
          </div>
          <p className="mb-5 text-base text-gray-500 sm:text-lg px-3">
            {post.content}
          </p>
          <div className="bg-gray-300 w-3/4 mx-auto mb-3">
            <MapPost
              coordinates={post.calculationRequirements.coordinates}
              departure={post.calculationRequirements.departure}
              route={post.route}
            />
          </div>
          <div className="bg-white border border-t-gray-300 rounded-b-lg w-full flex items-center justify-around p-2">
            <div className="flex items-center space-x-4">
              <button
                className="p-2 border border-indigo-700 rounded-full"
                onClick={() => {
                  if (isUpVoted) {
                    axios
                      .post(`/api/vote?postId=${post.id}&votes=${votes - 1}`)
                      .then((r) => setVotes(votes - 1));
                  } else {
                    if (isDownVoted) {
                      axios
                        .post(`/api/vote?postId=${post.id}&votes=${votes + 2}`)
                        .then((r) => setVotes(votes + 2));
                      setIsDownVoted(!isDownVoted);
                    } else {
                      axios
                        .post(`/api/vote?postId=${post.id}&votes=${votes + 1}`)
                        .then((r) => setVotes(votes + 1));
                    }
                  }
                  setIsUpVoted(!isUpVoted);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#4338ca"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
              <span
                className={
                  votes > 0
                    ? "text-lg font-bold text-green-500"
                    : votes < 0
                    ? "text-lg font-bold text-red-500"
                    : "text-lg font-bold text-black"
                }
              >
                {votes}
              </span>
              <button
                className="p-2 border border-indigo-700 rounded-full"
                onClick={() => {
                  if (isDownVoted) {
                    axios
                      .post(`/api/vote?postId=${post.id}&votes=${votes + 1}`)
                      .then((r) => setVotes(votes + 1));
                  } else {
                    if (isUpVoted) {
                      axios
                        .post(`/api/vote?postId=${post.id}&votes=${votes - 1}`)
                        .then((r) => setVotes(votes - 1));
                      setIsUpVoted(!isUpVoted);
                    } else {
                      axios
                        .post(`/api/vote?postId=${post.id}&votes=${votes - 1}`)
                        .then((r) => setVotes(votes - 1));
                    }
                  }
                  setIsDownVoted(!isDownVoted);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#4338ca"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            <button
              onClick={() => {
                setIsClosed(false);
                const drawer = document.getElementById(
                  "drawer-right" + post.id
                );
                drawer.classList.remove("translate-x-full");
              }}
            >
              <img
                src="/comment-post.svg"
                className="h-5 w-5"
                title="Leave a Comment"
              />
            </button>
            <button
              onClick={() => {
                setLoad(true);
                axios
                  .post(
                    `/api/forkCircuit?email=${email}&circuitId=${post.circuitId}`
                  )
                  .then((r) => {
                    setLoad(false);
                    setSuccessFork(false);
                  });
              }}
            >
              <img
                src="/fork-post.svg"
                className="h-5 w-5"
                title="Fork Circuit"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        id={"drawer-right" + post.id}
        className="fixed top-0 right-0 h-screen overflow-y-auto no-scrollbar transition-transform translate-x-full bg-white w-1/3 shadow-2xl flex flex-col justify-between scroll-smooth z-50"
        tabindex="-1"
        aria-labelledby="drawer-right-label"
      >
        <div className="bg-white">
          <div id="drawer-header" className="bg-gray-100/5 shadow-md p-4">
            <h5
              id="drawer-right-label"
              className="inline-flex items-center mb-4 text-base font-semibold text-indigo-700"
            >
              <img src="/comment-post.svg" className="h-5 w-5 mr-2" />
              Comments
            </h5>
            <button
              type="button"
              data-drawer-hide="drawer-right-example"
              aria-controls="drawer-right-example"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center"
              onClick={() => {
                setIsClosed(true);
                const drawer = document.getElementById(
                  "drawer-right" + post.id
                );
                drawer.classList.add("translate-x-full");
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          {post.comments.map((comment) => {
            return (
              <div
                id="drawer-comments"
                className="bg-white mt-4 mr-10"
                key={comment.id}
              >
                <div className="border rounded-md p-3 ml-3 my-3">
                  <div className="flex gap-3 items-center">
                    <img
                      src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${comment.tourist.email}&radius=50&backgroundType=gradientLinear`}
                      className="object-cover w-8 h-8 rounded-full 
                            border-2 border-indigo-400  shadow-indigo-400
                            "
                    />

                    <h3 className="font-bold">
                      {comment.tourist.firstName} {comment.tourist.lastName}
                    </h3>
                  </div>

                  <p className="text-gray-600 mt-2">{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={handleSubmit(mySubmitComment)}
          id="comment-input"
          className="w-full max-w-2xl bg-white rounded-t-lg border p-2 mx-auto mt-20"
        >
          <div className="px-3 mb-2 mt-2">
            <textarea
              placeholder="Leave a comment..."
              className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium focus:outline-none focus:bg-white"
              id={"cmtArea" + post.id}
              {...register("comment")}
            ></textarea>
          </div>
          <div className="flex justify-end px-4">
            <button
              type="submit"
              className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
