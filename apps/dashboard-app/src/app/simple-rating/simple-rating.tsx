import React, { useState } from 'react';
import Star from './star';
import { useLocalStorage } from '@demo-monorepo/hooks';
import './simple-rating.scss';

const stars = ['#61CDBB', '#A5C7AE', '#E8C1A0', '#EE9B80', '#F47560'];

export const SimpleRating = () => {
  const [rating, setRating] = useLocalStorage('rating', -1);
  const [hoverRating, setHoverRating] = useState<number>(-1);

  return (
    <div className="simple-rating">
      <div className="title is-4">Simple rating</div>
      <div className="content">
        <p>Rating will be stored in local storage.</p>
      </div>
      <div className="stars">
        <div className="has-text-centered">
          {stars.map((star, index) => {
            const isChecked =
              hoverRating > -1 ? index <= hoverRating : index <= rating;
            return (
              <Star
                onMouseEnter={() => setHoverRating(index)}
                onMouseLeave={() => setHoverRating(-1)}
                onClick={() => setRating(index)}
                isChecked={isChecked}
                color={star}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SimpleRating;
