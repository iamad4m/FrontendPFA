import { getAccessToken } from "@/utils/SessionTokenAccessor";
import axios from "axios";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(request) {
  let accessToken = await getAccessToken();
  const urlObject = new URL(request.url);
  const postId = urlObject.searchParams.get("postId").trim();
  const votes = urlObject.searchParams.get("votes").trim();

  const url = `${process.env.DEMO_BACKEND_URL}/api/posts/votes`;

  const body = {
    postId: postId,
    votes: votes,
  };

  const formBody = querystring.stringify(body);
  const resp = await axios
    .post(url, formBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((rs) => rs.data);

  return NextResponse.json({ message: "success" });
}
