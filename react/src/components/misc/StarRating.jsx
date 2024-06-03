import React from 'react';
import Rating from 'react-rating-stars-component';

export default function StarRating({ onRatingChange }) {
  return (
    <Rating
      count={5}
      size={30}
      isHalf={true}
      value={0}
      onChange={rating => {
        onRatingChange(rating === 0 ? null : rating);
      }}
    />
  );
}