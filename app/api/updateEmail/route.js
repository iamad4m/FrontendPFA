import axios from "axios";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(request) {
  const urlObject = new URL(request.url);
  const email = urlObject.searchParams.get("email").trim();
  const url = `${process.env.DEMO_BACKEND_URL}/api/tourists/update-email`;
  const data = await request.json();

  const body = {
    currentEmail: email,
    newEmail: data.newEmail,
    password: data.newEmailPassword,
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
