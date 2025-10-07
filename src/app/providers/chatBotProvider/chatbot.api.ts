import { AxiosInstance } from "axios";
import { ChatBotData } from "./chatbot.type";

export async function fetchChatbotResponse(
  axios: AxiosInstance,
  data: ChatBotData,
) {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_CHATBOT_API_URL + "/side-tools/cocomo2-parameters",
    data,
  );

  return res?.data;
}
