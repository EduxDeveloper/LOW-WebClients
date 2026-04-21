import HeroSection from '../components/HeroSection/HeroSection';
import CategoryCards from '../components/CategoryCards/CategoryCards';
import ProductCards from '../components/ProductCards/ProductCards';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <CategoryCards />
      <ProductCards />
    </div>
  );
};

export default Home;
