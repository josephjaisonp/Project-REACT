import { useCart } from './context';

const Cart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };


  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      {cart.length === 0 ? (
        <div className="text-center py-10 text-lg font-bold">
          Your cart is empty!
        </div>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="w-full mx-auto bg-gray-400 shadow-md rounded-lg overflow-hidden mt-5">
            <div className="p-5">
              <img src={item.image} alt={item.title} className="w-half h-40 object-center rounded-lg" />
            </div>
            <div className="px-5 py-2">
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <h3 className="text-md font-medium text-gray-600">{item.category}</h3>
              <div className="flex items-center mb-2">
                <h3 className="text-md font-medium text-gray-600">{item.rating.rate}</h3>
                <span className="text-sm font-light text-gray-500">({item.rating.count})</span>
              </div>
              <h4 className="text-lg font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</h4>
              <p className="text-sm font-light text-gray-600">{item.description}</p>
              <div className="flex items-center mb-2">
                <button
                  onClick={() => decrementQuantity(item.id)}
                  className="bg-gray-300 text-gray-800 py-1 px-3 rounded-l hover:bg-gray-400"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item.id)}
                  className="bg-gray-300 text-gray-800 py-1 px-3 rounded-r hover:bg-gray-400"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      
      {/*total price */}
      <div className="mt-8 p-4 bg-gray-200 rounded-lg">
        <h2 className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
