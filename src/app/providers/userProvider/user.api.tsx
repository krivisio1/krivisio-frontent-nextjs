import { AxiosInstance } from "axios";

export async function getUser(axios: AxiosInstance) {
  const res = await axios.get("/api/users/details");
  return res.data;
}
