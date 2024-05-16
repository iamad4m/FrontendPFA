import { NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";

export async function GET(request) {
  const urlObject = new URL(request.url);
  const page = Number(urlObject.searchParams.get("page").trim());
  const url = `${process.env.DEMO_BACKEND_URL}/api/posts`;

  const body = {
    page: page,
  };

  const formBody = querystring.stringify(body);

  const response = await axios.get(url, formBody).then((r) => r.data);

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
