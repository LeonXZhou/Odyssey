import axios from "axios";

export function getTrips() {
  return axios.get("/api/trips");
}

export function getMapForTrip(trip_id) {
  return axios.get(`/api/trips/${trip_id}`);
}

export function getEquipmentForTrip(trip_id) {
  return axios.get(`/api/equipment/${trip_id}`);
}

export function updateQuantity(trip_id, newQuantity, gear_name) {
  return axios.put(`/api/equipment/${trip_id}/quantities`, {
    newQuantity,
    gear_name,
  });
}
