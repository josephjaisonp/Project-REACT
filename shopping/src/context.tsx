/*import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {CartItem } from './productTypes';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
        setCart(savedCart);
    }, []);

    const addToCart = (product: CartItem) => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        let updatedCart;

        if (existingProductIndex !== -1) {
            updatedCart = cart.map((item, index) =>
                index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (productId: number) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
*/
/*import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from './productTypes';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
useEffect(() => {
  if (user?.email) {
    const storedCarts = localStorage.getItem('carts');
    const carts = storedCarts ? JSON.parse(storedCarts) : {};
    setCartItems(carts[user.email] || []);
  }
}, [user?.email]);







//Update Local storage whenever the cart items change
useEffect(() => {
  if(user?.email) {
      const storedCarts = localStorage.getItem('carts');
      const carts = storedCarts ? JSON.parse(storedCarts) : {};
      carts[user.email]=cartItems; //Update the user's cart
      localStorage.setItem('carts',JSON.stringify(carts)); //save all carts

  }
}, [cartItems,user?.email]);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    setCart(savedCart);
  }, []);

  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const addToCart = (product: CartItem) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart;

    if (existingProductIndex !== -1) {
      updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    saveCart(updatedCart);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCart(updatedCart);
  };

  const incrementQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updatedCart);
  };

  const decrementQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    saveCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};*/
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CartItem } from './productTypes';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from local storage when user logs in
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const storedCarts = localStorage.getItem('carts');
      const carts = storedCarts ? JSON.parse(storedCarts) : {};
      setCart(carts[user.email] || []);
    }
  }, [isAuthenticated, user?.email]);

  // Save cart to local storage when cart items change
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const storedCarts = localStorage.getItem('carts');
      const carts = storedCarts ? JSON.parse(storedCarts) : {};
      carts[user.email] = cart;
      localStorage.setItem('carts', JSON.stringify(carts));
    }
  }, [cart, isAuthenticated, user?.email]);

  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
  };

  const addToCart = (product: CartItem) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    let updatedCart;

    if (existingProductIndex !== -1) {
      updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    saveCart(updatedCart);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCart(updatedCart);
  };

  const incrementQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updatedCart);
  };

  const decrementQuantity = (productId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    saveCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
