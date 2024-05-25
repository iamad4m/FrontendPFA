import axios from "axios";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(request) {
  const urlObject = new URL(request.url);
  const id = urlObject.searchParams.get("id").trim();
  const url = `${process.env.DEMO_BACKEND_URL}/api/tourists/enable`;

  const body = {
    id: id,
  };

  const formBody = querystring.stringify(body);
  const resp = await axios
    .post(url, formBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((rs) => rs.data);

  return NextResponse.json({ message: "success" });
}
