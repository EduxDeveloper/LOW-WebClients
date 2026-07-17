import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import './MyOrders.css';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user._id) {
      Swal.fire({
        title: '¡Atención!',
        text: 'Debes iniciar sesión para ver tus pedidos.',
        icon: 'warning',
        confirmButtonText: 'Ir a Login',
        confirmButtonColor: '#111',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/orders/client/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Network error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return <div className="page-container my-orders-page"><p className="loading-text">Cargando tus pedidos...</p></div>;
  }

  return (
    <div className="page-container my-orders-page">
      <div className="my-orders-content">
        <h1 className="my-orders-title">Mis Pedidos</h1>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>Aún no has realizado ningún pedido.</p>
            <button className="shop-now-btn" onClick={() => navigate('/tienda')}>Ir a la tienda</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-id-label">Pedido N° </span>
                    <span className="order-id">{order._id}</span>
                  </div>
                  <div className={`order-status status-${order.status}`}>
                    {order.status.toUpperCase()}
                  </div>
                </div>

                <div className="order-date">
                  Fecha: {new Date(order.createdAt).toLocaleDateString()}
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={`${item._id || index}`} className="order-item">
                      <div className="order-item-image">
                        {item.product && item.product.images && item.product.images.length > 0 ? (
                          <img src={item.product.images[0].image} alt={item.product.name} />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </div>
                      <div className="order-item-details">
                        <p className="order-item-name">{item.product ? item.product.name : 'Producto Eliminado'}</p>
                        <p className="order-item-variant">Talla: {item.size || 'N/A'}</p>
                        <p className="order-item-qty">Cantidad: {item.quantity}</p>
                      </div>
                      <div className="order-item-price">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total-label">Total del Pedido:</div>
                  <div className="order-total-value">${order.total.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
