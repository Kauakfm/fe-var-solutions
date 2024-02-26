import { useState, useEffect } from 'react';
import './carosselhome.css';
import carossel1 from '../../imagens/var/carosselhome1.png';
import carossel2 from '../../imagens/var/carosselhome2.png';
import carossel3 from '../../imagens/var/carosselhome3.png';

export default function Carossel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div id="carouselExampleSlidesOnly" class="carousel slide fade-carousel" data-bs-ride="carousel">
      <div class="carossel-home-aluno carousel-inner">
          <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
              <img src={carossel1} className="d-block w-100" />
          </div>
          <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
              <img src={carossel2} className="d-block w-100" />
          </div>
          <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
              <img src={carossel3} className="d-block w-100" />
          </div>
      </div>
    </div>
  );
}
