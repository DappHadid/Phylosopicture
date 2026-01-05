import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#444444] p-2 border border-gray-600 rounded-lg shadow-lg">
                <p className="text-sm font-medium text-gray-300">{label}</p>
                <p className="text-sm text-sky-400">{`Terjual: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

export default function MoviesChart({ data }) {
    return (
        <>
            <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                🎬 Most Purchased Movie
            </h3>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255, 255, 255, 0.1)"
                        />
                        <XAxis
                            type="number"
                            stroke="#94a3b8"
                            fontSize={12}
                            allowDecimals={false}
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                            stroke="#94a3b8"
                            fontSize={12}
                            width={120}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey="sales"
                            fill="#38bdf8"
                            radius={[0, 4, 4, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

MoviesChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            sales: PropTypes.number.isRequired,
        })
    ).isRequired,
};
