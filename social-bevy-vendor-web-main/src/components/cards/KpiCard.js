import ubuntu from "@/utils/ubuntu";

const KpiCard = ({ title, metrics }) => {
  return (
    <div className="bg-gray-800 rounded shadow-md p-4 relative flex flex-col justify-between h-full w-full lg:w-[calc(50%-8px)]">
      <p className={`mb-2 text-gray-200 text-lg font-medium ${ubuntu.className}`}>{title}</p>
      <div className="flex flex-wrap gap-2">
        {metrics.map((metric, idx) => {
          const Icon = metric.Icon;

          return (
            <div
              className="bg-gray-100 min-w-[150px] flex-grow p-2 rounded-md flex flex-col items-center justify-between"
              key={`${metric.title}-${idx}`}
            >
              <Icon width={32} height={32} />
              <h2 className="text-3xl">{metric.metric}</h2>
              <p>{metric.title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default KpiCard;
