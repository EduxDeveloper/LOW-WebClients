import { useState } from 'react';
import './Reviews.css';

const ReviewCard = ({ name, date, title, subtitle, content, isPositive }) => (
  <div className="review-card">
    <div className="review-header">
      <h4 className="reviewer-name">{name}</h4>
      <span className="review-date">{date}</span>
    </div>
    <div className="review-rating">
      <span className="stars">⭐⭐⭐⭐⭐</span>
      <span className={`review-sentiment ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? 'Positiva' : 'Negativa'}
      </span>
    </div>
    <h5 className="review-title">{title}</h5>
    <p className="review-subtitle">{subtitle}</p>
    <p className="review-content">{content}</p>
  </div>
);

const Reviews = () => {
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [hoverStar, setHoverStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  const reviewsData = [
    {
      id: 1,
      name: "María García",
      date: "15 de febrero de 2026",
      title: "Excelente servicio y productos",
      subtitle: "Compra online increíble",
      content: "La tienda tiene productos de muy alta calidad. El servicio al cliente es excepcional y la entrega fue super rápida. Definitivamente volveré a comprar.",
      isPositive: true
    },
    {
      id: 2,
      name: "María García",
      date: "15 de febrero de 2026",
      title: "Excelente servicio y productos",
      subtitle: "Compra online increíble",
      content: "La tienda tiene productos de muy alta calidad. El servicio al cliente es excepcional y la entrega fue super rápida. Definitivamente volveré a comprar.",
      isPositive: true
    },
    {
      id: 3,
      name: "María García",
      date: "15 de febrero de 2026",
      title: "Excelente servicio y productos",
      subtitle: "Compra online increíble",
      content: "La tienda tiene productos de muy alta calidad. El servicio al cliente es excepcional y la entrega fue super rápida. Definitivamente volveré a comprar.",
      isPositive: true
    }
  ];

  return (
    <div className="page-container reviews-page">
      <div className="reviews-header-section">
        <h1 className="page-title">Reseñas de Clientes</h1>
        <button 
          className="write-review-btn" 
          onClick={() => setIsWritingReview(!isWritingReview)}
        >
          {isWritingReview ? 'Mirar Reseñas' : 'Escribir Reseña'}
        </button>
      </div>

      <div className="reviews-summary-block">
        <div className="summary-left">
          <h2 className="summary-score">4.3</h2>
          <div className="summary-stars">⭐⭐⭐⭐★</div>
          <p className="summary-count">Basado en 120 reseñas</p>
        </div>
        <div className="summary-right">
          {[5, 4, 3, 2, 1].map((star, i) => {
            const percentages = [80, 60, 40, 15, 5];
            return (
              <div key={star} className="rating-bar-row">
                <span className="star-label">⭐ {star}</span>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${percentages[i]}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!isWritingReview ? (
        <div className="reviews-list">
          {reviewsData.map(review => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      ) : (
        <div className="review-form-section">
          <h3 className="form-title">Escribe una reseña general</h3>
          
          <div className="form-group">
            <label>Calificacion <span className="req">*</span></label>
            <div className="star-rating-input">
              {[1, 2, 3, 4, 5].map(star => (
                <span 
                  key={star} 
                  className={`interactive-star ${star <= (hoverStar || selectedStar) ? 'filled' : ''}`}
                  onMouseEnter={() => setHoverStar(star)}
                  onMouseLeave={() => setHoverStar(0)}
                  onClick={() => setSelectedStar(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Titulo <span className="req">*</span></label>
            <input type="text" placeholder="Resume tu experiencia" className="form-input" />
          </div>

          <div className="form-group">
            <label>Tipo de experiencia <span className="req">*</span></label>
            <input type="text" placeholder="Ej: Primera compra, Cliente frecuente, etc" className="form-input" />
          </div>

          <div className="form-group">
            <label>Tipo de reseña</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="sentiment" defaultChecked />
                Positiva
              </label>
              <label className="radio-label">
                <input type="radio" name="sentiment" />
                Neutral
              </label>
              <label className="radio-label">
                <input type="radio" name="sentiment" />
                Negativa
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Detalles <span className="req">*</span></label>
            <textarea placeholder="Cuentanos sobre tu experiencia..." className="form-textarea" rows="5"></textarea>
          </div>

          <div className="form-actions">
            <button className="submit-review-btn">Enviar Reseña</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
