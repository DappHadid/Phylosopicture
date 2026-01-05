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
                <p className="text-sm text-green-400">{`Users: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

export default function UsersChart({ data }) {
    return (
        <>
            <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                👥 User Growth
            </h3>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255, 255, 255, 0.1)"
                        />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                        <YAxis
                            stroke="#94a3b8"
                            fontSize={12}
                            allowDecimals={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey="users"
                            fill="#22c55e"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

UsersChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            users: PropTypes.number.isRequired,
        })
    ).isRequired,
};
