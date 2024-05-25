import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const urlObject = new URL(request.url);
  const id = Number(urlObject.searchParams.get("id"));
  const url = `${process.env.DEMO_BACKEND_URL}/api/commentsTmp/validate/${id}`;

  const resp = await axios.post(url).then((rs) => rs.data);

  return NextResponse.json({ message: "success" });
}
