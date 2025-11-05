import React from "react";
import Metrics from "./Metrics";
import Onboarding from "./Onboarding";
import Spinner from "../shared/Spinner";
import WelcomeHeader from "./WelcomeHeader";
import { useDashboard } from "@/lib/features/dashboard/useDashboard";

const Dashboard = ({ vendorId }) => {
  const { data: dashboard, isLoading } = useDashboard(vendorId);
  
  if (isLoading) return <Spinner />;

  const isOnboarded = () => {
    return (
      dashboard?.locations_count > 0 &&
      dashboard?.offers_count > 0 &&
      dashboard?.membershipPlan === "Soci-Data Advanced"
    );
  };

  return (
    <main className="mt-20 md:mt-0">
      <WelcomeHeader vendorName={dashboard?.vendor_first_name} />
      {!isOnboarded() && <Onboarding dashboard={dashboard} />}
      <Metrics dashboard={dashboard} />
    </main>
  );
};

export default Dashboard;