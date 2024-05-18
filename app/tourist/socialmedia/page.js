"use client";

import Post from "@/components/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [isClosed, setIsClosed] = useState(true);
  const [city, setcity] = useState("");
  const [possession, setPossession] = useState("");
  const [sort, setSort] = useState("");
  const { data: session, status } = useSession();

  const fetchPosts = async ({ pageParam }) => {
    return await axios
      .get(
        `/api/getPosts?page=${pageParam}&city=${city}&possession=${possession}&sort=${sort}`
      )
      .then((res) => res.data);
  };

  const { data, refetch, isLoading } = useInfiniteQuery({
    queryKey: ["getPosts"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage;
    },
  });

  useEffect(() => {
    refetch();
  }, [city, possession, sort]);

  return (
    <div className="relative w-full h-full flex flex-col bg-gradient-to-r from-indigo-50 to-indigo-100">
      {status === "loading" || isLoading ? (
        <div
          className="absolute bg-white bg-opacity-100 z-10 h-full w-full flex items-center justify-center"
          id="loader"
        >
          <div className="flex items-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        </div>
      ) : null}
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
          <header className="fixed w-full border-bs shadow-sm shadow-indigo-300 bg-white p-2 flex justify-around items-center z-20">
            <select
              id="cities_select"
              class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              onChange={(e) => setcity(e.target.value)}
            >
              <option value="">All Cities</option>
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
              onChange={(e) => setPossession(e.target.value)}
            >
              <option value="">All Posts</option>
              <option value={session?.user.email}>My Posts</option>
            </select>
            <select
              id="filter_select"
              class="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Relevant</option>
              <option value="recent">Recent</option>
              <option value="mostVoted">Most Voted</option>
            </select>
          </header>
          <div className="mt-16">
            {/* post start */}
            {data?.pages.map((posts) =>
              posts.map((post) => {
                return (
                  <Post post={post} setIsClosed={setIsClosed} key={post.id} />
                );
              })
            )}
            {/* post start */}
          </div>
        </main>
      </div>
    </div>
  );
}
