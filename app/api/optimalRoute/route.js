import { haversine } from "@/utils/haversine";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { coordinates, departure } = await request.json();

  const totalDistance = (route) => {
    let dist = 0;
    // Starting from the departure point to the first waypoint
    let coord1 = departure;
    for (let i = 0; i < route.length; i++) {
      const coord2 = coordinates[route[i]];
      dist += haversine(coord1, coord2);
      coord1 = coord2;
    }
    return dist;
  };

  const optimizeRoute = (coords) => {
    const waypoints = Array.from({ length: coords.length }, (_, i) => i);
    const allRoutes = permute(waypoints);

    const bestRoute = allRoutes.reduce(
      (best, current) => {
        const currentDistance = totalDistance(current);
        if (currentDistance < best.distance) {
          return { route: current, distance: currentDistance };
        }
        return best;
      },
      { route: null, distance: Infinity }
    );
    return bestRoute;
  };

  const permute = (arr) => {
    const result = [];

    const permuteHelper = (tempArr, restArr) => {
      if (restArr.length === 0) {
        result.push(tempArr);
      } else {
        for (let i = 0; i < restArr.length; i++) {
          const nextTemp = tempArr.concat(restArr[i]);
          const nextRest = restArr.slice(0, i).concat(restArr.slice(i + 1));
          permuteHelper(nextTemp, nextRest);
        }
      }
    };

    permuteHelper([], arr);
    return result;
  };

  const bestRoute = optimizeRoute(coordinates);
  return NextResponse.json(bestRoute.route);
}
