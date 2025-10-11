import { CreateOrgSchemaType } from "@/app/onboarding/new-org/org.schema";

export type orgContextType = {
  createOrganization: (data: CreateOrgSchemaType) => void;
  getOrgMembers: () => void;
};
