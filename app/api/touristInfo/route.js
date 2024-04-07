import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const urlObject = new URL(request.url);
  const email = urlObject.searchParams.get("email").trim();
  const url = `${process.env.DEMO_BACKEND_URL}/api/tourists/${email}`;
  const resp = await axios.get(url).then((rs) => rs.data);

  return NextResponse.json({
    firstName: resp.firstName,
    lastName: resp.lastName,
    email: resp.email,
    phoneNumber: resp.phoneNumber,
  });
}

export async function POST(request) {
  const urlObject = new URL(request.url);
  const email = urlObject.searchParams.get("email").trim();
  const url = `${process.env.DEMO_BACKEND_URL}/api/tourists/${email}`;
  const body = await request.json();
  const resp = await axios
    .post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((rs) => rs.data);

  return NextResponse.json({ message: "success" });
}
