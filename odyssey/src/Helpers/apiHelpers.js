import axios from "axios";

export function getTrips() {
  return axios.get("/api/trips");
}

export function getMapForTrip(trip_id) {
  return axios.get(`/api/trips/${trip_id}`)
}

export function getEquipmentForTrip(trip_id) {
  return axios.get(`/api/equipment/${trip_id}`)
}

export function authenticate() {
  return axios.get(`/authenticate`)
}

export function insertNewTrip(user_id,name,startDate,endDate) {
  return axios.post("/api/trips", { user_id: user_id, name: name, startDate: startDate, endDate: endDate})
}