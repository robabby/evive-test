import axios from "axios";

export const fetcher = resource =>
  axios
    .get(resource, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.data);
