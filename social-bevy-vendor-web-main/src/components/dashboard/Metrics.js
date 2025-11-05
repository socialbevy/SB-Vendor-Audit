import { CheckCircleIcon, CurrencyDollarIcon, CursorArrowRippleIcon, RectangleStackIcon, TicketIcon, UserIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import KpiCard from "../cards/KpiCard";

const Metrics = ({ dashboard }) => {
  const { offersCount, activeOffersCount, redemptionsCount, topCustomer, totalRevenue } = dashboard;

  return (
    <div>
      {/* <div className="px-4 py-8">Chart</div> */}
      <div className="px-4 py-8 bg-white rounded flex flex-wrap gap-4">
        <KpiCard
          title="Offers"
          metrics={[
            { title: "Total", Icon: RectangleStackIcon, metric: offersCount },
            { title: "Active Offers", Icon: CheckCircleIcon, metric: activeOffersCount },
            // { title: "Total Clicks", Icon: CursorArrowRippleIcon, metric: 0 },
            { title: "Total Redeemed", Icon: TicketIcon, metric: redemptionsCount },
            { title: "Total Revenue", Icon: CurrencyDollarIcon, metric: `$${totalRevenue}`}
          ]}
        />
        <KpiCard
          title="Customers"
          metrics={[
            { title: "Total", Icon: UserGroupIcon, metric: 0 },
            { title: "Top Customer", Icon: UserIcon, metric: topCustomer || "N/A" }
          ]}
        />
      </div>
    </div>
  )
};

export default Metrics;
