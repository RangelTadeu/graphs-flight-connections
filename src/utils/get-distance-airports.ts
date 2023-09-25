import haversine from "haversine";
import { airports } from "../data/airports";

export const getAiportsDistance = (source, destination, unit = "mile") => {
  const getLatLon = (airport) => {
    const { latitude, longitude } = airport;

    return { latitude, longitude };
  };

  const res = haversine(
    getLatLon(airports.find((a) => a.iata === source)),
    getLatLon(airports.find((a) => a.iata === destination)),
    { unit }
  );

  return res;
};
