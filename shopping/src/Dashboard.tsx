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
