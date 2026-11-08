import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 5000,
  duration: "15s",
};

export default function () {
  const res = http.get("http://localhost:9000/api/v1/movies/recommended");

  if (res.status !== 200) {
    console.log("Fail:" + res.status);
  }
}
