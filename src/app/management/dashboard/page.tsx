import { ExactSidebar } from "@/app/management/dashboard/partials/ExactSidebar";
import { DashboardHeader } from "@/app/management/dashboard/partials/DashboardHeader";
import PMHomePage from "@/app/management/dashboard/partials/ExactMainContent";

export default function Dashboard() {
  return (
    <div className="flex bg-white min-h-screen">
      {/* <ExactSidebar /> */}
      <div className="flex-1 ml-16">
        <DashboardHeader />
        <PMHomePage/>
      </div>
    </div>
  );
}
