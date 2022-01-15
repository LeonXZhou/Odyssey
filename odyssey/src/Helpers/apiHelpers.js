import axios from "axios";

export default function apiHelpers() {
  const tripData = () => {
    console.log(axios.get(`/api/trips`));
  };

  return { tripData };
}
