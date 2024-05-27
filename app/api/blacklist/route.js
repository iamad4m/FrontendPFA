import { getAccessToken } from "@/utils/SessionTokenAccessor";
import axios from "axios";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(request) {
  let accessToken = await getAccessToken();

  const urlObject = new URL(request.url);
  const id = urlObject.searchParams.get("id").trim();
  const url = `${process.env.DEMO_BACKEND_URL}/api/tourists/blacklist`;
  const body = {
    id: id,
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
