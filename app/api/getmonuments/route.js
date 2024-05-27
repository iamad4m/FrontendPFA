import { getAccessToken } from "@/utils/SessionTokenAccessor";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  let accessToken = await getAccessToken();
  const url = `${process.env.DEMO_BACKEND_URL}/api/monuments`;
  const resp = await axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((rs) => rs.data);

  return NextResponse.json(resp);
}
