import { AxiosInstance } from "axios";

export const signUpUser = async (
  name: string,
  email: string,
  password: string,
  axios: AxiosInstance,
) => {
  const res = await axios.post("/api/auth/sign-up", { name, email, password });
  return res?.data;
};

export async function changeRole(
  axios: AxiosInstance,
  role: "PROJECT_MANAGER" | "DEVELOPER",
) {
  const res = await axios.post(`/api/auth/change-role?role=` + role);

  return res.data;
}
