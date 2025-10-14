import { InviteForm, JoinForm } from "@/app/invite/invite.schema";
import { CreateOrgSchemaType } from "@/app/onboarding/new-org/org.schema";

export type orgContextType = {
  createOrganization: (data: CreateOrgSchemaType) => void;
  getOrgMembers: () => void;
  skipInvitePage: () => void;
  orgMembers: any;
  invitations: any;
  isSkipped: boolean;
  isInvitationfetching: boolean;
  devInvitation: any;
  createInvitations: (data: InviteForm) => void;
  respondToInvitation: (data: JoinForm) => void;
};
