import axios from "axios";
import { NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(request) {
  const urlObject = new URL(request.url);
  const email = urlObject.searchParams.get("email").trim();
  const circuitId = urlObject.searchParams.get("circuitId").trim();
  const content = `Dear Network,
  I want to share with you my exciting adventure. Check it out, and leave any tips or must-see recommendations in the comment section.`;
  const url = `${process.env.DEMO_BACKEND_URL}/api/posts`;

  const body = {
    email: email,
    circuitId: circuitId,
    content: content,
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
