import { getAccessToken } from "@/utils/SessionTokenAccessor";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  let accessToken = await getAccessToken();
  const urlObject = new URL(request.url);
  const id = Number(urlObject.searchParams.get("id").trim());
  const url = `${process.env.DEMO_BACKEND_URL}/api/circuits/delete/${id}`;
  const resp = await axios.delete(url, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return NextResponse.json({ message: "deleted" });
}
