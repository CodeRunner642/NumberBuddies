export default function ProgressStars({ stars, total }) {
  return (
    <div className="progress-stars">
      <div className="stars-row">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={`star ${i < stars ? 'star-earned' : 'star-empty'}`}>
            {i < stars ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    </div>
  );
}
