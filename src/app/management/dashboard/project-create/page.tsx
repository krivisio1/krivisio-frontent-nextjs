import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import CreateProjectPage from "./projectcreation";
import { Suspense } from "react";

export default function ProjectCreationPage() {
  return (
    <div className="flex-1">
      <DashboardHeader />
      <Suspense>
        <CreateProjectPage />
      </Suspense>
    </div>
  );
}
