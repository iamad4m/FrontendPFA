import { NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";
import { getAccessToken } from "@/utils/SessionTokenAccessor";

export async function GET(request) {
  let accessToken = await getAccessToken();
  const urlObject = new URL(request.url);
  const page = Number(urlObject.searchParams.get("page").trim());
  const city = urlObject.searchParams.get("city")?.trim();
  const possession = urlObject.searchParams.get("possession")?.trim();
  const sort = urlObject.searchParams.get("sort")?.trim();
  const url = `${process.env.DEMO_BACKEND_URL}/api/posts?page=${page}&city=${
    city || ""
  }&possession=${possession || ""}&sort=${sort || ""}`;

  const response = await axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((r) => r.data);

  const modifiedResponse = await Promise.all(
    response.map(async (element) => {
      const myRoute = await axios
        .post(
          "http://localhost:3000/api/optimalRoute",
          element.calculationRequirements
        )
        .then((r) => r.data);
      return { ...element, route: myRoute };
    })
  );

  return NextResponse.json(modifiedResponse);
}
