import { AxiosInstance } from "axios";

export async function getUser(axios: AxiosInstance) {
  const res = await axios.get("/api/users/details");
  return res.data;
}

export async function changeRole(
  axios: AxiosInstance,
  role: "PROJECT_MANAGER" | "DEVELOPER",
) {
  const res = await axios.post(`/api/auth/change-role?role=` + role);

  return res.data;
}
