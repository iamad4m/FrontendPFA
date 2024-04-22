import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const urlObject = new URL(request.url);
  const email = urlObject.searchParams.get("email").trim();
  const url = `${process.env.DEMO_BACKEND_URL}/api/circuits/${email}`;

  const resp = await axios.get(url).then((rs) => rs.data);

  return NextResponse.json(resp);
}
