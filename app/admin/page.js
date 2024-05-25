"use client";

import Comments from "@/components/Comments";
import TouristsCards from "@/components/TouristsCards";
import React, { useState } from "react";
import Blacklisted from "@/components/BlacklistedCards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const page = () => {
  const fetchAllTourists = async () => {
    return axios.get("/api/getTourists").then((res) => res.data);
  };
  const fetchCommentsTmp = async () => {
    return axios.get("/api/getCommentsTmp").then((res) => res.data);
  };
  const fetchBlacklist = async () => {
    return axios.get("/api/getDiabledTourists").then((res) => res.data);
  };

  const {
    data: tourists,
    refetch: refetchTourists,
    isLoading: isLoadingTourists,
  } = useQuery({
    queryKey: ["getTouristsAdmin"],
    queryFn: fetchAllTourists,
  });
  const {
    data: commentsTmp,
    refetch: refetchCommentsTmp,
    isLoading: isLoadingCommentsTmp,
  } = useQuery({
    queryKey: ["getCommentsTmpAdmin"],
    queryFn: fetchCommentsTmp,
  });
  const {
    data: blacklist,
    refetch: refetchBlacklist,
    isLoading: isLoadingBlacklist,
  } = useQuery({
    queryKey: ["getBlackList"],
    queryFn: fetchBlacklist,
  });

  return (
    <>
      {isLoadingTourists || isLoadingCommentsTmp || isLoadingBlacklist ? (
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
      ) : (
        <>
          <TouristsCards
            tourists={tourists}
            refetchTourists={refetchTourists}
            refetchBlacklist={refetchBlacklist}
          />
          <Comments
            commentsTmp={commentsTmp}
            refetchCommentsTmp={refetchCommentsTmp}
          />
          <Blacklisted
            blacklist={blacklist}
            refetchTourists={refetchTourists}
            refetchBlacklist={refetchBlacklist}
          />
        </>
      )}
    </>
  );
};

export default page;
