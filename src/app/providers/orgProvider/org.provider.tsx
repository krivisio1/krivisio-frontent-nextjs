"use client";
import { ReactNode, useState } from "react";
import { OrgContext } from "./org.context";
import { CreateOrgSchemaType } from "@/app/onboarding/new-org/org.schema";
import { getAllOrgMembers, saveOrganization } from "./org.api";
import { useAxios } from "@/services/axios/axios.context";
import { toast } from "react-toastify";
import { UseUserContext } from "../userProvider/user.context";
import { USER_ROLES } from "@/app/constant";

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();
  const { userData, fetchUserData } = UseUserContext();

  const [orgMembers, setOrgMembers] = useState<any[] | null>([]);

  async function createOrganization(data: CreateOrgSchemaType) {
    try {
      const res = await saveOrganization(axios, data);
      if (!res.data) toast.error(res?.meta?.message);
      else {
        toast.success(res.data);
      }
    } catch (error: any) {
      toast.error("Something went wrong, try again later");
    } finally {
      fetchUserData();
    }
  }

  async function getOrgMembers() {
    if (userData.role != USER_ROLES.PROJECT_MANAGER || !userData.organization)
      return;
    try {
      const org_id = userData.organization.id;
      const res = await getAllOrgMembers(axios, org_id);
      if (res.length > 0) {
        setOrgMembers(res);
      }
    } catch (error: any) {}
  }

  return (
    <OrgContext.Provider value={{ createOrganization, getOrgMembers }}>
      {children}
    </OrgContext.Provider>
  );
}
