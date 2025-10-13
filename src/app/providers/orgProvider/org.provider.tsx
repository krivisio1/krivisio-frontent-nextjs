"use client";
import { ReactNode, useEffect, useState } from "react";
import { OrgContext } from "./org.context";
import { CreateOrgSchemaType } from "@/app/onboarding/new-org/org.schema";
import {
  getAllOrgInvitation,
  getAllOrgMembers,
  saveOrganization,
} from "./org.api";
import { useAxios } from "@/services/axios/axios.context";
import { toast } from "react-toastify";
import { UseUserContext } from "../userProvider/user.context";
import { USER_ROLES } from "@/app/constant";

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();
  const { userData, fetchUserData } = UseUserContext();

  const [orgMembers, setOrgMembers] = useState<any[] | null>([]);
  const [invitations, setInvitations] = useState<any[] | null>([]);
  const [isSkipped, setSkipped] = useState<boolean>(false);

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
    if (
      !userData ||
      userData.role != USER_ROLES.PROJECT_MANAGER ||
      !userData.organization
    )
      return;
    try {
      const org_id = userData.organization.id;
      const res = await getAllOrgMembers(axios, org_id);
      if (res.length > 0) {
        setOrgMembers(res);
      }
    } catch (error: any) {}
  }

  async function getOrgInvitations() {
    if (
      !userData ||
      userData.role != USER_ROLES.PROJECT_MANAGER ||
      !userData.organization
    )
      return;
    const org_id = userData.organization.id;

    try {
      const res = await getAllOrgInvitation(axios, org_id);
      if (res) {
        setInvitations(res);
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!userData || !userData.organization) return;
    getOrgInvitations();
    // getOrgMembers();
  }, [userData]);

  async function skipInvitePage() {
    localStorage.setItem("skippedInvitePage", "true");
    setSkipped(true);
  }
  useEffect(() => {
    const skipped = localStorage.getItem("skippedInvitePage");
    setSkipped(!!skipped);
  }, []);

  return (
    <OrgContext.Provider
      value={{
        createOrganization,
        isSkipped,
        getOrgMembers,
        orgMembers,
        invitations,
        skipInvitePage,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}
