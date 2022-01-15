import axios from "axios";
export function getTrips() {
  return axios.get("/api/trips");
}
