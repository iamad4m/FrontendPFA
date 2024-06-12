import { getAccessToken } from "@/utils/SessionTokenAccessor";
import axios from "axios";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(request) {
  let accessToken = await getAccessToken();

  const urlObject = new URL(request.url);
  const email = urlObject.searchParams.get("email").trim();
  const postId = Number(urlObject.searchParams.get("postId"));
  const url = `${process.env.DEMO_BACKEND_URL}/api/commentsTmp/create`;
  const data = await request.json();

  const body = {
    touristEmail: email,
    postId: postId,
    content: data.comment,
  };

  const resp = await axios
    .post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((rs) => rs.data);

  return NextResponse.json({ message: "success" });
}
