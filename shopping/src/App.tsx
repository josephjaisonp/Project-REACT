import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './product';
import ProdutDetail from './ProductDetail';
import Navbar from './navbar.tsx/navbar';
import { CartProvider } from './context';
import Cart from './cart';
import LoginButton from './login';
import Profile from './profile';
import Portal from './navbar.tsx/portal';
import Dashboard from './Dashboard';
//import ComparisonPage from './ComparisonPage';


// import ProductCard from './ProductCard';



// import Login from './pages/Login';
// import Welcome from './pages/Welcome';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/welcome" element={<Welcome />} /> */}
          <Route path="/" element={<ProductList />} />
          <Route path='/details/:id' element={<ProdutDetail />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<LoginButton/>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/portal' element={<Portal/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          {/*<Route path="/compare" element={<ComparisonPage />} />*/}




          

        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
