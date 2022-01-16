import axios from "axios";

export function getTrips() {
  return axios.get("/api/trips");
}

export function getMapForTrip(trip_id) {
  return axios.get(`/api/trips/${trip_id}`);
}

export function getEquipmentForTrip(trip_id) {
  console.log(axios.get(`/api/equipment/${trip_id}`));
}
