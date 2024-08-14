import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './BarChart'; 

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

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedGraphType, setSelectedGraphType] = useState<'bar' | 'line'>('bar');
  const [selectedDataType, setSelectedDataType] = useState<'price' | 'rating'>('price');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(new Set(products.map(product => product.category))).sort();
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Product Statistics</h2>
<div className="flex flex-row justify-evenly">
      <div className="mb-4">
        <label htmlFor="graphType" className="block mb-2 text-sm font-medium text-gray-900">Select Graph Type:</label>
        <select
          id="graphType"
          value={selectedGraphType}
          onChange={(e) => setSelectedGraphType(e.target.value as 'bar' | 'line')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="bar">Bar Graph</option>
          <option value="line">Line Graph</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="dataType" className="block mb-2 text-sm font-medium text-gray-900">Select Data Type:</label>
        <select
          id="dataType"
          value={selectedDataType}
          onChange={(e) => setSelectedDataType(e.target.value as 'price' | 'rating')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Select Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
</div>
      <BarChart
        products={filteredProducts}
        selectedGraphType={selectedGraphType}
        selectedDataType={selectedDataType}
      />
    </div>
  );
};

export default Dashboard;
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Bar,
  Line,
  Pie,
  Radar,
  Doughnut,
  PolarArea,
  Bubble,
  Scatter,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale
);

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

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateColorArray = (length: number) => {
  return Array.from({ length }, () => getRandomColor());
};

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedGraphType, setSelectedGraphType] = useState<
    | 'bar'
    | 'line'
    | 'pie'
    | 'radar'
    | 'doughnut'
    | 'polarArea'
    | 'bubble'
    | 'scatter'
  >('bar');
  const [selectedDataType, setSelectedDataType] = useState<'price' | 'rating'>(
    'price'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          'https://fakestoreapi.com/products'
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  ).sort();
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const chartData = {
    labels: filteredProducts.map((product) => product.title),
    datasets: [
      {
        label: selectedDataType === 'price' ? 'Price ($)' : 'Rating (0-5)',
        data: filteredProducts.map((product) =>
          selectedDataType === 'price' ? product.price : product.rating.rate
        ),
        backgroundColor: generateColorArray(filteredProducts.length),
        borderColor: generateColorArray(filteredProducts.length),
        borderWidth: 2,
        hoverBackgroundColor: generateColorArray(filteredProducts.length),
        hoverBorderColor: generateColorArray(filteredProducts.length),
      },
    ],
  };

  const bubbleChartData = {
    labels: filteredProducts.map((product) => product.title),
    datasets: [
      {
        label: 'Bubble Chart Dataset',
        data: filteredProducts.map((product) => ({
          x: product.price,
          y: product.rating.rate,
          r: Math.sqrt(product.rating.count),
        })),
        backgroundColor: generateColorArray(filteredProducts.length),
      },
    ],
  };

  const scatterChartData = {
    labels: filteredProducts.map((product) => product.title),
    datasets: [
      {
        label: 'Scatter Chart Dataset',
        data: filteredProducts.map((product) => ({
          x: product.price,
          y: product.rating.rate,
        })),
        backgroundColor: generateColorArray(filteredProducts.length),
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
          text:
            selectedGraphType === 'scatter'
              ? 'Rating (0-5)'
              : selectedDataType === 'price'
              ? 'Price ($)'
              : 'Rating (0-5)',
        },
      },
    },
  };

  const renderChart = () => {
    switch (selectedGraphType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      case 'radar':
        return <Radar data={chartData} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={chartOptions} />;
      case 'polarArea':
        return <PolarArea data={chartData} options={chartOptions} />;
      case 'bubble':
        return <Bubble data={bubbleChartData} options={chartOptions} />;
      case 'scatter':
        return <Scatter data={scatterChartData} options={chartOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Product Statistics</h2>
      <div className="flex flex-row justify-evenly">
        <div className="mb-4">
          <label
            htmlFor="graphType"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select Graph Type:
          </label>
          <select
            id="graphType"
            value={selectedGraphType}
            onChange={(e) =>
              setSelectedGraphType(
                e.target.value as typeof selectedGraphType
              )
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="bar">Bar Graph</option>
            <option value="line">Line Graph</option>
            <option value="pie">Pie Chart</option>
            <option value="radar">Radar Chart</option>
            <option value="doughnut">Doughnut Chart</option>
            <option value="polarArea">Polar Area Chart</option>
            <option value="bubble">Bubble Chart</option>
            <option value="scatter">Scatter Plot</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="dataType"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select Data Type:
          </label>
          <select
            id="dataType"
            value={selectedDataType}
            onChange={(e) =>
              setSelectedDataType(e.target.value as 'price' | 'rating')
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {renderChart()}
    </div>
  );
};

export default Dashboard;

*/