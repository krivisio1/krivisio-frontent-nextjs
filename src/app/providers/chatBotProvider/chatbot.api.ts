import { AxiosInstance } from "axios";
import { CategoryData } from "./chatbot.types";

export async function projectBreakdownApi(
  axios: AxiosInstance,
  message: string,
) {
  const res = await axios.post("/api/chatbot/project/breakdown", {
    prompt: message,
  });
  return res?.data?.data;
}
