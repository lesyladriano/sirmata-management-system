import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

const ArrowUpButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const middleOfPage = window.innerHeight / 2;
      setShowButton(window.scrollY > middleOfPage);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`fixed bottom-6 right-6 z-10 transition-opacity duration-300 ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <button
        className="p-3 bg-forestgreen-300 text-white rounded-lg hover:bg-forestgreen-600 focus:outline-none shadow-lg animate-bounce"
        onClick={scrollToTop}
      >
        <FontAwesomeIcon icon={faAngleUp} size="2x" />
      </button>
    </div>
  );
};

export default ArrowUpButton;
