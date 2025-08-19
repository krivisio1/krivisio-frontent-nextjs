import { ExactSidebar } from "@/components/dashboard/ExactSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import PMHomePage from "@/components/dashboard/ExactMainContent";

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
