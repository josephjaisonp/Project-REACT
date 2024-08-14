import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement);

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface BarChartProps {
  products: Product[];
  selectedGraphType: 'bar' | 'line';
  selectedDataType: 'price' | 'rating';
}

const BarChart: React.FC<BarChartProps> = ({ products, selectedGraphType, selectedDataType }) => {
  const chartData = {
    labels: products.map(product => product.title),
    datasets: [
      {
        label: selectedDataType === 'price' ? 'Price ($)' : 'Rating (0-5)',
        data: products.map(product => selectedDataType === 'price' ? product.price : product.rating.rate),
        backgroundColor: selectedGraphType === 'bar' ? 'rgba(75, 192, 192, 0.6)' : 'rgba(153, 102, 255, 0.6)',
        borderColor: selectedGraphType === 'bar' ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        fill: selectedGraphType === 'line', 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Product',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: selectedDataType === 'price' ? 'Price ($)' : 'Rating (0-5)',
        },
      },
    },
  };

  return (
    <>
      {selectedGraphType === 'bar' ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </>
  );
};

export default BarChart;
