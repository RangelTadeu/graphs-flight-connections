import haversine from "haversine";
import { airports } from "../data/airports";

interface AirportProps {
  source: string;
  destination: string;
  unit?: "km" | "mile" | "meter" | "nmi";
}

export const getAiportsDistance = (props: AirportProps) => {
  const getLatLon = (airport) => {
    const { latitude, longitude } = airport;

    return { latitude, longitude };
  };

  const res = haversine(
    getLatLon(airports.find((a) => a.iata === props.source)),
    getLatLon(airports.find((a) => a.iata === props.destination)),
    { unit: props.unit }
  );

  return res;
};
