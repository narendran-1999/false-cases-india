import React from 'react'
import getCrimeData from '../../data/get-data'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, ChartDataLabels, Filler);

const AreaChart = ({ isMetro, type, crime }) => {
  const { data, title } = getCrimeData(crime, isMetro)
  
  const years = data.map((row) => row[0]);

  // Calculate datasets based on `type`
  const isPercentage = type === 'percent';

  const falseCases = isPercentage
    ? data.map((row) => ((row[1] + row[2] + row[3]) / (row[1] + row[2] + row[3] + row[4])) * 100)
    : data.map((row) => row[1] + row[2] + row[3]);

  const maliciousCases = isPercentage
    ? data.map((row) => ((row[1] + row[2]) / (row[1] + row[2] + row[3] + row[4])) * 100)
    : data.map((row) => row[1] + row[2]);

  const yTitle = isPercentage ? "Percentage (%)" : "No. of Cases";

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Total Fake",
        data: falseCases,
        backgroundColor: "rgba(255,0,0,0.5)",
        borderColor: "rgba(255,50,50,1)",
        fill: true,
      },
      {
        label: "Confirmed Malicious",
        data: maliciousCases,
        backgroundColor: "rgba(255,40,40,0.6)",
        borderColor: "rgba(255,0,0,1)",
        fill: true,
        datalabels: {
          display: false
        }
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          font: {
            weight: "semi-bold",
          },
          color: "#000",
        },
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: yTitle,
        },
        ticks: {
          font: {
            weight: "semi-bold",
          },
          color: "#000",
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
        formatter: (value) => (isPercentage ? `${value.toFixed(2)}%` : value),
        align: "bottom",
        anchor: "end",
        color: "#000",
        font: {
          size: 12,
          weight: "bold",
        },
        padding: 4,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${isPercentage ? `${value.toFixed(2)}%` : value}`;
          },
        },
      },
    },
  };

  return (
    <div className='col-md-12 col-lg-6'>
      <h5 className="chart-title">{title.toUpperCase()}</h5>
      <Line data={chartData} options={options} />
    </div>
  )
}

export default AreaChart