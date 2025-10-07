import { DashboardHeader } from "../partials/DashboardHeader";
import PMHomePage from "./partials/homepage";

export default function homePage() {
  return (
    <div className="flex bg-white min-h-screen">
      {/* <ExactSidebar /> */}
      <div className="flex-1 ml-16">
        <DashboardHeader />
        <div className="p-6">
          <PMHomePage />
        </div>
      </div>
    </div>
  );
}
