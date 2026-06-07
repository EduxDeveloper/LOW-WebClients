import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import './Reviews.css';

const ReviewCard = ({ client_id, createdAt, title, experience, details, type, ranking }) => {
  const isPositive = type === 'Positiva';
  const name = client_id ? `${client_id.name || ''} ${client_id.lastName || ''}`.trim() || 'Usuario Anónimo' : 'Usuario Anónimo';
  const date = new Date(createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="review-card">
      <div className="review-header">
        <h4 className="reviewer-name">{name}</h4>
        <span className="review-date">{date}</span>
      </div>
      <div className="review-rating">
        <span className="stars">{'⭐'.repeat(ranking || 5)}</span>
        <span className={`review-sentiment ${isPositive ? 'positive' : 'negative'}`}>
          {type || 'Neutral'}
        </span>
      </div>
      <h5 className="review-title">{title}</h5>
      <p className="review-subtitle">{experience}</p>
      <p className="review-content">{details}</p>
    </div>
  );
};

const Reviews = () => {
  const { user } = useContext(AuthContext);

  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isWritingReview, setIsWritingReview] = useState(false);
  const [hoverStar, setHoverStar] = useState(0);

  // Form State
  const [selectedStar, setSelectedStar] = useState(0);
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [type, setType] = useState('Positiva');
  const [details, setDetails] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/generalReviews');
      if (response.ok) {
        const data = await response.json();
        // Sort descending by date
        setReviewsData(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire('Error', 'Debes iniciar sesión para escribir una reseña.', 'error');
      return;
    }

    if (!selectedStar || !title || !experience || !details) {
      Swal.fire('Error', 'Por favor llena todos los campos obligatorios.', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/generalReviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ranking: selectedStar,
          title,
          experience,
          type,
          details,
          client_id: user._id || user.id // Depending on what is saved in your context
        })
      });

      if (response.ok) {
        await Swal.fire('¡Gracias!', 'Tu reseña ha sido publicada exitosamente.', 'success');

        // Reset form
        setSelectedStar(0);
        setTitle('');
        setExperience('');
        setType('Positiva');
        setDetails('');
        setIsWritingReview(false);

        // Refresh reviews
        fetchReviews();
      } else {
        Swal.fire('Error', 'Hubo un problema al guardar tu reseña.', 'error');
      }
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
      Swal.fire('Error', 'Error de conexión con el servidor.', 'error');
    }
  };

  // Calculate average and percentages dynamically
  const totalReviews = reviewsData.length;
  const averageRating = totalReviews > 0
    ? (reviewsData.reduce((acc, rev) => acc + (rev.ranking || 5), 0) / totalReviews).toFixed(1)
    : "0.0";

  const getPercentage = (star) => {
    if (totalReviews === 0) return 0;
    const count = reviewsData.filter(r => (r.ranking || 5) === star).length;
    return Math.round((count / totalReviews) * 100);
  };

  return (
    <div className="page-container reviews-page">
      <div className="reviews-header-section">
        <h1 className="page-title">Reseñas de Clientes</h1>
        {user && (
          <button
            className="write-review-btn"
            onClick={() => setIsWritingReview(!isWritingReview)}
          >
            {isWritingReview ? 'Mirar Reseñas' : 'Escribir Reseña'}
          </button>
        )}
      </div>

      <div className="reviews-summary-block">
        <div className="summary-left">
          <h2 className="summary-score">{averageRating}</h2>
          <div className="summary-stars">
            {'⭐'.repeat(Math.round(averageRating))}
          </div>
          <p className="summary-count">Basado en {totalReviews} reseñas</p>
        </div>
        <div className="summary-right">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="rating-bar-row">
              <span className="star-label">⭐ {star}</span>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${getPercentage(star)}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isWritingReview ? (
        <div className="reviews-list">
          {loading ? (
            <p style={{ textAlign: 'center' }}>Cargando reseñas...</p>
          ) : reviewsData.length > 0 ? (
            reviewsData.map(review => (
              <ReviewCard key={review._id} {...review} />
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>Aún no hay reseñas. ¡Sé el primero en dejar una!</p>
          )}
        </div>
      ) : (
        <div className="review-form-section">
          <h3 className="form-title">Escribe una reseña general</h3>

          <form onSubmit={handleSubmitReview}>
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
                    style={{ cursor: 'pointer', color: star <= (hoverStar || selectedStar) ? '#FFD700' : '#ccc', fontSize: '24px' }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Titulo <span className="req">*</span></label>
              <input
                type="text"
                placeholder="Resume tu experiencia"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Tipo de experiencia <span className="req">*</span></label>
              <input
                type="text"
                placeholder="Ej: Primera compra, Cliente frecuente, etc"
                className="form-input"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Tipo de reseña</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sentiment"
                    value="Positiva"
                    checked={type === 'Positiva'}
                    onChange={(e) => setType(e.target.value)}
                  />
                  Positiva
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sentiment"
                    value="Neutral"
                    checked={type === 'Neutral'}
                    onChange={(e) => setType(e.target.value)}
                  />
                  Neutral
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sentiment"
                    value="Negativa"
                    checked={type === 'Negativa'}
                    onChange={(e) => setType(e.target.value)}
                  />
                  Negativa
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Detalles <span className="req">*</span></label>
              <textarea
                placeholder="Cuentanos sobre tu experiencia..."
                className="form-textarea"
                rows="5"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-review-btn">Enviar Reseña</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reviews;
