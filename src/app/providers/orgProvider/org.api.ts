import { CreateOrgSchemaType } from "@/app/onboarding/new-org/org.schema";
import { AxiosInstance } from "axios";

export async function getOrganization(axios: AxiosInstance) {
  const res = await axios.get("/api/org");

  return res?.data?.data;
}

export async function saveOrganization(
  axios: AxiosInstance,
  data: CreateOrgSchemaType,
) {
  const res = await axios.post("/api/org/create", data);

  return res?.data?.data;
}

export async function getAllOrgMembers(axios: AxiosInstance, org_id: string) {
  const res = await axios.get("/api/org/members?org_id=" + org_id);

  return res?.data?.data;
}

export async function getAllOrgInvitation(
  axios: AxiosInstance,
  org_id: string,
) {
  const res = await axios.get("/api/org/all-invitations?org_id=" + org_id);

  return res?.data?.data;
}

export async function getInvitationInfo(axios: AxiosInstance, name: string) {
  const res = await axios.get("/api/org/invitation?name=" + name);
  return res?.data?.data;
}
