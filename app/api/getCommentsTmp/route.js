import { NextResponse } from "next/server";
import axios from "axios";
import { getAccessToken } from "@/utils/SessionTokenAccessor";

export async function GET(request) {
  let accessToken = await getAccessToken();
  const url = `${process.env.DEMO_BACKEND_URL}/api/commentsTmp`;

  const response = await axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((r) => r.data);

  return NextResponse.json(response);
}
