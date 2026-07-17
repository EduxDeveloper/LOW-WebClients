import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);

  // Fetch cart from backend when user changes
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setCartId(null);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/carts/client/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setCartId(data._id);
            // Map backend structure to frontend structure
            const formattedItems = data.products.map(p => ({
              product: p.productId,
              quantity: p.quantity,
              size: p.size,
              subtotal: p.subtotal
            })).filter(p => p.product); // Ensure product exists
            setCartItems(formattedItems);
          } else {
            setCartItems([]);
            setCartId(null);
          }
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [user]);

  // Sync cart to backend
  const syncCartToBackend = useCallback(async (newItems) => {
    if (!user) return;

    const payload = {
      clientId: user._id,
      products: newItems.map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
        size: item.size
      })),
      status: 'pending'
    };

    try {
      const res = await fetch(`http://localhost:4000/api/carts/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.cart) setCartId(data.cart._id);
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  }, [user]);

  const addToCart = (product, quantity, size) => {
    if (!user) return; // Protected by UI but just in case
    
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product._id === product._id && item.size === size
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = [...prevItems];
        // FIX: Deep clone the item so StrictMode double-invocations don't mutate the same object
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
      } else {
        updatedItems = [...prevItems, { product, quantity, size }];
      }
      
      syncCartToBackend(updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => !(item.product._id === productId && item.size === size));
      syncCartToBackend(updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        (item.product._id === productId && item.size === size)
          ? { ...item, quantity: newQuantity }
          : item
      );
      syncCartToBackend(updatedItems);
      return updatedItems;
    });
  };

  const clearCart = async () => {
    setCartItems([]);
    if (cartId) {
      try {
        await fetch(`http://localhost:4000/api/carts/${cartId}`, { method: 'DELETE' });
        setCartId(null);
      } catch(e) {
        console.error('Error clearing cart:', e);
      }
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
