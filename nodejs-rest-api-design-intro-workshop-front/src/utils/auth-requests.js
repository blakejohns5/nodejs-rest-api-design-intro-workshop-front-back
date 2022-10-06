import axios from "axios";
import { getCurrentUserToken } from "../firebase/firebase";

export async function syncUserData() {
  const userToken = await getCurrentUserToken();

  return axios({
    method: "POST",
    url: "http://localhost:4000/sign-up",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
