import { getAccessToken } from "@/utils/SessionTokenAccessor";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  let accessToken = await getAccessToken();
  const url = `${process.env.DEMO_BACKEND_URL}/api/circuits`;
  const body = await request.json();
  const resp = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  return NextResponse.json({ message: "success" });
}
