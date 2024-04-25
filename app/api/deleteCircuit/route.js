import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const urlObject = new URL(request.url);
  const id = Number(urlObject.searchParams.get("id").trim());
  const url = `${process.env.DEMO_BACKEND_URL}/api/circuits/delete/${id}`;
  const resp = await axios.delete(url);

  return NextResponse.json({ message: "deleted" });
}
