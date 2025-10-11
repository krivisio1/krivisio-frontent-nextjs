import { ProfileForm } from "@/app/onboarding/setup-profile/profile.schema";
import { AxiosInstance } from "axios";

export async function getUser(axios: AxiosInstance) {
  const res = await axios.get("/api/users/details");
  return res?.data?.data;
}

export async function getDevProfile(axios: AxiosInstance) {
  const res = await axios.get("/api/users/dev");
  return res?.data?.data;
}

export async function saveDevProfile(axios: AxiosInstance, data: ProfileForm) {
  const res = await axios.post("/api/users/dev", data);
  return res?.data?.data;
}
