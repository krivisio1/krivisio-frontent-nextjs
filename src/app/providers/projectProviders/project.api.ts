import { AxiosInstance } from "axios";
import { CategoryData } from "./project.types";

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

export async function getAllProjectApi(
  axios: AxiosInstance,
  page: number,
  perpage: number,
) {
  const res = await axios.get(
    `/api/projects/?page=${page}&per_page=${perpage}`,
  );
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

export async function getAllProjectsApi() {}

export async function generateSrsApi(
  axios: AxiosInstance,
  additionalInstructions: string,
  selectedCategoryContent: string,
  selectedCategory: string,
) {
  const res = await axios.post("/api/chatbot/project/srs", {
    content: additionalInstructions,
    category_selected: selectedCategory,
    category_content: selectedCategoryContent,
  });
  return res?.data?.data;
}
