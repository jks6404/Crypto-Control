import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { convertNumbers } from "../../../functions/convertNumbers";

// Register necessary Chart.js components
Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart({ chartData, priceType, multiAxis }) {
    console.log(priceType);

    const options = {
        plugins: {
            legend: {
                position: 'top',
                display: multiAxis ? true : false,
            },
        },
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        scales: {
            crypto1: {
                type: "linear",
                display: true,
                position: "left",
                ticks: {
                    callback: function (value) {
                        return priceType === "prices" ? "$" + value.toLocaleString() : "$" + convertNumbers(value);
                    }
                }
            },
            crypto2: {
                type: "linear",
                display: true,
                position: "right",
                ticks: {
                    callback: function (value) {
                        return priceType === "prices" ? "$" + value.toLocaleString() : "$" + convertNumbers(value);
                    }
                }
            }
        }
    };

    return <Line data={chartData} options={options} />;
}

export default LineChart;
