import { AxiosInstance } from "axios";

export const signUpUser = async (
  email: string,
  password: string,
  axios: AxiosInstance,
) => {
  const res = await axios.post("/api/auth/sign-up", { email, password });
  return res?.data;
};
