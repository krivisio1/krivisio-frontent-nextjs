import { DashboardHeader } from "../partials/DashboardHeader";
import CreateProjectPage from "./partials/projectcreation";
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
