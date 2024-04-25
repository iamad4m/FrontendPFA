export function haversine(coord1, coord2) {
  const R = 6371; // Radius of the Earth in km

  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const dlat = toRadians(lat2 - lat1);
  const dlon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dlon / 2) *
      Math.sin(dlon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
