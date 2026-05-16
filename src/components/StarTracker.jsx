import { useState, useEffect, useRef } from 'react';

export default function StarTracker({ stars, total }) {
  const [popIndex, setPopIndex] = useState(null);
  const prevStars = useRef(stars);

  useEffect(() => {
    if (stars > prevStars.current) {
      const idx = stars - 1;
      setPopIndex(idx);
      const t = setTimeout(() => setPopIndex(null), 500);
      prevStars.current = stars;
      return () => clearTimeout(t);
    }
    prevStars.current = stars;
  }, [stars]);

  return (
    <div className="star-tracker" aria-label={`${stars} of ${total} stars collected`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={[
            'star-icon',
            i < stars ? 'star-icon--earned' : 'star-icon--empty',
            i === popIndex ? 'star-icon--pop' : '',
          ].join(' ')}
          aria-hidden="true"
        >
          {i < stars ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}
