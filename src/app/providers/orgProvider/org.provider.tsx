"use client";
import {
  ReactNode,
  startTransition,
  useEffect,
  useState,
  useTransition,
} from "react";
import { OrgContext } from "./org.context";
import { CreateOrgSchemaType } from "@/app/onboarding/new-org/org.schema";
import {
  createInvitation,
  getAllOrgInvitation,
  getAllOrgMembers,
  getInvitationInfo,
  respondInvitation,
  saveOrganization,
} from "./org.api";
import { useAxios } from "@/services/axios/axios.context";
import { toast } from "react-toastify";
import { UseUserContext } from "../userProvider/user.context";
import { USER_ROLES } from "@/app/constant";
import { usePathname, useRouter } from "next/navigation";
import { InviteForm, JoinForm } from "@/app/invite/invite.schema";

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios();
  const { userData, fetchUserData } = UseUserContext();

  const pathname = usePathname();
  const router = useRouter();

  const [orgMembers, setOrgMembers] = useState<any[] | null>([]);
  const [invitations, setInvitations] = useState<any[] | null>([]);
  const [isSkipped, setSkipped] = useState<boolean>(false);
  const [devInvitation, setDevInvitaiton] = useState<any>(null);
  const [isInvitationfetching, startInvitationFecthing] = useTransition();

  async function createOrganization(data: CreateOrgSchemaType) {
    try {
      const res = await saveOrganization(axios, data);
      if (!res) toast.error(res?.meta?.message);
      else {
        toast.success(res);
        router.replace("/invite");
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

  async function createInvitations(data: InviteForm) {
    if (
      !userData ||
      userData.role != USER_ROLES.PROJECT_MANAGER ||
      !userData.organization
    )
      return;

    try {
      const res = await createInvitation(axios, data, userData.organization.id);

      if (res) {
        toast.success(res);
        getOrgInvitations();
        skipInvitePage();
        router.replace("/management/dashboard");
      } else {
        toast.error(res?.meta?.message);
      }
    } catch (error: any) {
      toast.error("Something went wrong, try again later");
    }
  }

  async function respondToInvitation(data: JoinForm) {
    if (!userData || userData.role != USER_ROLES.DEVELOPER) return;

    const res = await respondInvitation(axios, data, devInvitation.id);
    if (res) {
      toast.success(res);
      router.replace("/developer/dashboard");
      setDevInvitaiton(null);
    } else {
      toast.error(res?.meta?.message);
    }
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

  useEffect(() => {
    if (!pathname || !userData) return;

    const pathParts = pathname.split("/"); // e.g. [ '', 'invite', 'some-org' ]

    const isInvitePage = pathParts[1] === "invite" && pathParts.length === 3;
    const dynamicOrgName = isInvitePage ? pathParts[2] : null;

    startInvitationFecthing(async () => {
      if (isInvitePage && dynamicOrgName) {
        if (userData.role === USER_ROLES.DEVELOPER) {
          try {
            const res = await getInvitationInfo(axios, dynamicOrgName);
            if (res) setDevInvitaiton(res);
          } catch (error: any) {
            console.log(error);
          }
        }
      }
    });
  }, [pathname, userData]);

  return (
    <OrgContext.Provider
      value={{
        createOrganization,
        isSkipped,
        getOrgMembers,
        orgMembers,
        invitations,
        skipInvitePage,
        isInvitationfetching,
        devInvitation,
        createInvitations,
        respondToInvitation,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}
