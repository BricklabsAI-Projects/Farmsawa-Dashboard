import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DailyRequestsData {
  date: string;
  crop_diagnosis: number;
  market_price: number;
  advisory: number;
  order: number;
}

interface RequestsChartProps {
  data: DailyRequestsData[];
}

const RequestsChart: React.FC<RequestsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: 'Crop Diagnosis',
        data: data.map(item => item.crop_diagnosis),
        backgroundColor: '#2E7D32',
        borderColor: '#2E7D32',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Market Price',
        data: data.map(item => item.market_price),
        backgroundColor: '#FBC02D',
        borderColor: '#FBC02D',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Advisory',
        data: data.map(item => item.advisory),
        backgroundColor: '#0288D1',
        borderColor: '#0288D1',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Orders',
        data: data.map(item => item.order),
        backgroundColor: '#F57C00',
        borderColor: '#F57C00',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'Daily Requests by Type',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        usePointStyle: true,
        boxPadding: 5,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [2, 4],
          color: '#eee',
        },
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div className="card">
      <div className="h-[350px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RequestsChart;