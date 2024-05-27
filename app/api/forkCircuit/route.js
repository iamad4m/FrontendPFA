import { getAccessToken } from "@/utils/SessionTokenAccessor";
import axios from "axios";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(request) {
  let accessToken = await getAccessToken();
  const urlObject = new URL(request.url);
  const email = urlObject.searchParams.get("email").trim();
  const circuitId = urlObject.searchParams.get("circuitId").trim();

  const url = `${process.env.DEMO_BACKEND_URL}/api/posts/fork`;

  const body = {
    email: email,
    circuitId: circuitId,
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
