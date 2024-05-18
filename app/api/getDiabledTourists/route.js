import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const url = `${process.env.DEMO_BACKEND_URL}/api/tourists/disabled`;

  const response = await axios.get(url).then((r) => r.data);

  return NextResponse.json(response);
}
