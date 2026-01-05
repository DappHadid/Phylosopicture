import React from "react";

export default function StatCard({
    icon,
    title,
    value,
    percentage = 0,
    details = "",
}) {
    const percentageColor =
        percentage > 0
            ? "text-green-400 bg-green-500/10"
            : percentage < 0
            ? "text-red-400 bg-red-500/10"
            : "text-gray-400 bg-gray-500/10";

    return (
        <div className="p-5 rounded-xl bg-[#171717] border border-gray-700 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-[#DA0037]/10 text-[#DA0037]">
                        {icon}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">
                            {title}
                        </p>
                        <h3 className="text-xl font-semibold text-[#EDEDED]">
                            {value}
                        </h3>
                    </div>
                </div>
                <div
                    className={`px-2 py-1 text-xs font-medium rounded-full ${percentageColor}`}
                >
                    {percentage > 0 ? "+" : ""}
                    {percentage.toFixed(1)}%
                </div>
            </div>
            {details && <p className="mt-2 text-xs text-gray-500">{details}</p>}
        </div>
    );
}
