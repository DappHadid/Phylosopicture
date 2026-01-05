import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

// Tooltip kustom dengan tema gelap
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#444444] p-2 border border-gray-600 rounded-lg shadow-lg">
                <p className="text-sm font-medium text-gray-300">{label}</p>
                <p className="text-sm text-[#DA0037] font-semibold">
                    {`Penjualan: Rp ${payload[0].value.toLocaleString(
                        "id-ID"
                    )}`}
                </p>
            </div>
        );
    }
    return null;
};

export default function SalesChart({ data }) {
    // Catatan: Komponen ini sekarang tidak memiliki latar belakang sendiri.
    // Latar belakang diatur oleh komponen induknya (misal: Dashboard.jsx).
    return (
        <>
            <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                📈 Sales Analysis
            </h3>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="colorSales"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#DA0037"
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#DA0037"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255, 255, 255, 0.1)"
                        />
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                        <YAxis
                            stroke="#9ca3af"
                            fontSize={12}
                            tickFormatter={(value) =>
                                `Rp ${(value / 1000).toFixed(0)}k`
                            }
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#DA0037"
                            strokeWidth={2}
                            fill="url(#colorSales)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

SalesChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            sales: PropTypes.number.isRequired,
        })
    ).isRequired,
};
