import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const urlObject = new URL(request.url);
  const id = Number(urlObject.searchParams.get("id").trim());
  const email = urlObject.searchParams.get("email").trim();
  const url = `${process.env.DEMO_BACKEND_URL}/api/circuits/${email}/${id}`;

  const response = await axios.get(url).then((r) => r.data);
  const obj = {
    city: response.circuit.city.name,
    departureDate: response.circuit.departureTime,
    departureMonument: response.circuit.departureMonument,
    monuments: response.circuit.monuments.filter((monument) => {
      return monument.id !== response.circuit.departureMonument.id;
    }),
  };

  const myRoute = await axios
    .post(
      "http://localhost:3000/api/optimalRoute",
      response.calculationRequirements
    )
    .then((r) => r.data);

  return NextResponse.json({ circuit: obj, route: myRoute });
}
