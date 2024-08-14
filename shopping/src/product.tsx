import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginButton from './login';

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Axios.get('https://fakestoreapi.com/products').then((result) => {
      setProducts(result.data);
    });
    Axios.get('https://fakestoreapi.com/products/categories').then((result) => {
      setCategories(result.data);
    });
  }, []);

  const handleNavigate = (id) => {
    navigate(`/details/${id}`);
  };

  const filteredProducts = products.filter(product => {
    const inCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const inSearch = product.title.toLowerCase().includes(search.toLowerCase());
    return inCategory && inPriceRange && inSearch;
  });

  return (
    <div className="container mx-auto p-4 hover : outline">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 ">Filters</h2>
        <div className="flex space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded hover: outline"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="flex space-x-2 items-center ">
            <label htmlFor="minPrice" className="text-sm">Min Price ($):</label>
            <input
              type="number"
              id="minPrice"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="p-2 border rounded w-20 hover:outline"
            />
            <label htmlFor="maxPrice" className="text-sm">Max Price ($):</label>
            <input
              type="number"
              id="maxPrice"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="p-2 border rounded w-20 hover:outline"
            />
            <div>
              <input 
                className="flex justify-center" 
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:outline">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2"> {product.title.length > 30 ? `${product.title.substring(0, 30)}...` : product.title}</h2>
              <p className="text-gray-600 text-sm truncate">{product.description}</p>
              <p className="text-lg font-bold text-green-600 mt-2">${product.price}</p>
              <div className="text-yellow-500">
                {'★'.repeat(Math.round(product.rating.rate))} 
                {'☆'.repeat(5 - Math.round(product.rating.rate))} 
                <span className="text-gray-600 text-sm ml-2">({product.rating.count} reviews)</span>
              </div>
              <button
                onClick={() => handleNavigate(product.id)}
                className="bg-green-600 text-white mt-4 py-2 px-10 rounded hover:bg-green-700 transition duration-300"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;


