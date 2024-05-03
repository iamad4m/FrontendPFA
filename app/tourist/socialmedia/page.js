"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [votes, setVotes] = useState(0);
  const [isClosed, setIsClosed] = useState(true);
  const [isUpVoted, setIsUpVoted] = useState(false);
  const [isDownVoted, setIsDownVoted] = useState(false);
  return (
    <div className="relative min-h-screen h-screen flex flex-col bg-gradient-to-r from-indigo-50 to-indigo-100">
      <div
        className={
          isClosed
            ? "absolute bg-gray-600/50 left-0 top-0 h-full w-full hidden"
            : "absolute bg-gray-600/50 left-0 top-0 h-full w-full"
        }
      >
        {/*This will be displayed when the drawer is shown*/}
      </div>
      <div className="flex-1 flex flex-row overflow-hidden">
        <main className="flex-1 border-indigo-300 text-xs overflow-y-auto no-scrollbar">
          <header className="fixed w-full border-bs shadow-sm shadow-indigo-300 bg-white p-2 flex justify-around items-center">
            <select
              id="cities_select"
              class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="all cities" selected>
                All Cities
              </option>
              <option value="fez">Fez</option>
              <option value="casablanca">Casablanca</option>
              <option value="rabat">Rabat</option>
              <option value="meknes">Meknes</option>
              <option value="marrakech">Marrakech</option>
              <option value="tangier">Tangier</option>
            </select>
            <select
              id="posts_select"
              class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="all cities" selected>
                All Posts
              </option>
              <option value="mine">My Posts</option>
            </select>
          </header>
          <div className="mt-16">
            {/* post start */}
            <div className="leading-10 p-3 flex justify-center">
              <div className="w-3/4 bg-white border border-indigo-700 rounded-lg shadow">
                <div className="flex items-center justify-between py-4 px-3">
                  <div className="flex items-center">
                    <img
                      className="rounded-full w-10 h-10 border-2 border-indigo-700"
                      src="https://api.dicebear.com/8.x/thumbs/svg?radius=50&backgroundType=gradientLinear"
                    />
                    <div className="pl-2">
                      <div className="font-semibold">
                        <p>John Doe</p>
                      </div>
                    </div>
                    <div className="pl-2 text-black/60 font-extrabold text-xl">
                      <p>·</p>
                    </div>
                    <div className="pl-2 text-black/60">
                      <p>02 Mai, 2024</p>
                    </div>
                  </div>
                </div>
                <p className="mb-5 text-base text-gray-500 sm:text-lg px-3">
                  Dear Network, <br />
                  Ullamco reprehenderit aliqua occaecat minim deserunt. Culpa ut
                  aliqua eu pariatur fugiat. Laborum fugiat sint eiusmod
                  consectetur ullamco dolore aliquip consequat. Pariatur laboris
                  magna adipisicing enim occaecat proident consectetur est
                  occaecat voluptate nostrud pariatur do amet.
                </p>
                <div className="bg-gray-300 w-3/4 mx-auto mb-3">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
                    width="100%"
                    height="480"
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="bg-white border border-t-gray-300 rounded-b-lg w-full flex items-center justify-around p-2">
                  <div className="flex items-center space-x-4">
                    <button
                      className="p-2 border border-indigo-700 rounded-full"
                      onClick={() => {
                        if (isUpVoted) {
                          setVotes(votes - 1);
                        } else {
                          if (isDownVoted) {
                            setVotes(votes + 2);
                            setIsDownVoted(!isDownVoted);
                          } else {
                            setVotes(votes + 1);
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
                          setVotes(votes + 1);
                        } else {
                          if (isUpVoted) {
                            setVotes(votes - 2);
                            setIsUpVoted(!isUpVoted);
                          } else {
                            setVotes(votes - 1);
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
                        "drawer-right" + 1
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
                  <button>
                    <img
                      src="/fork-post.svg"
                      className="h-5 w-5"
                      title="Fork Circuit"
                    />
                  </button>
                </div>
              </div>
            </div>
            {/* post start */}
          </div>
        </main>
      </div>
      {/* drawer start */}
      <div
        id={"drawer-right" + 1}
        className="fixed top-0 right-0 z-40 h-screen overflow-y-auto no-scrollbar transition-transform translate-x-full bg-white w-1/3 shadow-2xl flex flex-col justify-between scroll-smooth"
        tabindex="-1"
        aria-labelledby="drawer-right-label"
      >
        <div class="fixed right-1 top-2/3 transform -translate-y-1/2 w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full">
          <Link href="#comment-input">
            <img src="/down-comment.svg" />
          </Link>
        </div>
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
                const drawer = document.getElementById("drawer-right" + 1);
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
          <div id="drawer-comments" className="bg-white mt-4 mr-10">
            <div class="border rounded-md p-3 ml-3 my-3">
              <div class="flex gap-3 items-center">
                <img
                  src="https://api.dicebear.com/8.x/thumbs/svg?radius=50&backgroundType=gradientLinear"
                  class="object-cover w-8 h-8 rounded-full 
                            border-2 border-indigo-400  shadow-indigo-400
                            "
                />

                <h3 class="font-bold">John Doe</h3>
              </div>

              <p class="text-gray-600 mt-2">
                this is sample commnent Quis ullamco laboris eiusmod anim. Enim
                proident esse qui mollit fugiat dolor reprehenderit laborum sit.
                Commodo occaecat nulla dolore Lorem ut qui deserunt. Id minim
                est consequat occaecat in in in commodo dolore.
              </p>
            </div>
          </div>
        </div>
        <div
          id="comment-input"
          className="w-full max-w-2xl bg-white rounded-t-lg border p-2 mx-auto mt-20"
        >
          <div class="px-3 mb-2 mt-2">
            <textarea
              placeholder="Leave a comment..."
              class="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium focus:outline-none focus:bg-white"
            ></textarea>
          </div>
          <div class="flex justify-end px-4">
            <button className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500">
              Comment
            </button>
          </div>
        </div>
      </div>
      {/* drawer end */}
    </div>
  );
}
