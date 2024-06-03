import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import Carousel styles
import { Carousel } from 'react-responsive-carousel';

const AboutSlideshow = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full p-0">
      <div className="lg:w-1/2 p-0">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          className=''
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="custom-carousel-arrow custom-carousel-arrow-left"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="custom-carousel-arrow custom-carousel-arrow-right"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            )
          }
        >
          {/* Your carousel images */}
        </Carousel>
      </div>
      {/* Rest of your content */}
    </div>
  );
};
