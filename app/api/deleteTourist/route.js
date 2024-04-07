import axios from "axios";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(request) {
  const urlObject = new URL(request.url);
  const email = urlObject.searchParams.get("email").trim();
  const url = `${process.env.DEMO_BACKEND_URL}/api/tourists/delete`;
  const data = await request.json();

  const body = {
    email: email,
    password: data.deleteConfirm,
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
