import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = `${process.env.DEMO_BACKEND_URL}/api/monuments`;
  const resp = await axios.get(url).then((rs) => rs.data);

  return NextResponse.json(resp);
}
