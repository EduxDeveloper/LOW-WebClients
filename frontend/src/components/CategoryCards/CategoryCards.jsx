import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE } from '../../utils/constants';
import './CategoryCards.css';

const categories = [
  { id: 1, title: 'HOMBRE', link: '/hombre' },
  { id: 2, title: 'MUJER', link: '/mujer' },
  { id: 3, title: 'CONJUNTOS', link: '/conjuntos' },
];

const CategoryCards = () => {
  return (
    <section className="categories-section">
      <h2 className="section-title">Categorías</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <Link to={cat.link} key={cat.id} className="category-card" style={{ backgroundImage: `url(${DEFAULT_IMAGE})` }}>
            <div className="category-overlay"></div>
            <h3 className="category-title">
              {cat.title.split('').map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
