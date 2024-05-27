import { getAccessToken } from "@/utils/SessionTokenAccessor";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  let accessToken = await getAccessToken();
  const urlObject = new URL(request.url);
  const id = Number(urlObject.searchParams.get("id"));
  const url = `${process.env.DEMO_BACKEND_URL}/api/commentsTmp/reject/${id}`;

  const resp = await axios
    .post(url, null, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((rs) => rs.data);

  return NextResponse.json({ message: "success" });
}
