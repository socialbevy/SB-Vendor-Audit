import Link from "next/link";
import OnboardingCard from "../cards/OnboardingCard";
import ubuntu from "@/utils/ubuntu";

const Onboarding = ({ dashboard }) => {
  return (
    <div className="p-4 pb-8 border-b border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="p-4">
          <h3 className={`text-lg font-semibold text-red-600 mb-1 ${ubuntu.className}`}>How Social Bevy works</h3>
          <p>Follow the onboarding steps to get started creating offers, ultimately driving more business to you!</p>
        </div>
        <Link
          className="cursor-pointer group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
          href={"/settings/locations?backToDashboard=true"}
        >
          <div className="h-full flex w-full">
            <OnboardingCard
              completed={dashboard?.locations_count > 0}
              number={1}
            >
              <h3 className="text-lg font-semibold">Create Your Locations</h3>
              <p className="text-gray-800">Locations are used within your offers to specify certain deals at locations of your choosing.</p>
            </OnboardingCard>
          </div>
        </Link>
        <Link
          className="cursor-pointer group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
          href={{
            pathname: "/offers",
            query: { showCreateOfferForm: true }
          }}
        >
          <div className="h-full flex w-full">
            <OnboardingCard
              completed={dashboard?.offers_count > 0}
              number={2}
            >
              <h3 className="text-lg font-semibold">Create Your Offers</h3>
              <p className="text-gray-800">Offers can be redeemed or saved for later use by Social Bees.</p>
            </OnboardingCard>
          </div>
        </Link>
        <Link
          className="cursor-pointer group relative transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
          href={"/settings/subscription"}
        >
          <div className="h-full flex w-full">
            <OnboardingCard
              completed={dashboard?.membershipPlan === "Soci-Data Advanced"}
              number={3}
            >
              <h3 className="text-lg font-semibold">Subscribe to Soci-Data Advanced Plan</h3>
              <p className="text-gray-800">In order to have active offers, subscribe to our Soci-Data Advanced plan!</p>
            </OnboardingCard>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Onboarding;
