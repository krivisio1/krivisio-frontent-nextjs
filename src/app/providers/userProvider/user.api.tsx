import { AxiosInstance } from "axios";

export async function getUser(axios: AxiosInstance) {
  const res = await axios.get("/api/users/details");
  return res?.data?.data;
}

export async function getDevProfile(axios: AxiosInstance) {
  const res = await axios.get("/api/users/dev");
  return res?.data?.data;
}
