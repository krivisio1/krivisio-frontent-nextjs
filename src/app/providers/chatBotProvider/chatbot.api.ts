import { AxiosInstance } from "axios";
import { CategoryData } from "./chatbot.types";

export async function projectBreakdownApi(
  axios: AxiosInstance,
  title: string,
  message: string,
) {
  const res = await axios.post("/api/projects/", {
    project_title: title,
    description: message,
  });
  return res?.data?.data;
}

export async function updateProjectApi(
  axios: AxiosInstance,
  title: string,
  message: string,
  projectId: string,
) {
  const res = await axios.put("/api/projects?project_id=" + projectId, {
    project_title: title,
    description: message,
  });
  return res?.data?.data;
}

export async function getProjectDetailsApi(
  axios: AxiosInstance,
  projectId: string,
) {
  const res = await axios.get(`/api/projects/details?project_id=${projectId}`);
  return res?.data?.data;
}

export async function generateSrsApi(axios: AxiosInstance, prompt: string) {
  const res = await axios.post("/api/chatbot/project/srs", {
    prompt,
  });
  return res?.data?.data;
}
